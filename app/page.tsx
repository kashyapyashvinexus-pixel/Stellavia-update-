"use client";

import { useEffect, useMemo, useState } from "react";

type GalleryTab = "ext" | "int";
type FloorPlanTab = "typ" | "lph" | "uph";

const exteriorImages = [
  "https://images.squarespace-cdn.com/content/v1/69576c9e15d6285d4dbd5e92/c301f4e1-1738-4c23-b1ba-f5e613b3e2b5/2.jpg",
  "https://images.squarespace-cdn.com/content/v1/69576c9e15d6285d4dbd5e92/ddac4d6c-1754-4bc4-84de-5b7fbf44e126/JB_CAM_02_FFF.jpg",
  "https://images.squarespace-cdn.com/content/v1/69576c9e15d6285d4dbd5e92/2351cb63-37b3-4984-bd8f-298e66940c6e/JB_CAM_02_NIGHT_FFF.jpg",
  "https://images.squarespace-cdn.com/content/v1/69576c9e15d6285d4dbd5e92/f7184709-f559-4ff3-bab6-fc73c578b567/JB_CAM_04_FFF.jpg",
  "https://images.squarespace-cdn.com/content/v1/69576c9e15d6285d4dbd5e92/cb45014c-6118-4b31-a089-04c8fc45c548/ST_CAM_01_FFF.jpg",
  "https://images.squarespace-cdn.com/content/v1/69576c9e15d6285d4dbd5e92/eeee6615-f8e8-4384-8ea0-94a07833bc61/ST_CAM_03_FFF.jpg",
];

const interiorImages = [
  "https://images.squarespace-cdn.com/content/v1/69576c9e15d6285d4dbd5e92/14a9adea-4a86-4093-8470-2738e6451db3/01.jpg",
  "https://images.squarespace-cdn.com/content/v1/69576c9e15d6285d4dbd5e92/4eb0077d-62e8-4a2d-8a98-3c5fd1defa48/02.jpg",
  "https://images.squarespace-cdn.com/content/v1/69576c9e15d6285d4dbd5e92/75baef5e-5b95-448b-87ca-d2c9fec22d2e/03.jpg",
  "https://images.squarespace-cdn.com/content/v1/69576c9e15d6285d4dbd5e92/e6836d1f-c578-4f22-a092-fcc2c2d6593f/04.jpg",
  "https://images.squarespace-cdn.com/content/v1/69576c9e15d6285d4dbd5e92/f663e06b-f7fd-4825-967d-f5c2153ecfbd/10.jpg",
  "https://images.squarespace-cdn.com/content/v1/69576c9e15d6285d4dbd5e92/d14a48f0-808d-4524-8bff-7db5a9e53299/12.jpg",
];

const features = [
  ["🏢", "2 Flats Per Floor", "Low-density planning for privacy and calm everyday living."],
  ["🍽️", "Dedicated Dining", "A proper dining area instead of combining everything into one hall."],
  ["📐", "Zero Passage Waste", "More usable carpet experience inside the home."],
  ["🔲", "Column-Less Living", "Cleaner furniture layouts and better visual openness."],
  ["🚗", "Allotted Parking", "Structured parking with premium convenience."],
  ["🛗", "Private Lift Access", "Lift access feels more exclusive and personal."],
  ["❄️", "AC Hall", "Multi-purpose hall for gatherings and celebrations."],
  ["🌿", "Landscape Zones", "Outdoor areas designed for everyday family use."],
] as const;

const amenities = [
  ["🌿", "Galaxy Zone Skywalk", "Elevated landscape experience with jogging and open-air comfort."],
  ["🏋️", "Gymnasium", "Fitness space within the premises."],
  ["🎭", "Multi-Purpose Hall", "Premium hall for events and celebrations."],
  ["👶", "Children's Play Zone", "Safe, bright, family-friendly play area."],
  ["🎮", "Indoor Recreation", "Indoor games and leisure space."],
  ["🔒", "24/7 Security", "CCTV and managed security coverage."],
] as const;

const floorPlanInfo: Record<FloorPlanTab, { title: string; subtitle: string; rooms: Array<[string, string]>; bullets: string[] }> = {
  typ: {
    title: "Typical 3 BHK",
    subtitle: "2nd to 12th Floor · Block A",
    rooms: [
      ["Master Bedroom", "10'0\" × 14'0\""],
      ["Bedroom 2", "10'0\" × 12'0\""],
      ["Bedroom 3", "10'0\" × 12'0\""],
      ["Drawing Room", "13'3\" × 12'3\""],
      ["Dining", "13'9\" × 10'3\""],
      ["Kitchen", "9'9\" × 8'0\""],
    ],
    bullets: [
      "Only 2 units per floor",
      "Private vestibule and dedicated lift entry",
      "Column-free living and dining zones",
      "Zero dead internal passage",
    ],
  },
  lph: {
    title: "Lower Penthouse",
    subtitle: "13th Floor · Dual-Level Exclusivity",
    rooms: [
      ["Master Bedroom", "10'5\" × 13'0\""],
      ["Bedroom 2", "9'0\" × 8'0\""],
      ["Drawing Room", "12'2\" × 12'2\""],
      ["Dining Room", "12'5\" × 10'2\""],
      ["Open Terraces", "Multiple sides"],
    ],
    bullets: [
      "Expansive terraces",
      "Dual-level style planning",
      "Panoramic views",
      "Private lift access",
    ],
  },
  uph: {
    title: "Upper Penthouse",
    subtitle: "14th Floor · Sky-Level Living",
    rooms: [
      ["4 Master Bedrooms", "10'–17' range"],
      ["Lounge", "12'3\" × 12'6\""],
      ["Open Terraces", "4 sides"],
      ["Wide Balconies", "Multiple"],
    ],
    bullets: [
      "Sky-level openness",
      "Terraces on multiple sides",
      "Dedicated lounge",
      "Panoramic skyline experience",
    ],
  },
};

function formatINR(value: number) {
  return `₹${Math.round(value).toLocaleString("en-IN")}`;
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [galleryTab, setGalleryTab] = useState<GalleryTab>("ext");
  const [floorPlanTab, setFloorPlanTab] = useState<FloorPlanTab>("typ");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [navSolid, setNavSolid] = useState(false);

  const [price, setPrice] = useState(6500000);
  const [downPayment, setDownPayment] = useState(1500000);
  const [tenure, setTenure] = useState(20);
  const [rate, setRate] = useState(8.5);

  const emiData = useMemo(() => {
    const loan = Math.max(price - downPayment, 0);
    const monthlyRate = rate / 12 / 100;
    const months = tenure * 12;
    const emi = monthlyRate === 0 ? loan / months : (loan * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = emi * months;
    const totalInterest = totalPayment - loan;
    return { loan, emi, totalPayment, totalInterest };
  }, [price, downPayment, tenure, rate]);

  useEffect(() => {
    const onScroll = () => setNavSolid(window.scrollY > 70);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxImage(null);
        setMobileMenuOpen(false);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("up");
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal, .reveal-l, .reveal-r").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const currentGallery = galleryTab === "ext" ? exteriorImages : interiorImages;
  const fp = floorPlanInfo[floorPlanTab];

  return (
    <main>
      <a href="https://wa.me/917572818000" className="wa" target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {lightboxImage && (
        <div className="lbx open" onClick={() => setLightboxImage(null)}>
          <button className="lbx-x" type="button" aria-label="Close image">✕</button>
          <img src={lightboxImage} alt="Gallery preview" />
        </div>
      )}

      <div className={`mob-menu ${mobileMenuOpen ? "open" : ""}`}>
        <button className="mob-x" type="button" onClick={() => setMobileMenuOpen(false)} aria-label="Close menu">✕</button>
        {[ ["#why", "Why Stellavia"], ["#features", "Features"], ["#gallery", "Gallery"], ["#floorplans", "Floor Plans"], ["#amenities", "Amenities"], ["#location", "Location"], ["#contact", "Book a Visit"] ].map(([href, label]) => (
          <a key={href} href={href} onClick={() => setMobileMenuOpen(false)}>{label}</a>
        ))}
      </div>

      <nav id="nav" className={navSolid ? "solid" : ""}>
        <div className="nav-logo-wrap">
          <div className="nav-logo">✦ STELLAVIA</div>
          <div className="nav-tagline">Smart Premium Living · Khoraj</div>
        </div>
        <div className="nav-right">
          <ul className="nav-links">
            <li><a href="#why">Why Us</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#floorplans">Floor Plans</a></li>
            <li><a href="#amenities">Amenities</a></li>
            <li><a href="#location">Location</a></li>
          </ul>
          <a href="#contact" className="nav-cta-btn">Enquire Now</a>
        </div>
        <button className="hamburger" type="button" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
          <span />
          <span />
          <span />
        </button>
      </nav>

      <section className="hero">
        <div className="hero-bg"><img src={exteriorImages[0]} alt="Stellavia Aerial View" /></div>
        <div className="hero-grad" />
        <div className="hero-content">
          <div className="hero-eyebrow"><span />Premium Residences · Khoraj, Gandhinagar</div>
          <h1>Not Just Affordable.<br /><em>Brilliantly</em> Designed.</h1>
          <p className="hero-sub">Where smart engineering meets genuine dignity. Only 2 flats per floor, private lifts, zero passage wastage and a CM award-winning design at a price your family can achieve.</p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-gold">Book a Site Visit</a>
            <a href="https://drive.google.com/file/d/1IB1Yorquw2TABNHD5r8nv3iBh9ModE6v/view" className="btn btn-outline" target="_blank" rel="noreferrer">Download Brochure</a>
          </div>
        </div>
        <div className="hero-pills">
          <div className="pill"><div className="pill-num">2</div><div className="pill-lbl">Flats per floor</div></div>
          <div className="pill"><div className="pill-num">0%</div><div className="pill-lbl">Passage waste</div></div>
          <div className="pill"><div className="pill-num">🏆</div><div className="pill-lbl">CM Award</div></div>
        </div>
      </section>

      <div className="rera-ticker">
        <div className="tick-dot" />
        <strong>RERA Registered</strong>
        <span>PR/GJ/GANDHINAGAR/GANDHINAGAR/Gandhinagar Municipal Corporation/MAA13956/050824/300628</span>
        <a href="https://gujrera.gujarat.gov.in" target="_blank" rel="noreferrer">Verify at gujrera.gujarat.gov.in →</a>
      </div>

      <section className="award-band">
        <div className="award-inner reveal up">
          <div className="award-trophy">
            <div className="award-trophy-icon">🏆</div>
            <div className="award-trophy-text">Best Affordable Project · Gujarat</div>
          </div>
          <div className="award-body">
            <div className="award-lbl">State Recognition</div>
            <div className="award-title">Honored as <em>Best Affordable Residential Project</em><br /><span>by the Honorable Chief Minister of Gujarat, Shri Bhupendra Bhai Patel</span></div>
          </div>
        </div>
      </section>

      <section className="why" id="why">
        <div className="why-inner">
          <div className="why-head">
            <div className="tag reveal">The Stellavia Difference</div>
            <h2 className="reveal" data-delay="2">Same price range.<br /><em>A completely different life.</em></h2>
          </div>
          <div className="compare-wrap reveal" data-delay="3">
            <div className="compare-head-row">
              <div className="ch-typical">Typical Developers</div>
              <div className="ch-divider">Compare</div>
              <div className="ch-stellavia">Stellavia</div>
            </div>
            <div className="compare-row"><div className="cr-typical">4–8 crowded units per floor</div><div className="cr-label">Density</div><div className="cr-stellavia">Only 2 exclusive flats per floor</div></div>
            <div className="compare-row"><div className="cr-typical">Dining clubbed with living room</div><div className="cr-label">Dining</div><div className="cr-stellavia">Dedicated separate dining room</div></div>
            <div className="compare-row"><div className="cr-typical">8–12% unusable dead space</div><div className="cr-label">Passage</div><div className="cr-stellavia">0% wastage inside the unit</div></div>
            <div className="compare-row"><div className="cr-typical">Columns breaking living areas</div><div className="cr-label">Living</div><div className="cr-stellavia">Completely column-less design</div></div>
          </div>
        </div>
      </section>

      <div className="numbers">
        <div className="numbers-inner">
          {[ ["2", "Exclusive Flats\nPer Floor"], ["0%", "Passage Wastage\nInside Units"], ["5", "Residential\nBlocks"], ["14", "Floors Including\nPenthouses"] ].map(([value, label], i) => (
            <div key={i} className="num-item reveal up"><div className="num-val">{value}</div><div className="num-lbl">{label}</div></div>
          ))}
        </div>
      </div>

      <section className="features" id="features">
        <div className="features-inner">
          <div className="features-head">
            <div>
              <div className="tag reveal">8 Uncompromising Advantages</div>
              <h2 className="reveal" data-delay="2">Every decision made<br />for your <em>family&apos;s life</em></h2>
            </div>
            <p className="features-intro reveal" data-delay="3">We made deliberate planning decisions that give your family dignity, privacy and pride of ownership.</p>
          </div>
          <div className="feat-grid">
            {features.map(([icon, title, desc]) => (
              <div key={title} className="feat-card reveal up">
                <div className="feat-icon">{icon}</div>
                <div className="feat-name">{title}</div>
                <div className="feat-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery" id="gallery">
        <div className="gallery-inner">
          <div className="gallery-head reveal up">
            <div>
              <div className="tag">Project Gallery</div>
              <h2 style={{ marginTop: 14 }}>See Stellavia<br />come to <em>life</em></h2>
            </div>
            <div className="gtab-row">
              <button type="button" className={`gtab ${galleryTab === "ext" ? "on" : ""}`} onClick={() => setGalleryTab("ext")}>Exterior</button>
              <button type="button" className={`gtab ${galleryTab === "int" ? "on" : ""}`} onClick={() => setGalleryTab("int")}>Interior</button>
            </div>
          </div>
          <div className="galpane on">
            {currentGallery.map((src, index) => (
              <button key={src + index} type="button" className="gi gallery-item" onClick={() => setLightboxImage(src)}>
                <img src={src} alt={`Gallery ${index + 1}`} />
                <div className="gi-ov"><div className="gi-zoom">+</div></div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="floorplans" id="floorplans">
        <div className="fp-inner">
          <div className="fp-head">
            <div className="tag reveal">Unit Layouts</div>
            <h2 className="reveal" data-delay="2">Every room<br />designed with <em>purpose</em></h2>
          </div>
          <div className="fp-tabs">
            <button type="button" className={`fp-tab ${floorPlanTab === "typ" ? "on" : ""}`} onClick={() => setFloorPlanTab("typ")}>2nd – 12th Floor</button>
            <button type="button" className={`fp-tab ${floorPlanTab === "lph" ? "on" : ""}`} onClick={() => setFloorPlanTab("lph")}>Lower Penthouse</button>
            <button type="button" className={`fp-tab ${floorPlanTab === "uph" ? "on" : ""}`} onClick={() => setFloorPlanTab("uph")}>Upper Penthouse</button>
          </div>
          <div className="fp-pane on">
            <div className="fp-img-box reveal-l up">
              <img src="https://images.squarespace-cdn.com/content/v1/69576c9e15d6285d4dbd5e92/79ca8d13-34ba-4df1-85a0-9b48e9010f9d/section.jpg" alt="Floor plan" />
            </div>
            <div className="fp-info reveal-r up">
              <div className="fp-title">{fp.title}</div>
              <div className="fp-sub">{fp.subtitle}</div>
              <div className="fp-rooms-list">
                {fp.rooms.map(([name, size]) => (
                  <div key={name} className="fp-room"><span className="fp-room-n">{name}</span><span className="fp-room-s">{size}</span></div>
                ))}
              </div>
              <div className="fp-bullets">
                {fp.bullets.map((bullet) => <div key={bullet} className="fp-bullet">{bullet}</div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="amenities" id="amenities">
        <div className="am-inner">
          <div className="am-head">
            <div className="tag reveal">Amenities</div>
            <h2 className="reveal" data-delay="2">Life beyond<br />the <em>apartment</em></h2>
          </div>
          <div className="am-grid">
            {amenities.map(([icon, title, desc]) => (
              <div key={title} className="am-card amenity-card reveal up">
                <div className="am-icon">{icon}</div>
                <div className="am-name">{title}</div>
                <div className="am-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="emi" id="emi">
        <div className="emi-inner">
          <div className="emi-left reveal-l up">
            <div className="tag">Financial Planning</div>
            <h2 style={{ marginTop: 14 }}>Calculate your<br /><em>monthly EMI</em></h2>
            <p style={{ marginTop: 12 }}>Adjust the sliders to instantly see your estimated monthly payment for a Stellavia home.</p>
            <div className="slider-group">
              <div className="sl-top"><span className="sl-label">Property Price</span><span className="sl-val">{formatINR(price)}</span></div>
              <input type="range" min="4000000" max="12000000" step="100000" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            </div>
            <div className="slider-group">
              <div className="sl-top"><span className="sl-label">Down Payment</span><span className="sl-val">{formatINR(downPayment)}</span></div>
              <input type="range" min="500000" max="3000000" step="100000" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
            </div>
            <div className="slider-group">
              <div className="sl-top"><span className="sl-label">Loan Tenure</span><span className="sl-val">{tenure} Years</span></div>
              <input type="range" min="5" max="30" step="1" value={tenure} onChange={(e) => setTenure(Number(e.target.value))} />
            </div>
            <div className="slider-group">
              <div className="sl-top"><span className="sl-label">Interest Rate</span><span className="sl-val">{rate.toFixed(1)}%</span></div>
              <input type="range" min="6" max="12" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
            </div>
          </div>
          <div className="emi-right reveal-r up">
            <div className="emi-lbl">Your Monthly EMI</div>
            <div className="emi-num">{formatINR(emiData.emi)}</div>
            <div className="emi-per">per month</div>
            <div className="emi-lines">
              <div className="emi-line"><span>Loan Amount</span><strong>{formatINR(emiData.loan)}</strong></div>
              <div className="emi-line"><span>Total Interest</span><strong>{formatINR(emiData.totalInterest)}</strong></div>
              <div className="emi-line"><span>Total Payment</span><strong>{formatINR(emiData.totalPayment)}</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section className="location" id="location">
        <div className="loc-inner">
          <div className="loc-left reveal-l up">
            <div className="tag">Strategic Location</div>
            <h2>At the centre of<br />Gandhinagar&apos;s <em>future</em></h2>
            <p style={{ marginTop: 14 }}>Khoraj sits at the nexus of Ahmedabad&apos;s fast-growing real estate corridor with premium connectivity.</p>
            <div className="lm-list">
              {[ ["🏛️", "Nirma University", "Nearby"], ["🏦", "GIFT City IFSC", "~15 min"], ["🛒", "CBD Mall", "Minutes away"], ["🎓", "SSRV School", "Nearby"] ].map(([icon, name, dist]) => (
                <div key={name} className="lm"><div className="lm-ico">{icon}</div><span className="lm-name">{name}</span><span className="lm-dist">{dist}</span></div>
              ))}
            </div>
            <div className="loc-addr">
              <p><strong>Address:</strong> Behind Luby Corporate House, Nr. Sarjan Era, Khoraj, Gandhinagar – 382421</p>
              <a href="https://maps.app.goo.gl/xNxbYpbRNNo8Bw738" target="_blank" rel="noreferrer" className="btn btn-gold" style={{ marginTop: 16 }}>Get Directions</a>
            </div>
          </div>
          <div className="loc-right reveal-r up">
            <div className="map-box">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7335.2!2d72.61!3d23.15!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e83e3b7765555%3A0x5c7945a9d4e4c5a5!2sKhoraj%2C+Gandhinagar%2C+Gujarat!5e0!3m2!1sen!2sin!4v1" loading="lazy" />
            </div>
          </div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="con-inner">
          <div className="con-left reveal-l up">
            <div className="tag">Get In Touch</div>
            <h2>Your dream home<br />is <em>ready to meet you</em></h2>
            <p style={{ marginTop: 12 }}>Visit our site 7 days a week. Our team will walk you through every detail.</p>
            <div className="con-channels">
              <div className="con-ch"><div className="con-ch-ico">📞</div><div><div className="con-ch-lbl">Booking Hotline</div><div className="con-ch-val"><a href="tel:+917572818000">75728 18000</a></div></div></div>
              <div className="con-ch"><div className="con-ch-ico">💬</div><div><div className="con-ch-lbl">WhatsApp</div><div className="con-ch-val"><a href="https://wa.me/917572818000" target="_blank" rel="noreferrer">Chat with us</a></div></div></div>
              <div className="con-ch"><div className="con-ch-ico">📧</div><div><div className="con-ch-lbl">Email</div><div className="con-ch-val"><a href="mailto:infinitystellavia99@gmail.com">infinitystellavia99@gmail.com</a></div></div></div>
            </div>
          </div>
          <div className="reveal-r up">
            <form className="con-form" onSubmit={(e) => { e.preventDefault(); alert("Thank you! Our team will contact you within 24 hours."); }}>
              <div className="frow">
                <div className="fg"><label className="flabel">Full Name</label><input className="finput" type="text" placeholder="Your name" required /></div>
                <div className="fg"><label className="flabel">Phone Number</label><input className="finput" type="tel" placeholder="+91 XXXXX XXXXX" required /></div>
              </div>
              <div className="fg"><label className="flabel">Email Address</label><input className="finput" type="email" placeholder="your@email.com" /></div>
              <div className="fg"><label className="flabel">Interested In</label>
                <select className="fselect" defaultValue="3 BHK Apartment">
                  <option>3 BHK Apartment</option>
                  <option>Lower Penthouse</option>
                  <option>Upper Penthouse</option>
                  <option>Commercial Shop</option>
                </select>
              </div>
              <div className="fg"><label className="flabel">Message</label><textarea className="ftextarea" placeholder="Any specific requirements?" /></div>
              <button className="fsubmit" type="submit">Request a Site Visit</button>
            </form>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-grid">
          <div>
            <div className="flogo">✦ STELLAVIA</div>
            <p className="ftagline">Smart Premium Living in the affordable segment. Khoraj, Gandhinagar — by Infinity Projects.</p>
          </div>
          <div>
            <div className="fcol-title">Explore</div>
            <ul className="flinks">
              <li><a href="#why">Why Stellavia</a></li>
              <li><a href="#features">Features</a></li>
              <li><a href="#gallery">Gallery</a></li>
            </ul>
          </div>
          <div>
            <div className="fcol-title">Information</div>
            <ul className="flinks">
              <li><a href="#floorplans">Floor Plans</a></li>
              <li><a href="#amenities">Amenities</a></li>
              <li><a href="#location">Location</a></li>
            </ul>
          </div>
          <div>
            <div className="fcol-title">Contact</div>
            <ul className="flinks">
              <li><a href="tel:+917572818000">75728 18000</a></li>
              <li><a href="mailto:infinitystellavia99@gmail.com">Email Us</a></li>
              <li><a href="https://wa.me/917572818000" target="_blank" rel="noreferrer">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="fb-left">© 2025 Infinity Projects · Stellavia · All rights reserved</div>
          <div className="fb-rera">RERA: PR/GJ/GANDHINAGAR/GANDHINAGAR/Gandhinagar Municipal Corporation/MAA13956/050824/300628</div>
        </div>
      </footer>
    </main>
  );
}
