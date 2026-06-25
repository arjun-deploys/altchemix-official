import ContactInfo from "../shared/ContactInfo";
import { ContactForm } from "../shared/ContactForm";

export function ContactSection() {
  return (
    <section
      id="contact"
      role="region"
      aria-labelledby="contact-heading"
      className="py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" aria-hidden="true" />
      <div
        className="absolute inset-0 grid-overlay opacity-30"
        aria-hidden="true"
      />

      <div className="page_container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <ContactInfo />

          <ContactForm />
        </div>
      </div>
    </section>
  );
}
