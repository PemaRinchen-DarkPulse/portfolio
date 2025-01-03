import React from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaEnvelope,
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaGithub,
} from "react-icons/fa";

const Contact = () => {
  return (
    <div className="container my-4">
      <h3 className="ms-2">Contact Me</h3>
      <div className="row">
        <div className="col-6">
          <div
            className="m-3 bg-dark text-white rounded-3 p-3 shadow-sm d-flex flex-column justify-content-around"
          >
            <h3 className="mb-3">Get in Touch</h3>
            <div className="d-flex align-items-center mb-3">
              <FaMapMarkerAlt className="me-3 text-danger" size={20} />
              <div>
                <h6 className="mb-1">ADDRESS</h6>
                <p className="mb-0">SIT Pune, Maharashtra, India.</p>
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <FaPhoneAlt className="me-3 text-danger" size={20} />
              <div>
                <h6 className="mb-1">PHONE</h6>
                <a
                  href="tel:+919699881639"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  +91 969 988 1639
                </a>
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <FaWhatsapp className="me-3 text-danger" size={20} />
              <div>
                <h6 className="mb-1">WHATSAPP</h6>
                <a
                  href="https://wa.me/+919699881639"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  +91 969 988 1639
                </a>
              </div>
            </div>
            <div className="d-flex align-items-center mb-3">
              <FaEnvelope className="me-3 text-danger" size={20} />
              <div>
                <h6 className="mb-1">EMAIL</h6>
                <a
                  href="mailto:pemarinchen12.31.2002@gmail.com"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  pemarinchen12.31.2002@gmail.com
                </a>
              </div>
            </div>

            <div className="mt-3">
              <h6 className="mb-2">FOLLOW ME</h6>
              <div className="d-flex">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white me-3"
                  style={{ textDecoration: "none" }}
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white me-3"
                  style={{ textDecoration: "none" }}
                >
                  <FaFacebookF size={24} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white me-3"
                  style={{ textDecoration: "none" }}
                >
                  <FaLinkedinIn size={24} />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                  style={{ textDecoration: "none" }}
                >
                  <FaGithub size={24} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="col-6">
          <div
            className="m-3 bg-secondary rounded-3 px-3 py-2 shadow-sm"
          >
            <h3 className="">Send a Message</h3>
            <form>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="John Doe"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="johndoe@example.com"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="3"
                  placeholder="Type your message..."
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary mb-2">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="container mt-3">
        <h4 className="mb-3">Location</h4>
        <div className="rounded-3 shadow-sm">
          <iframe
            className="rounded-3"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.5158362493565!2d73.7252788!3d18.5413032!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bc3e3d28683b%3A0x64a3e9ef22f676a0!2sSymbiosis%20Institute%20of%20Technology%20%7C%20SIT%20Pune!5e0!3m2!1sen!2sin!4v1690136815452!5m2!1sen!2sin"
            width="100%"
            height="600"
            style={{ border: "0" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
