// Resolve local asset URLs so Vite rewrites them correctly during build
const paymentImg = new URL('../assets/payment.png', import.meta.url).href
const logoImg = new URL('../assets/lgpGanesha.png', import.meta.url).href
const tirupathiImg = new URL('../assets/tirupathi.png', import.meta.url).href
// Prefer .mp3 for wider mobile/iOS compatibility
const localMusic = new URL('../assets/music/song.mp3', import.meta.url).href
const ganesh1 = new URL('../assets/ganesh1.jpg', import.meta.url).href
const ganesh2 = new URL('../assets/ganesh2.jpg', import.meta.url).href
const ganesh3 = new URL('../assets/ganesh3.jpg', import.meta.url).href
const ganesh4 = new URL('../assets/ganesh4.jpg', import.meta.url).href
const ganesh5 = new URL('../assets/ganesh5.jpg', import.meta.url).href
const ganesh6 = new URL('../assets/ganesh6.jpg', import.meta.url).href
const ganesh7 = new URL('../assets/ganesh7.jpg', import.meta.url).href
const sthapanaImg = new URL('../assets/sthapana.jpg', import.meta.url).href

import jaswanthImg from '../assets/committee/jaswanth.jpeg'
import aravindImg from '../assets/committee/aravind.png'
import altImg from '../assets/committee/alt.jpg'



export const siteConfig = {
  associationName: 'LGP Owners Cultural Committee',
  eventName: 'Lahari Green Park Ganesh Chaturthi Celebrations 2026',
  placeName: 'Lahari Green Park, Bowrampet, Telangana',
  // Primary start (Sthapana) date/time for countdown
  eventDateISO: '2026-09-14T18:00:00',
  // Full celebration range
  eventRange: {
    start: '2026-09-14',
    end: '2026-09-20'
  },
  sthapanaDate: '2026-09-14',
  venue: {
    name: 'Lahari Green Park',
    address: 'Vinayaka Mandapam, Association Office, LGP, Bowrampet, 500043, Telangana',
    mapsUrl: 'https://maps.app.goo.gl/baovJgUUfrgeZ2Wu6'
  },
  contact: {
    phone: '+91 84999 84555',
    whatsapp: '+918499984555',
    email: '[EMAIL_ADDRESS]'
  },
  donation: {
    upiId: 'chemistryiit2012-1@oksbi',
    qrImage: paymentImg,
    contact: '[DONATION_CONTACT]'
  }

  ,
  // Devotional audio files (resolved so Vite includes them)
  audio: {
    // default chant file for Ganesh festival (bundled and played programmatically)
    music: localMusic,
    bell: '/assets/audio/temple-bell.mp3'
  }
}

// Detailed event copy and donation requirements (actual details provided)
export const eventDetails = {
  intro: `🙏🌺 GANESH CHATURTHI 2026 – DONOR & SPONSORSHIP INVITATION 🌺🙏\n\nWith the blessings of Lord Ganesha, our Lahari Green Park community is celebrating 7 Days of Ganesh Chaturthi from September 14th to September 20th, 2026.\nSthapana: 14/09/2026\n\nThe celebrations will include daily Pooja & Aarti, cultural programs, devotional activities, community events, and Grand Annadanam on September 20th afternoon.`,
  annadanamDate: '2026-09-20',
  donationMethodsNote: 'DONATIONS CAN BE IN CASH, UPI OR IN KIND.',
  donationRequirements: [
    'Ganesh Idol & Pattu Vastram',
    'Chairs – 150 Nos. (minimum 25 chairs can be sponsored)',
    'Sound System with Mic',
    'Focus Lights – 10 Nos.',
    'Laddu – 10 Kg',
    'Stage Carpet',
    'Akhanda Deepam Setup',
    'Pooja Items – Bells, Harathi Plates, Diyas, Pooja Samagri',
    'DJ & Visarjan/Nimarjanam Arrangements',
    'Daily Gaja Mala & Flowers',
    'Mandapam Decoration'
  ],
  annadanamContributions: [
    'Rice', 'Kirana/Grocery Items', 'Vegetables', 'Other food-related requirements'
  ],
  donorConfirmationDeadline: '2026-08-26T17:00:00'
}

// API base for server endpoints (RSVP). Update if you run the server on a different port or host.
export const apiConfig = {
  // Allow overriding at build time with Vite env var VITE_API_BASE.
  // In production we default to `/api` so the site can call a Vercel Serverless function.
  apiBase: (import.meta.env && import.meta.env.VITE_API_BASE) || '/api'
}

// For quick real-photo placeholders we provide Unsplash Source queries below.
// These URLs return royalty-free photos matching the query and are suitable
// as temporary real-photo references. Replace with local optimized files
// in `src/assets/` for production.
export const photoChoices = {
  hero: 'https://source.unsplash.com/1000x800/?ganesha,temple,festival',
  heroAlt: 'Ganesha idol at festival',
  committeePortrait: (i = 1) => `https://source.unsplash.com/400x400/?portrait,person,face&sig=${i}`,
  galleryQueries: [
    'https://source.unsplash.com/800x600/?pooja,prayers',
    'https://source.unsplash.com/800x600/?festival,crowd',
    'https://source.unsplash.com/800x600/?traditional,dance',
    'https://source.unsplash.com/800x600/?music,performance',
    'https://source.unsplash.com/800x600/?community,event',
    'https://source.unsplash.com/800x600/?offering,annadanam',
    'https://source.unsplash.com/800x600/?procession,immersion',
    'https://source.unsplash.com/800x600/?kids,performance'
  ]
}

// Committee, gallery and asset references are centralized here so maintainers can
// replace placeholder images with real photos (local paths) or external URLs.
export const siteAssets = {
  logo: logoImg,
  heroImage: photoChoices.hero,
  committeeMembers: [
    { name: 'Murali Garu', role: 'EC Member, LGP Owners Welfare Association', phone: '+919949292259', img: altImg },
    { name: 'Srinivas Reddy ', role: 'EC Member, LGP Owners Welfare Association', phone: '+919245884217', img: altImg },
    { name: 'Prasanth', role: 'EC Member, LGP Owners Welfare Association', phone: '+919000311123', img: altImg },
    { name: 'Thirupathi YSR', role: '', phone: '+918499984555', img: tirupathiImg },
    { name: 'Jaswanth ', role: '', phone: '+919866099677', img: jaswanthImg },
    { name: 'Aravind ', role: '', phone: '+916281116559', img: aravindImg },
  ],
  // Gallery files: prefer local images in `src/assets/` named ganesha1.jpg..ganesha8.jpg
  // If those files are not present, fall back to Unsplash queries defined above.
  galleryPlaceholders: [
    { src: ganesh1, alt: 'Gallery 1' },
    { src: ganesh2, alt: 'Gallery 2' },
    { src: ganesh3, alt: 'Gallery 3' },
    { src: ganesh4, alt: 'Gallery 4' },
    { src: ganesh5, alt: 'Gallery 5' },
    { src: ganesh6, alt: 'Gallery 6' },
    { src: ganesh7, alt: 'Gallery 7' },
    { src: sthapanaImg, alt: 'Gallery 8' }
  ]
}
