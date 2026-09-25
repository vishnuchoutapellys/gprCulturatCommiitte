import React from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Countdown from './components/Countdown'
import About from './components/About'
import Highlights from './components/Highlights'
import Schedule from './components/Schedule'
import Committee from './components/Committee'
import Gallery from './components/Gallery'
import Programs from './components/Programs'
import Participation from './components/Participation'
import Donation from './components/Donation'
import Venue from './components/Venue'
import RSVPForm from './components/RSVPForm'
import Contact from './components/Contact'
import Footer from './components/Footer'
import DevotionalAudio from './components/DevotionalAudio'

export default function App(){
  return (
    <div className="min-h-screen text-slate-900">
      <Header />
      <DevotionalAudio />
      <main>
        <Hero />
        <section className="max-w-6xl mx-auto px-4 py-8">
          <Countdown />
          <About />
          <Highlights />
          <Schedule />
          <Programs />
          <Committee />
          <Gallery />
          <Participation />
          <Donation />
          <Venue />
          <RSVPForm />
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  )
}
