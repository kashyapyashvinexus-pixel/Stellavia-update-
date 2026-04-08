import { stats } from '../data/projects';

export default function StatsStrip() {
  return (
    <section className="stats-strip full-bleed">
      <div className="stats-grid">
        {stats.map((item) => (
          <div key={item.label} className="stat-card">
            <h3>{item.value}</h3>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
