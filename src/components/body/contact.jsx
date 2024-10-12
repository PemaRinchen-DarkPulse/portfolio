import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
    return (
        <div className="container my-5">
            <h2 className="mb-4">Contact</h2>
            <p className="text-muted mb-4">How can I help you?</p>

            <div className="row">
                <div className="col-md-5 mb-4">
                    <div className="card p-4 shadow-sm">
                        <div className='d-flex align-items-center mb-3'>
                            <div className='bg-primary rounded-circle d-flex align-items-center justify-content-center me-3' style={{ height: "30px", width: "30px" }}>
                                <FaMapMarkerAlt size={20} />
                            </div>
                            <div>
                                <h6 className="m-0">Address</h6>
                                <p className="text-muted">A108 Adam Street, New York, NY 535022</p>
                            </div>
                        </div>

                        <div className='d-flex align-items-center mb-3'>
                            <div className='bg-primary rounded-circle d-flex align-items-center justify-content-center me-3' style={{ height: "30px", width: "30px" }}>
                                <FaPhoneAlt size={20} />
                            </div>
                            <div>
                                <h6 className="m-0">Call Us</h6>
                                <p className="text-muted">+91 969 988 1639</p>
                            </div>
                        </div>

                        <div className='d-flex align-items-center'>
                            <div className='bg-primary rounded-circle d-flex align-items-center justify-content-center me-3' style={{ height: "30px", width: "30px" }}>
                                <FaEnvelope size={20} />
                            </div>
                            <div>
                                <h6 className="m-0">Email Us</h6>
                                <p className="text-muted">emailus@gmail.com</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.869518160224!2d-74.0060156847474!3d40.71277597933159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x7dd1fbb77e4f0a7f!2zTllDLU5ZMTIzIEFkYW0gU3QsIE5ldyBZb3Jr!5e0!3m2!1sen!2sus!4v1611787284707!5m2!1sen!2sus"
                                width="100%"
                                height="250"
                                frameBorder="0"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                aria-hidden="false"
                                tabIndex="0">
                            </iframe>
                        </div>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="col-md-7">
                    <div className="card p-4 shadow-sm">
                        <form>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="name" className="form-label">Your Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Your Name" />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="email" className="form-label">Your Email</label>
                                    <input type="email" className="form-control" id="email" placeholder="Your Email" />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="subject" className="form-label">Subject</label>
                                <input type="text" className="form-control" id="subject" placeholder="Subject" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea className="form-control" id="message" rows="4" placeholder="Message"></textarea>
                            </div>
                            <div className="text-end">
                                <button type="submit" className="btn btn-primary">Send Message</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
