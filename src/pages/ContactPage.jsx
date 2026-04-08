import SectionHeading from '../components/SectionHeading';

export default function ContactPage() {
  return (
    <section className="page-hero contact-surface">
      <div className="section-block narrow-top">
        <SectionHeading
          eyebrow="Contact"
          title="Let buyers, investors, and channel partners connect instantly."
          text="The form below is styled for launch campaigns and project inquiries. Connect it to your preferred backend or form service after deployment."
        />

        <div className="contact-layout">
          <div className="contact-card hover-panel">
            <h3>Visit Our Sales Office</h3>
            <p>Stellavia Construction HQ, SG Highway, Ahmedabad, Gujarat</p>
            <p>Mon - Sat / 10:00 AM - 7:00 PM</p>
            <p>sales@stellavia.com</p>
            <p>+91 98765 43210</p>
          </div>

          <form className="contact-form hover-panel">
            <div className="form-row">
              <input type="text" placeholder="Full Name" />
              <input type="email" placeholder="Email Address" />
            </div>
            <div className="form-row">
              <input type="tel" placeholder="Phone Number" />
              <input type="text" placeholder="Interested Project" />
            </div>
            <textarea rows="6" placeholder="Tell us what kind of flat or apartment you are looking for" />
            <button type="submit" className="primary-btn">Send Inquiry</button>
          </form>
        </div>
      </div>
    </section>
  );
}
