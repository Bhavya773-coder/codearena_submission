import React, { useState } from 'react';

function Contact({ darkMode }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(null), 3000);
    }, 2000);
  };

  return (
    <div className="app-wrapper d-flex justify-content-center align-items-start">
      <div className="app-container pt-5 mt-5">
        <div className="text-center mb-5">
          <h1 className="gradient-text display-4 fw-bold">Contact Us 📞</h1>
          <p className={`mt-2 ${darkMode ? "text-light" : "text-muted"}`}>
            Get in touch with our team for support, feedback, or collaboration opportunities
          </p>
        </div>

        <div className="container">
          <div className="row g-4">
            {/* Contact Information */}
            <div className="col-lg-4 mb-4">
              <div className={`p-4 border rounded shadow-sm glass-box h-100 ${darkMode ? "text-white" : "text-dark"}`}>
                <h3 className="text-primary mb-4">📍 Get In Touch</h3>
                
                <div className="mb-4">
                  <h5 className="text-success">📧 Email</h5>
                  <p>info@innov8rs.com</p>
                  <p>support@innov8rs.com</p>
                </div>

                <div className="mb-4">
                  <h5 className="text-info">🌐 Social Media</h5>
                  <div className="d-flex flex-column gap-2">
                    <a href="#" className={`btn ${darkMode ? "btn-outline-light" : "btn-outline-dark"} btn-sm`}>
                      Twitter @innov8rs
                    </a>
                    <a href="#" className={`btn ${darkMode ? "btn-outline-light" : "btn-outline-dark"} btn-sm`}>
                      LinkedIn /innov8rs
                    </a>
                    <a href="#" className={`btn ${darkMode ? "btn-outline-light" : "btn-outline-dark"} btn-sm`}>
                      GitHub /innov8rs
                    </a>
                  </div>
                </div>

                <div className="mb-4">
                  <h5 className="text-warning">⏰ Business Hours</h5>
                  <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p>Saturday: 10:00 AM - 4:00 PM</p>
                  <p>Sunday: Closed</p>
                </div>

                <div>
                  <h5 className="text-danger">🚀 Quick Support</h5>
                  <p>For urgent technical issues, please include "URGENT" in your subject line.</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-8 mb-4">
              <div className={`p-4 border rounded shadow-sm glass-box ${darkMode ? "text-white" : "text-dark"}`}>
                <h3 className="text-primary mb-4">📝 Send Us a Message</h3>
                
                {submitStatus === 'success' && (
                  <div className="alert alert-success" role="alert">
                    ✅ Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label htmlFor="name" className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className="form-control fancy-input"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className="col-md-6">
                      <label htmlFor="email" className="form-label">Email Address *</label>
                      <input
                        type="email"
                        className="form-control fancy-input"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email"
                      />
                    </div>
                    
                    <div className="col-12">
                      <label htmlFor="subject" className="form-label">Subject *</label>
                      <select
                        className="form-select fancy-input"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select a subject</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="business">Business Partnership</option>
                        <option value="feedback">Feedback & Suggestions</option>
                        <option value="bug">Bug Report</option>
                        <option value="feature">Feature Request</option>
                      </select>
                    </div>
                    
                    <div className="col-12">
                      <label htmlFor="message" className="form-label">Message *</label>
                      <textarea
                        className="form-control fancy-input"
                        id="message"
                        name="message"
                        rows="6"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        placeholder="Tell us how we can help you..."
                      ></textarea>
                    </div>
                    
                    <div className="col-12">
                      <button
                        type="submit"
                        className="btn fancy-btn btn-lg w-100"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Sending Message...
                          </>
                        ) : (
                          '📤 Send Message'
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="col-12 mb-4">
              <div className={`p-4 border rounded shadow-sm glass-box ${darkMode ? "text-white" : "text-dark"}`}>
                <h3 className="text-info mb-4">❓ Frequently Asked Questions</h3>
                
                <div className="row g-3">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <h5 className="text-warning">How do I get started?</h5>
                      <p>Simply enter a prompt and click generate, or upload your own image to get started with caption generation.</p>
                    </div>
                    
                    <div className="mb-3">
                      <h5 className="text-warning">Is this service free?</h5>
                      <p>We offer both free and premium tiers. Basic features are free, while advanced features require a subscription.</p>
                    </div>
                  </div>
                  
                  <div className="col-md-6">
                    <div className="mb-3">
                      <h5 className="text-warning">What image formats are supported?</h5>
                      <p>We support JPG, PNG, GIF, and WebP formats for image uploads and generation.</p>
                    </div>
                    
                    <div className="mb-3">
                      <h5 className="text-warning">How long does image generation take?</h5>
                      <p>Typically 10-30 seconds depending on the complexity of your prompt and server load.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
