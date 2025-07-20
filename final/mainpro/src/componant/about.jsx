import React from 'react';

function About({ darkMode }) {
  return (
    <div className="app-wrapper d-flex justify-content-center align-items-start">
      <div className="app-container pt-5 mt-5">
        <div className="text-center mb-5">
          <h1 className="gradient-text display-4 fw-bold">About Innov8rs 🚀</h1>
          <p className={`mt-2 ${darkMode ? "text-light" : "text-muted"}`}>
            Revolutionizing content creation with AI-powered image generation and caption writing
          </p>
        </div>

        <div className="container">
          <div className="row g-4">
            {/* Mission Section */}
            <div className="col-lg-6 mb-4">
              <div className={`p-4 border rounded shadow-sm glass-box h-100 ${darkMode ? "text-white" : "text-dark"}`}>
                <h3 className="text-primary mb-3">🎯 Our Mission</h3>
                <p>
                  To democratize creative content creation by providing powerful AI tools that help creators, 
                  marketers, and businesses generate stunning visuals and compelling captions effortlessly.
                </p>
                <p>
                  We believe everyone deserves access to professional-grade content creation tools, 
                  regardless of their technical expertise or budget.
                </p>
              </div>
            </div>

            {/* Features Section */}
            <div className="col-lg-6 mb-4">
              <div className={`p-4 border rounded shadow-sm glass-box h-100 ${darkMode ? "text-white" : "text-dark"}`}>
                <h3 className="text-success mb-3">✨ Key Features</h3>
                <ul className="list-unstyled">
                  <li className="mb-2">🎨 AI-Powered Image Generation</li>
                  <li className="mb-2">📝 Smart Caption Writing</li>
                  <li className="mb-2">📱 Multi-Platform Social Posts</li>
                  <li className="mb-2">🔍 SEO Metadata Generation</li>
                  <li className="mb-2">🌙 Dark/Light Theme Support</li>
                  <li className="mb-2">📤 Easy Image Upload</li>
                </ul>
              </div>
            </div>

            {/* Technology Section */}
            <div className="col-12 mb-4">
              <div className={`p-4 border rounded shadow-sm glass-box ${darkMode ? "text-white" : "text-dark"}`}>
                <h3 className="text-info mb-3">🛠️ Technology Stack</h3>
                <div className="row g-3">
                  <div className="col-md-4">
                    <h5 className="text-warning">Frontend</h5>
                    <ul className="list-unstyled">
                      <li>React.js</li>
                      <li>Bootstrap 5</li>
                      <li>Custom CSS</li>
                    </ul>
                  </div>
                  <div className="col-md-4">
                    <h5 className="text-warning">Backend</h5>
                    <ul className="list-unstyled">
                      <li>Python Flask</li>
                      <li>OpenAI Models</li>
                      <li>Computer Vision</li>
                    </ul>
                  </div>
                  <div className="col-md-4">
                    <h5 className="text-warning">AI Models</h5>
                    <ul className="list-unstyled">
                      <li>Stable Diffusion</li>
                      <li>GPT Models</li>
                      <li>Vision Models</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Section */}
            <div className="col-12 mb-4">
              <div className={`p-4 border rounded shadow-sm glass-box ${darkMode ? "text-white" : "text-dark"}`}>
                <h3 className="text-primary mb-3">👥 Our Team</h3>
                <p>
                  We are a passionate team of developers, designers, and AI enthusiasts dedicated to 
                  creating innovative solutions that bridge the gap between creativity and technology.
                </p>
                <p>
                  Our expertise spans across machine learning, web development, user experience design, 
                  and content creation, allowing us to build comprehensive tools that truly serve our users' needs.
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="col-12 mb-4">
              <div className={`p-4 border rounded shadow-sm glass-box ${darkMode ? "text-white" : "text-dark"}`}>
                <h3 className="text-success mb-3">📞 Get In Touch</h3>
                <div className="row g-3">
                  <div className="col-md-6">
                    <h5>💼 Business Inquiries</h5>
                    <p>business@innov8rs.com</p>
                  </div>
                  <div className="col-md-6">
                    <h5>🛠️ Technical Support</h5>
                    <p>support@innov8rs.com</p>
                  </div>
                </div>
                <div className="mt-3">
                  <h5>🌐 Follow Us</h5>
                  <div className="d-flex gap-3">
                    <a href="#" className={`btn ${darkMode ? "btn-outline-light" : "btn-outline-dark"}`}>
                      Twitter
                    </a>
                    <a href="#" className={`btn ${darkMode ? "btn-outline-light" : "btn-outline-dark"}`}>
                      LinkedIn
                    </a>
                    <a href="#" className={`btn ${darkMode ? "btn-outline-light" : "btn-outline-dark"}`}>
                      GitHub
                    </a>
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

export default About;
