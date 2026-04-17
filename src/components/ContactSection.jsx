import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const contactItems = [
  { icon: null, label: 'Email', value: 'anmolkrj006@gmail.com', href: 'mailto:anmolkrj006@gmail.com' },
  { icon: null, label: 'Location', value: 'Gandhinagar, Gujarat, India', href: null },
  { icon: null, label: 'Institution', value: 'IIIT Vadodara', href: null },
  { icon: null, label: 'Status', value: 'Open to Opportunities', href: null, green: true },
];

const socials = [
  { label: 'GitHub', href: 'https://github.com/hck-anmol', color: 'var(--purple)' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/anmolkrjha006/', color: 'var(--blue)' },
];

export default function ContactSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', subject: '', message: '' });

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    const { firstName, lastName, email, subject, message } = form;
    const mailSubject = encodeURIComponent(subject);
    const mailBody = encodeURIComponent(
      `Name: ${firstName} ${lastName}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`
    );
    window.open(`mailto:anmolkrj006@gmail.com?subject=${mailSubject}&body=${mailBody}`);
    alert("Opening your email client. Please click send.");
    setStatus('sent');
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <section id="contact" className="section" ref={ref}>
      <div className="nebula" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(59,130,246,.12) 0%, transparent 70%)', bottom: 0, right: 0 }} />

      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '60px' }}
        >
          <div className="section-label">// let's talk</div>
          <h2 className="section-title">
            Get In <span style={{ background: 'linear-gradient(135deg, var(--blue), var(--pink))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Touch</span>
          </h2>
          <div className="glow-divider" style={{ margin: '20px auto 12px' }} />
          <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
            Have a project in mind? Looking for an intern? Let's build something incredible together.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '60px',
          alignItems: 'start',
        }}>
          {/* Left - Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {contactItems.map(item => (
              <motion.div
                key={item.label}
                whileHover={{ x: 6, borderColor: 'rgba(139,92,246,0.5)' }}
                data-hover
                style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  padding: '20px 24px',
                  background: 'var(--glass)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  marginBottom: '16px',
                  backdropFilter: 'blur(12px)',
                  transition: 'border-color 0.2s',
                  cursor: item.href ? 'pointer' : 'default',
                }}
                onClick={() => item.href && window.open(item.href, '_blank')}
              >
                <div style={{
                  width: 44, height: 44, flexShrink: 0,
                  background: 'linear-gradient(135deg, var(--blue), var(--purple))',
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '13px', fontWeight: 700, color: '#fff',
                  fontFamily: 'var(--mono)',
                }}>{item.label.slice(0, 2).toUpperCase()}</div>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '3px' }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 500, color: item.green ? '#22c55e' : 'var(--text)' }}>
                    {item.value}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Social links */}
            <motion.div
              style={{
                marginTop: '24px', padding: '24px',
                background: 'var(--glass)',
                border: '1px solid var(--border)',
                borderRadius: '20px',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '16px' }}>Find me on</div>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {socials.map(s => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-hover
                    whileHover={{ borderColor: s.color, y: -3 }}
                    style={{
                      padding: '10px 18px',
                      background: 'rgba(255,255,255,.05)',
                      border: '1px solid var(--border)',
                      borderRadius: '10px',
                      fontSize: '13px', fontWeight: 600,
                      color: 'var(--text)',
                      display: 'flex', alignItems: 'center', gap: '6px',
                      transition: 'border-color 0.2s, transform 0.2s',
                    }}
                  >
                    {s.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25 }}
            style={{
              background: 'var(--glass)',
              border: '1px solid var(--border)',
              borderRadius: '24px',
              padding: '36px',
              backdropFilter: 'blur(16px)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top gradient line */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
              background: 'linear-gradient(90deg, var(--blue), var(--purple), var(--pink))',
            }} />

            <h3 style={{ fontSize: '20px', fontWeight: 700, marginBottom: '24px' }}>Send a Message</h3>

            <form onSubmit={handleSubmit}>
              {/* Name row */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                {[{ name: 'firstName', placeholder: 'Anmol', label: 'First Name' }, { name: 'lastName', placeholder: 'jha', label: 'Last Name' }].map(f => (
                  <div key={f.name}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', display: 'block' }}>
                      {f.label}
                    </label>
                    <input
                      name={f.name}
                      type="text"
                      placeholder={f.placeholder}
                      value={form[f.name]}
                      onChange={handleChange}
                      required
                      style={{
                        width: '100%', padding: '14px 16px',
                        background: 'rgba(255,255,255,.04)',
                        border: '1px solid var(--border)',
                        borderRadius: '12px',
                        fontSize: '14px', color: 'var(--text)',
                        fontFamily: 'var(--font)',
                        outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
                      }}
                      onFocus={e => { e.target.style.borderColor = 'var(--purple)'; e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,.15)'; }}
                      onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                    />
                  </div>
                ))}
              </div>

              {/* Email */}
              {[
                { name: 'email', label: 'Email', type: 'email', placeholder: 'anmol@example.com' },
                { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Project Collaboration / Internship' },
              ].map(f => (
                <div key={f.name} style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', display: 'block' }}>
                    {f.label}
                  </label>
                  <input
                    name={f.name} type={f.type} placeholder={f.placeholder}
                    value={form[f.name]} onChange={handleChange} required
                    style={{
                      width: '100%', padding: '14px 16px',
                      background: 'rgba(255,255,255,.04)',
                      border: '1px solid var(--border)',
                      borderRadius: '12px',
                      fontSize: '14px', color: 'var(--text)',
                      fontFamily: 'var(--font)',
                      outline: 'none', transition: 'border-color 0.2s, box-shadow 0.2s',
                    }}
                    onFocus={e => { e.target.style.borderColor = 'var(--purple)'; e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,.15)'; }}
                    onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                  />
                </div>
              ))}

              {/* Message */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{ fontSize: '12px', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', display: 'block' }}>
                  Message
                </label>
                <textarea
                  name="message" placeholder="Tell me about your project or opportunity..."
                  value={form.message} onChange={handleChange} required rows={5}
                  style={{
                    width: '100%', padding: '14px 16px',
                    background: 'rgba(255,255,255,.04)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    fontSize: '14px', color: 'var(--text)',
                    fontFamily: 'var(--font)',
                    outline: 'none', resize: 'vertical', minHeight: '120px',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onFocus={e => { e.target.style.borderColor = 'var(--purple)'; e.target.style.boxShadow = '0 0 0 3px rgba(139,92,246,.15)'; }}
                  onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={status === 'sending'}
                data-hover
                whileHover={status === 'idle' ? { scale: 1.02, boxShadow: '0 12px 36px rgba(139,92,246,0.5)' } : {}}
                whileTap={{ scale: 0.97 }}
                style={{
                  width: '100%', padding: '15px',
                  background: status === 'sent'
                    ? 'linear-gradient(135deg, #22c55e, #16a34a)'
                    : 'linear-gradient(135deg, var(--blue), var(--purple))',
                  border: 'none', borderRadius: '12px',
                  fontSize: '15px', fontWeight: 700, color: '#fff',
                  cursor: status === 'sending' ? 'wait' : 'pointer',
                  transition: 'background 0.4s',
                  fontFamily: 'var(--font)',
                }}
              >
                {status === 'idle' && 'Send Email'}
                {status === 'sending' && 'Opening Mail...'}
                {status === 'sent' && 'Email Client Opened!'}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
