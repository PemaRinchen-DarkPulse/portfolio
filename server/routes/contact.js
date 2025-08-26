const express = require('express');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const Contact = require('../models/Contact');
const router = express.Router();

// Configure Nodemailer transporter for Brevo (Sendinblue) SMTP
const brevoHost = process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com';
const brevoPort = parseInt(process.env.BREVO_SMTP_PORT || '587', 10);
const brevoUser = process.env.BREVO_SMTP_USER;
const brevoPass = process.env.BREVO_SMTP_PASS;

let transporter;
try {
  if (!brevoUser || !brevoPass) {
    console.warn('Brevo SMTP credentials are not fully set. Please set BREVO_SMTP_USER and BREVO_SMTP_PASS.');
  }

  transporter = nodemailer.createTransport({
    host: brevoHost,
    port: brevoPort,
    secure: false, // Brevo recommends TLS on 587 with secure=false
    auth: brevoUser && brevoPass ? { user: brevoUser, pass: brevoPass } : undefined,
    logger: process.env.BREVO_SMTP_DEBUG === 'true',
    debug: process.env.BREVO_SMTP_DEBUG === 'true',
  });
} catch (e) {
  console.error('Failed to create Brevo transporter:', e.message);
}

console.log('Contact route file loaded');

// Health check for contact/messages service
router.get('/health', async (req, res) => {
  try {
    const dbState = mongoose.connection.readyState;
    const states = { 0: 'disconnected', 1: 'connected', 2: 'connecting', 3: 'disconnecting' };
    return res.json({
      message: 'Messages service healthy',
      timestamp: new Date().toISOString(),
      database: { state: dbState, status: states[dbState] || 'unknown' },
      emailTransporter: !!transporter
    });
  } catch (err) {
    return res.status(500).json({ message: 'Health check failed', error: err.message });
  }
});

// @route   POST api/messages
// @desc    Save contact form message to database FIRST, then send email using Brevo SMTP
// @access  Public
router.post('/', async (req, res) => {
  console.log('POST /api/messages route hit');
  console.log('Request body:', req.body);

  try {
    // If database isn't ready yet (serverless cold start), signal a retryable condition
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Service warming up. Please wait a few seconds and try again.',
      });
    }

    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message'
      });
    }

  // Email validation regex (soft validation - don't block sending)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailRegex.test(email);

    // Step 1: Save to database first
    const contactData = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim()
    });

    const savedContact = await contactData.save();
    console.log('Contact saved to database:', savedContact._id);

    // Step 2: Prepare and send email using the saved data
    // Escape user content for safe HTML
    const escapeHtml = (str = '') => String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    const safeName = escapeHtml(savedContact.name);
    const safeEmail = escapeHtml(savedContact.email);
    const safeMessage = escapeHtml(savedContact.message).replace(/\n/g, '<br>');

    const subject = `Portfolio Contact Form: Message from ${safeName}`;
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; border-bottom: 3px solid #007bff; padding-bottom: 15px; margin-bottom: 25px;">
              🔔 New Contact Form Submission
            </h2>
            
            <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #2196f3;">
              <h3 style="color: #1976d2; margin-top: 0; margin-bottom: 15px;">📋 Contact Details:</h3>
              <p style="margin: 8px 0;"><strong>👤 Name:</strong> ${safeName}</p>
              <p style="margin: 8px 0;"><strong>📧 Email:</strong> <a href="mailto:${safeEmail}" style="color: #1976d2;">${safeEmail}</a></p>
            </div>
            
            <div style="background-color: #f3e5f5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #9c27b0;">
              <h3 style="color: #7b1fa2; margin-top: 0; margin-bottom: 15px;">💬 Message:</h3>
              <div style="background-color: white; padding: 15px; border-radius: 5px; line-height: 1.6; color: #333;">
                ${safeMessage}
              </div>
            </div>
            
            <div style="background-color: #e8f5e8; padding: 15px; border-radius: 8px; margin-top: 30px; border-left: 5px solid #4caf50;">
              <h4 style="color: #388e3c; margin: 0 0 10px 0;">📅 Submission Details</h4>
              <p style="margin: 5px 0; color: #666; font-size: 14px;">
                <strong>Database ID:</strong> ${savedContact._id}
              </p>
              <p style="margin: 5px 0; color: #666; font-size: 14px;">
                <strong>Timestamp:</strong> ${savedContact.createdAt.toLocaleString()}
              </p>
              <p style="margin: 5px 0; color: #666; font-size: 14px;">
                <strong>Source:</strong> Portfolio Contact Form
              </p>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #dee2e6; text-align: center;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                This message was sent from your portfolio website contact form.
              </p>
              <p style="color: #007bff; font-weight: bold; margin: 10px 0 0 0;">
                Reply directly to this email to respond to ${safeName}
              </p>
            </div>
          </div>
        </div>
      `;

    const mailOptions = {
      from: `${process.env.FROM_NAME ? '"' + process.env.FROM_NAME + '" ' : ''}<${process.env.FROM_EMAIL}>`,
      to: process.env.TO_EMAIL,
  subject,
  html,
    };

    if (isValidEmail) {
      mailOptions.replyTo = savedContact.email; // Only set replyTo if valid
    }

    if (process.env.BREVO_BCC_SELF === 'true' && process.env.FROM_EMAIL) {
      mailOptions.bcc = process.env.FROM_EMAIL;
    }

    if (!transporter) {
      throw new Error('Email transporter is not initialized');
    }

    // Step 3: Send email using Brevo SMTP
    await transporter.sendMail(mailOptions);

    // Step 4: Update database to mark email as sent
    await Contact.findByIdAndUpdate(savedContact._id, {
      emailSent: true,
      emailSentAt: new Date()
    });

    console.log(`Contact form email sent successfully for contact ID: ${savedContact._id}`);

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! Thank you for reaching out.',
      contactId: savedContact._id
    });

  } catch (error) {
  console.error('Contact form error:', error);

    // Handle mongoose/database errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error: ' + Object.values(error.errors).map(e => e.message).join(', ')
      });
    }

    // Propagate a retryable status for transient issues
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({
        success: false,
        message: 'Service temporarily unavailable. Please try again shortly.'
      });
    }

    res.status(500).json({
      success: false,
      message: 'Failed to send message. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
