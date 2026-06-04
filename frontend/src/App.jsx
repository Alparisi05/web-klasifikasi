import React from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import HowItWorks from './components/HowItWorks.jsx';
import ScanSection from './components/ScanSection.jsx';
import Categories from './components/Categories.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <HowItWorks />
      <ScanSection />
      <Categories />
      <Footer />
    </>
  );
}
