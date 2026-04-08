import { NavLink } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="not-found page-hero">
      <div className="section-block narrow-top centered-copy">
        <p className="eyebrow">404</p>
        <h1>Page not found.</h1>
        <p>The page you are looking for does not exist.</p>
        <NavLink to="/" className="primary-btn">Back to Home</NavLink>
      </div>
    </section>
  );
}
