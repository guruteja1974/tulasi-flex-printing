import { Quote } from 'lucide-react';
import SectionHeading from '../../components/common/SectionHeading.jsx';
import { testimonialPlaceholders } from '../../data/homeData.js';
import './TestimonialsSection.css';

export default function TestimonialsSection() {
  return (
    <section
      aria-labelledby="home-testimonials-title"
      className="home-testimonials section"
      id="home-testimonials"
    >
      <div className="container--wide">
        <SectionHeading
          align="center"
          className="home-testimonials__heading"
          id="home-testimonials-title"
          description="Authentic customer feedback will be added after the reviewer, wording, and publication permission are confirmed."
          eyebrow="Customer feedback"
          title="Customer Testimonials"
        />

        <div className="home-testimonials__grid">
          {testimonialPlaceholders.map((item, index) => (
            <article className="home-testimonial-card" key={item.label}>
              <div className="home-testimonial-card__top">
                <Quote aria-hidden="true" size={19} />
                <span>Review {String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3>{item.label}</h3>
              <p>{item.note}</p>
              <span className="home-testimonial-card__status">
                Placeholder · not a customer endorsement
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
