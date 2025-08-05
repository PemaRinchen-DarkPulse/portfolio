const express = require('express');
const sgMail = require('@sendgrid/mail');
const Contact = require('../models/Contact');
const router = express.Router();

// Set SendGrid API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

console.log('Contact route file loaded');

// @route   POST api/messages
// @desc    Save contact form message to database FIRST, then send email using SendGrid
// @access  Public
router.post('/', async (req, res) => {
  console.log('POST /api/messages route hit');
  console.log('Request body:', req.body);

  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message'
      });
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    // Step 1: Save to database first
    const contactData = new Contact({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim()
    });

    const savedContact = await contactData.save();
    console.log('Contact saved to database:', savedContact._id);

    // Step 2: Prepare and send email using the saved data
    const emailContent = {
      to: process.env.TO_EMAIL,
      from: {
        email: process.env.FROM_EMAIL,
        name: process.env.FROM_NAME
      },
      subject: `Portfolio Contact Form: Message from ${savedContact.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8f9fa; padding: 20px;">
          <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333; border-bottom: 3px solid #007bff; padding-bottom: 15px; margin-bottom: 25px;">
              🔔 New Contact Form Submission
            </h2>
            
            <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #2196f3;">
              <h3 style="color: #1976d2; margin-top: 0; margin-bottom: 15px;">📋 Contact Details:</h3>
              <p style="margin: 8px 0;"><strong>👤 Name:</strong> ${savedContact.name}</p>
              <p style="margin: 8px 0;"><strong>📧 Email:</strong> <a href="mailto:${savedContact.email}" style="color: #1976d2;">${savedContact.email}</a></p>
            </div>
            
            <div style="background-color: #f3e5f5; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 5px solid #9c27b0;">
              <h3 style="color: #7b1fa2; margin-top: 0; margin-bottom: 15px;">💬 Message:</h3>
              <div style="background-color: white; padding: 15px; border-radius: 5px; line-height: 1.6; color: #333;">
                ${savedContact.message.replace(/\n/g, '<br>')}
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
                Reply directly to this email to respond to ${savedContact.name}
              </p>
            </div>
          </div>
        </div>
      `,
      replyTo: savedContact.email // This allows you to reply directly to the sender
    };

    // Step 3: Send email using SendGrid
    await sgMail.send(emailContent);

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
    
    // Handle SendGrid specific errors
    if (error.response) {
      console.error('SendGrid Error Response:', error.response.body);
    }

    // Handle mongoose/database errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error: ' + Object.values(error.errors).map(e => e.message).join(', ')
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
