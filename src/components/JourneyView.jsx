const logoUrl = (domain) => `https://www.google.com/s2/favicons?domain=${domain}&sz=128`

const experienceItems = [
  {
    title: 'Engineer',
    meta: 'supermileage - Full-time',
    date: 'Mar 2026 - Present',
    location: 'Bengaluru, Karnataka, India - On-site',
    logo: 'SM',
    logoUrl: logoUrl('supermileage.in'),
    tone: 'accent',
  },
  {
    title: 'Senior Software Engineer',
    meta: 'NTUC First Campus - Part-time',
    date: 'Jul 2024 - Nov 2025',
    location: 'Singapore - Remote',
    logo: 'FC',
    logoUrl: logoUrl('ntucfirstcampus.com'),
    tone: 'green',
  },
  {
    title: 'Freelance',
    meta: 'Confidential - Freelance',
    date: 'Mar 2025 - Jun 2025',
    location: 'Bengaluru, Karnataka, India - Hybrid',
    logo: 'FL',
    tone: 'cream',
  },
  {
    title: 'Lead Software Engineer',
    meta: 'RSTACK SOLUTIONS - Full-time',
    date: 'Nov 2022 - Feb 2024',
    location: 'Bengaluru, Karnataka, India',
    logo: 'RS',
    logoUrl: logoUrl('rstacksolutions.com'),
    tone: 'red',
  },
  {
    title: 'Software Engineer',
    meta: 'Recro - Full-time',
    date: 'Dec 2020 - Oct 2022',
    location: 'Bengaluru, Karnataka, India',
    logo: 'R',
    logoUrl: logoUrl('recro.io'),
    tone: 'pink',
  },
  {
    title: 'SDE',
    meta: 'Swiggy - Part-time',
    date: 'Jun 2021 - Jun 2022',
    location: 'Bengaluru, Karnataka, India',
    logo: 'SW',
    logoUrl: logoUrl('swiggy.com'),
    tone: 'orange',
  },
  {
    title: 'React Native Developer',
    meta: 'Memorang',
    date: 'Mar 2019 - Nov 2020',
    location: 'Chennai, Tamil Nadu, India',
    logo: 'ME',
    logoUrl: logoUrl('memorang.com'),
    tone: 'teal',
  },
  {
    title: 'Internship',
    meta: 'Digiryte',
    date: 'Jun 2017 - Oct 2017',
    location: 'Greater Chennai Area',
    logo: 'DG',
    logoUrl: logoUrl('digiryte.com'),
    tone: 'coral',
  },
]

const educationItems = [
  {
    title: 'College of Engineering, Guindy',
    meta: 'Integrated Msc(5 years), Computer Science',
    date: '2014 - 2019',
    logo: 'CEG',
    logoUrl: logoUrl('annauniv.edu'),
    tone: 'gold',
  },
]

const logoToneClasses = {
  accent: 'journey-logo--accent',
  green: 'journey-logo--green',
  cream: 'journey-logo--cream',
  red: 'journey-logo--red',
  pink: 'journey-logo--pink',
  orange: 'journey-logo--orange',
  teal: 'journey-logo--teal',
  coral: 'journey-logo--coral',
  gold: 'journey-logo--gold',
}

function JourneySection({ title, items, withLine = false }) {
  return (
    <section className="journey-section">
      <h2 className="journey-section__title">{title}</h2>

      <div className={`journey-list ${withLine ? 'journey-list--line' : ''}`}>
        {items.map((item) => (
          <article key={`${item.title}-${item.date}`} className="journey-row">
            <div
              className={`journey-logo ${item.logoUrl ? 'journey-logo--image' : logoToneClasses[item.tone]}`}
              aria-hidden="true"
            >
              {item.logoUrl ? <img src={item.logoUrl} alt="" loading="lazy" /> : item.logo}
            </div>
            <div className="journey-row__copy">
              <h3>{item.title}</h3>
              <p className="journey-row__meta">{item.meta}</p>
              {item.location && <p className="journey-row__location">{item.location}</p>}
            </div>
            <time className="journey-row__date">{item.date}</time>
          </article>
        ))}
      </div>
    </section>
  )
}

function JourneyView() {
  return (
    <div className="journey-page">
      <aside className="journey-title-block">
        <h1 className="journey-title">
          The <span>journey</span> so far
        </h1>
      </aside>

      <main className="journey-content" aria-label="Education and work history">
        <JourneySection title="Experience" items={experienceItems} withLine />
        <JourneySection title="Education" items={educationItems} />
      </main>
    </div>
  )
}

export default JourneyView
