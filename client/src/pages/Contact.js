import React, { useState } from 'react';
import { FiSend, FiMail, FiMapPin, FiGithub, FiLinkedin } from 'react-icons/fi';
import axios from 'axios';
import './Contact.css';

const API = process.env.REACT_APP_API_URL || '/api';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState(null); // 'sending' | 'success' | 'error'

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post(`${API}/contact`, form);
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
    }
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <div className="contact-page section">
      <div className="container" style={{ paddingTop: '4rem' }}>
        <h1 className="section-title">Get In <span className="accent">Touch</span></h1>
        <p className="section-subtitle">Have a project or opportunity? Let's talk.</p>

        <div className="contact-grid">
          {/* Info */}
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p className="contact-blurb">
              I'm currently open to new opportunities. Whether you have a question,
              want to collaborate, or just say hi — my inbox is always open.
            </p>
            <div className="contact-details">
              <div className="contact-detail">
                <div className="detail-icon"><FiMail /></div>
                <div>
                  <span className="detail-label">Email</span>
                  <a href="mailto:muhamadinam2@gmail.com" className="detail-value">muhamadinam2@gmail.com</a>
                </div>
              </div>
              <div className="contact-detail">
                <div className="detail-icon"><FiMapPin /></div>
                <div>
                  <span className="detail-label">Location</span>
                  <span className="detail-value">Islamabad, Pakistan</span>
                </div>
              </div>
            </div>
            <div className="contact-social">
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="social-btn">
                <FiGithub /> GitHub
              </a>
              <a href="www.linkedin.com/in/muhammad-inam-dev" target="_blank" rel="noopener noreferrer" className="social-btn">
                <FiLinkedin /> LinkedIn
              </a>
            </div>
            <div className="response-badge">
              <span className="badge-dot" />
              Usually responds within 24 hours
            </div>
          </div>

          {/* Form */}
          <form className="contact-form card" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  id="name" name="name" type="text" required
                  placeholder="John Doe"
                  value={form.name} onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  id="email" name="email" type="email" required
                  placeholder="muhamadinam2@gmail.com"
                  value={form.email} onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                id="subject" name="subject" type="text"
                placeholder="Project collaboration"
                value={form.subject} onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message" name="message" required rows={6}
                placeholder="Tell me about your project..."
                value={form.message} onChange={handleChange}
              />
            </div>

            {status === 'success' && (
              <div className="form-msg success">✅ Message sent! I'll get back to you soon.</div>
            )}
            {status === 'error' && (
              <div className="form-msg error">❌ Failed to send. Please try emailing directly.</div>
            )}

            <button type="submit" className="btn btn-primary submit-btn" disabled={status === 'sending'}>
              {status === 'sending' ? (
                <><span className="btn-spinner" /> Sending...</>
              ) : (
                <><FiSend /> Send Message</>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
