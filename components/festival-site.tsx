'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowDown, ArrowRight, Check, ChevronLeft, ChevronRight, Clock3, Heart, Mail, MapPin, Menu, Phone, Sparkles, X } from 'lucide-react'

const photos = {
  hero: '/ganesh-hero.png',
  story: 'https://images.unsplash.com/photo-1567591414240-e0d49bfc8b5b?auto=format&fit=crop&w=1200&q=85',
  festival: 'https://images.unsplash.com/photo-1604608672516-f1b9b1bd7ef3?auto=format&fit=crop&w=1000&q=84',
  decoration: 'https://images.unsplash.com/photo-1564135624576-c5c88640f235?auto=format&fit=crop&w=1800&q=85',
  aarti: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=84',
  crowd: 'https://images.unsplash.com/photo-1533639321951-3c7e4e7efb1c?auto=format&fit=crop&w=900&q=84',
  seva: 'https://images.unsplash.com/photo-1594708767771-a7502209ff51?auto=format&fit=crop&w=1000&q=84',
}

const festivalCards = [
  ['01', 'Ganesh Sthapana', 'A sacred welcome, bringing Bappa home with dhol, flowers and collective prayer.', 'https://images.unsplash.com/photo-1606293926249-edf74b6f9c7e?auto=format&fit=crop&w=800&q=80'],
  ['02', 'Daily Aarti', 'Begin each day with the warmth of devotion, music and a thousand shared voices.', photos.aarti],
  ['03', 'Cultural Programs', 'A vibrant stage for local artists, children and the traditions we carry forward.', photos.crowd],
  ['04', 'Mahaprasad', 'Food made with love, served with humility and shared across our neighbourhood.', photos.seva],
  ['05', 'Special Events', 'Thoughtfully curated gatherings that make every evening of the festival memorable.', photos.decoration],
  ['06', 'Visarjan', 'A beautiful farewell, filled with gratitude, music and the promise of Bappa’s return.', 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80'],
]
const events = [
  ['AUG 27', 'Morning Aarti', '07:30 AM', 'Mandal Pandal'],
  ['AUG 28', 'Cultural Night', '07:00 PM', 'Panchsheel Ground'],
  ['AUG 30', 'Mahaprasad', '12:30 PM', 'Community Hall'],
  ['SEP 01', 'Special Darshan', '06:00 PM', 'Mandal Pandal'],
  ['SEP 03', 'Visarjan', '04:00 PM', 'Procession Route'],
]
const gallery = [
  ['Ganeshotsav', photos.hero, 'The arrival of Bappa'], ['Aarti', photos.aarti, 'Evening aarti'], ['Decoration', photos.decoration, 'A celebration in detail'], ['Events', photos.crowd, 'Together in devotion'], ['Visarjan', 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=1200&q=82', 'Until next year'], ['Celebrations', photos.festival, 'Community celebration'],
]
const seva = [['Blood Donation', 'Give the gift of life', 'HeartPulse'], ['Food Distribution', 'A warm meal for every neighbour', 'HandHeart'], ['Educational Support', 'Building brighter beginnings', 'BookOpen'], ['Medical Camps', 'Care that reaches everyone', 'Plus'], ['Community Service', 'Small acts, lasting impact', 'Users'], ['Environmental Initiatives', 'A cleaner tomorrow for all', 'Leaf']]
const committee = [['Jatin Sanotiya', 'President', 'JS'], ['Raha', 'Vice President', 'R'], ['Devendra Parmar', 'Secretary', 'DP'], ['Jayvardhan', 'Treasurer', 'J']]

function SectionHeading({ eyebrow, title, copy, light = false }: { eyebrow: string; title: string; copy?: string; light?: boolean }) {
  return <div className={`section-heading ${light ? 'section-heading-light' : ''}`}><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
}

function Logo() { return <Link href="#home" className="brand" aria-label="New Panchsheel Ke Raja home"><img src="/logo.png" alt="New Panchsheel Ke Raja logo" className="brand-logo"/><span><strong>NEW PANCHSHEEL</strong><small>KE RAJA · GANESH MANDAL</small></span></Link> }

export default function FestivalSite() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState<number | null>(null)
  const [days, setDays] = useState(0); const [hours, setHours] = useState(0); const [minutes, setMinutes] = useState(0); const [seconds, setSeconds] = useState(0)
  const filteredGallery = useMemo(() => filter === 'All' ? gallery : gallery.filter(item => item[0].toLowerCase() === filter.toLowerCase()), [filter])
  useEffect(() => { const target = new Date('2026-08-27T07:30:00+05:30').getTime(); const tick = () => { const diff = Math.max(0, target - Date.now()); setDays(Math.floor(diff / 86400000)); setHours(Math.floor(diff / 3600000) % 24); setMinutes(Math.floor(diff / 60000) % 60); setSeconds(Math.floor(diff / 1000) % 60) }; tick(); const timer = setInterval(tick, 1000); return () => clearInterval(timer) }, [])
  const nav = ['ABOUT US', 'GANESHOTSAV', 'EVENTS', 'GALLERY', 'SOCIAL INITIATIVES', 'CONTACT']
  return <main id="home">
    <header className="site-header"><div className="container nav-wrap"><Logo /><nav className={menuOpen ? 'nav-links open' : 'nav-links'}>{nav.map(item => <a key={item} href={`#${item.toLowerCase().replaceAll(' ', '-')}`} onClick={() => setMenuOpen(false)}>{item}</a>)}<Link href="/donation.html" className="nav-darshan">DARSHAN <span>↗</span></Link></nav><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button></div></header>
    <section className="hero" aria-labelledby="hero-title"><img src={photos.hero} alt="Warmly lit Ganesh idol at a devotional celebration" className="hero-image"/><div className="hero-shade"/><div className="container hero-content"><p className="hero-kicker">NEW PANCHSHEEL KE RAJA GANESH MANDAL</p><h1 id="hero-title">Ganpati Bappa<br/><em>Morya</em></h1><p className="hero-copy">Celebrating devotion, tradition, unity and the spirit of Ganeshotsav.</p><div className="hero-actions"><Link href="#about-us" className="button button-outline">Explore Our Mandal <ArrowRight size={16}/></Link><Link href="#gallery" className="button button-text">View Gallery</Link></div><Link href="/donation.html" className="donate-hero">🙏 <span>DONATE NOW</span><ArrowRight size={21}/></Link></div><a className="scroll-cue" href="#about-us" aria-label="Scroll to our story"><span>SCROLL TO DISCOVER</span><ArrowDown size={16}/></a><div className="hero-location"><MapPin size={15}/> Musakhdi · Indore</div></section>

    <section id="about-us" className="section section-story"><div className="container story-grid"><div className="story-photo"><img src={photos.story} alt="Devotees gathered before a Ganesh idol" loading="lazy"/><span className="photo-caption">A tradition of faith<br/><b>since 2019</b></span></div><div className="story-copy"><SectionHeading eyebrow="OUR STORY" title="A celebration that feels like home." copy="Born from a shared dream in the heart of our neighbourhood, New Panchsheel Ke Raja has grown into a celebration of faith, culture and community."/><p>For over two decades, our mandal has welcomed every family, every generation and every story. From the first aarti to the final visarjan, we create a space where devotion becomes a living, breathing part of everyday life.</p><p>What began as a small gathering now brings together thousands in a spirit of seva, togetherness and joy. This is our home. This is our Bappa.</p><a href="#social-initiatives" className="text-link">Read our story <ArrowRight size={16}/></a></div></div></section>

    <section id="ganeshotsav" className="section section-festival"><div className="container"><SectionHeading eyebrow="THE FESTIVAL" title="Ten days. One feeling." copy="Every moment of Ganeshotsav is an invitation to pause, participate and celebrate what connects us."/><div className="festival-grid">{festivalCards.map(([num, title, desc, img]) => <article className="festival-card" key={title}><img src={img} alt={title} loading="lazy"/><div className="festival-card-body"><span>{num}</span><h3>{title}</h3><p>{desc}</p><ArrowRight size={17}/></div></article>)}</div></div></section>

    <section id="events" className="section section-events"><div className="container events-grid"><div><SectionHeading eyebrow="COME TOGETHER" title="Moments worth gathering for." copy="Mark your calendar and join us for the celebrations that make our Ganeshotsav unforgettable."/><Link href="#contact" className="button button-dark">View all events <ArrowRight size={16}/></Link></div><div className="event-list">{events.map(([date, name, time, place]) => <div className="event-row" key={name}><div className="event-date">{date}</div><div><h3>{name}</h3><p><Clock3 size={14}/> {time} <span>·</span> <MapPin size={14}/> {place}</p></div><ArrowRight size={18}/></div>)}</div></div></section>

    <section className="highlight"><img src={photos.festival} alt="Ganesh idol surrounded by flowers" loading="lazy"/><div className="highlight-overlay"/><div className="container highlight-content"><span className="eyebrow">SAVE THE DATE · 27 AUG — 06 SEP 2026</span><h2>The grandeur of<br/><em>Ganeshotsav 2026</em></h2><p>Experience devotion, tradition and celebration with New Panchsheel Ke Raja.</p><div className="countdown">{[[days, 'DAYS'], [hours, 'HOURS'], [minutes, 'MINUTES'], [seconds, 'SECONDS']].map(([value, label]) => <div key={label}><strong>{String(value).padStart(2, '0')}</strong><span>{label}</span></div>)}</div><Link href="/donation.html" className="button button-gold">Support the celebration <ArrowRight size={16}/></Link></div></section>

    <section className="section section-decoration"><div className="container"><div className="decoration-head"><SectionHeading eyebrow="THE 2026 THEME" title="A story told in light, colour and craft." copy="Step into this year’s grand decoration — a space created to make every darshan feel extraordinary."/><a href="#gallery" className="text-link">Explore the theme <ArrowRight size={16}/></a></div><div className="decoration-gallery"><img src={photos.decoration} alt="Intricate festival decoration with warm lights" loading="lazy"/><div><img src={photos.aarti} alt="Devotional ritual detail" loading="lazy"/><div className="decoration-note"><Sparkles size={20}/><span>Where every detail<br/><b>has a meaning.</b></span></div></div></div></div></section>

    <section id="gallery" className="section section-gallery"><div className="container"><SectionHeading eyebrow="FROM OUR ARCHIVES" title="A few beautiful memories." copy="A glimpse into the moments, people and rituals that make our celebration ours."/><div className="filter-row">{['All', 'Ganeshotsav', 'Aarti', 'Decoration', 'Events', 'Visarjan', 'Celebrations'].map(item => <button key={item} className={filter === item ? 'active' : ''} onClick={() => setFilter(item)}>{item}</button>)}</div><div className="gallery-grid">{filteredGallery.map(([cat, img, alt], i) => <button className={`gallery-item gallery-${i % 3}`} onClick={() => setSelected(i)} key={`${cat}-${img}`}><img src={img} alt={alt} loading="lazy"/><span>{cat}</span></button>)}</div></div>{selected !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Gallery image"><button className="lightbox-close" onClick={() => setSelected(null)} aria-label="Close gallery"><X/></button><img src={filteredGallery[selected][1]} alt={filteredGallery[selected][2]}/><button className="lightbox-prev" onClick={() => setSelected((selected - 1 + filteredGallery.length) % filteredGallery.length)} aria-label="Previous image"><ChevronLeft/></button><button className="lightbox-next" onClick={() => setSelected((selected + 1) % filteredGallery.length)} aria-label="Next image"><ChevronRight/></button></div>}</section>

    <section id="social-initiatives" className="section section-seva"><div className="container seva-grid"><div className="seva-intro"><SectionHeading eyebrow="BEYOND THE FESTIVAL" title="Seva is our duty." copy="Our devotion finds its fullest expression when it reaches beyond the mandal and into the community."/><img src={photos.seva} alt="Community volunteers serving food" loading="lazy"/><div className="seva-stat"><strong>2,500+</strong><span>families supported<br/>every year</span></div></div><div className="seva-list">{seva.map(([title, desc, icon]) => <div className="seva-item" key={title}><div className="seva-icon"><Heart size={17}/></div><div><h3>{title}</h3><p>{desc}</p></div><ArrowRight size={16}/></div>)}</div></div></section>

    <section className="section donation-band"><div className="container donation-grid"><div><span className="eyebrow">KEEP THE FAITH GROWING</span><h2>Support our seva.</h2><p>Your contribution helps us continue our cultural, religious and social initiatives.</p></div><Link href="/donation.html" className="button button-gold button-large">🙏 Donate Now <ArrowRight size={18}/></Link><div className="trust-note"><Check size={16}/> Secure & transparent giving</div></div></section>

    <section className="section section-committee"><div className="container"><SectionHeading eyebrow="THE PEOPLE BEHIND THE CELEBRATION" title="Our committee."/><div className="committee-grid">{committee.map(([name, role, initials]) => <article className="committee-card" key={name}><div className="avatar">{initials}</div><h3>{name}</h3><p>{role}</p></article>)}</div></div></section>

    <section id="contact" className="section section-contact"><div className="container contact-grid"><div><SectionHeading eyebrow="COME SAY HELLO" title="Be a part of the celebration." copy="Whether you want to volunteer, collaborate or simply come for darshan, we would love to hear from you."/><div className="contact-details"><p><MapPin size={18}/><span>Musakhdi,<br/>Indore, Madhya Pradesh</span></p><p><Phone size={18}/><span>+91 93026 69979</span></p><p><Mail size={18}/><span>hello@newpanchsheelkeraja.org</span></p></div></div><form className="contact-form" onSubmit={e => e.preventDefault()}><div className="form-row"><label>Name<input required placeholder="Your name"/></label><label>Mobile number<input required type="tel" placeholder="+91"/></label></div><label>Email address<input required type="email" placeholder="you@example.com"/></label><label>Message<textarea required placeholder="How can we help?" rows={4}/></label><button className="button button-dark" type="submit">Send Message <ArrowRight size={16}/></button></form></div></section>

    <footer className="site-footer"><div className="container footer-top"><div><Logo/><p className="footer-description">A celebration of faith, culture and community.<br/>Ganpati Bappa Morya.</p></div><div><span className="footer-label">QUICK LINKS</span><div className="footer-links"><a href="#about-us">Our Story</a><a href="#events">Events</a><a href="#gallery">Gallery</a><a href="#social-initiatives">Seva</a></div></div><div><span className="footer-label">GET IN TOUCH</span><p className="footer-contact">New Panchsheel Ground<br/>Chembur, Mumbai 400071<br/><br/>+91 93026 69979</p></div><div><span className="footer-label">FOLLOW THE JOURNEY</span><div className="socials"><a href="#instagram" aria-label="Instagram"><Heart size={18}/></a><a href="#facebook" aria-label="Facebook"><Heart size={18}/></a><a href="#youtube" aria-label="YouTube"><Heart size={18}/></a></div><Link href="/donation.html" className="footer-donate">Donate to our seva <ArrowRight size={15}/></Link></div></div><div className="container footer-bottom"><span>© 2026 New Panchsheel Ke Raja. All Rights Reserved.</span><span>Made with devotion.</span></div></footer><Link href="/donation.html" className="floating-donate" aria-label="Donate now"><Heart size={20}/><span>Donate</span></Link>
  </main>
}
