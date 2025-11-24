
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";

// --- Data & Constants ---

const SERVICES = [
  { id: 1, title: 'Factories Act License', hindi: 'फैक्ट्री एक्ट लाइसेंस', icon: 'fa-industry', desc: 'Complete licensing, map approval, and renewal services for factories in UP.' },
  { id: 2, title: 'ESI & PF Compliance', hindi: 'ईएसआई और पीएफ', icon: 'fa-users', desc: 'Monthly return filing, challan generation, and solving employee claims.' },
  { id: 3, title: 'Pollution Board NOC', hindi: 'प्रदूषण नियंत्रण एनओसी', icon: 'fa-smog', desc: 'CTE (Consent to Establish) and CTO (Consent to Operate) from UPPCB.' },
  { id: 4, title: 'Fire NOC & Safety', hindi: 'अग्निशमन एनओसी', icon: 'fa-fire-extinguisher', desc: 'Fire department No Objection Certificate and safety audit reports.' },
  { id: 5, title: 'Contract Labor License', hindi: 'लेबर लाइसेंस', icon: 'fa-id-card', desc: 'Registration under CLRA for engaging contract workers legally.' },
  { id: 6, title: 'Shop & Establishment', hindi: 'दुकान एवं स्थापना', icon: 'fa-store', desc: 'Commercial registration for offices, shops, and commercial entities.' },
  { id: 7, title: 'Payroll & Bonus Act', hindi: 'वेतन और बोनस', icon: 'fa-file-invoice-dollar', desc: 'Statutory compliance for Bonus, Gratuity, and Minimum Wages Act.' },
  { id: 8, title: 'Electrical Safety', hindi: 'विद्युत सुरक्षा', icon: 'fa-bolt', desc: 'NOC for DG Sets and electrical load safety certificates.' },
  { id: 9, title: 'Factory Map Approval', hindi: 'नक्शा स्वीकृति', icon: 'fa-map', desc: 'Liaisoning with authorities for factory building plan approvals.' },
  { id: 10, title: 'MSME Registration', hindi: 'एमएसएमई पंजीकरण', icon: 'fa-certificate', desc: 'Udyam registration to avail government benefits for small businesses.' },
  { id: 11, title: 'Notice Reply', hindi: 'कानूनी नोटिस', icon: 'fa-gavel', desc: 'Professional drafting of replies to labor and factory inspector notices.' },
  { id: 12, title: 'General Consultancy', hindi: 'परामर्श सेवाएं', icon: 'fa-handshake', desc: 'Expert advice on industrial disputes and everyday compliance issues.' },
];

const CONTACT_INFO = {
  phone: '9811155576',
  email: 'arvind.hi05@gmail.com',
  address: 'Shop No.-6, 1st Floor, SHD Complex, Shatabdi Enclave, Sector-49, Noida'
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'About Us', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-white/90 backdrop-blur-md py-4'}`}>
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-brand-blue text-white flex items-center justify-center rounded-lg shadow-md">
            <i className="fa-solid fa-briefcase text-lg lg:text-xl"></i>
          </div>
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xl lg:text-2xl text-brand-blue leading-none">
              Consultation House
            </span>
            <span className="text-xs font-semibold text-brand-amber uppercase tracking-wide">
              Industrial Experts
            </span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-sans font-medium text-brand-text hover:text-brand-blue transition-colors text-sm uppercase tracking-wide"
            >
              {link.name}
            </a>
          ))}
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="bg-brand-blue text-white hover:bg-brand-lightBlue px-6 py-2.5 rounded-full font-bold shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
          >
             <i className="fa-solid fa-phone-volume"></i> {CONTACT_INFO.phone}
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-2xl text-brand-blue p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <i className={`fa-solid ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`lg:hidden fixed inset-0 bg-white z-40 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-full pt-24 px-6">
           <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-2xl font-serif font-bold text-brand-blue border-b border-gray-100 pb-2"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
          
           <div className="mt-8 bg-brand-bg p-6 rounded-xl border border-brand-border">
             <p className="text-brand-text/60 text-xs uppercase tracking-wider font-bold mb-2">Need Help?</p>
             <a href={`tel:${CONTACT_INFO.phone}`} className="text-3xl font-bold text-brand-blue block mb-2">
                {CONTACT_INFO.phone}
             </a>
             <div className="text-sm text-brand-text">{CONTACT_INFO.address}</div>
           </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 bg-gradient-to-br from-brand-bg via-blue-50 to-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            <div className="w-full lg:w-1/2 z-10 text-center lg:text-left">
                <div className="inline-block bg-white border border-brand-blue/20 rounded-full px-4 py-1 mb-6 shadow-sm">
                    <span className="font-semibold text-brand-blue text-xs uppercase tracking-wider">
                      <i className="fa-solid fa-check-circle mr-2 text-green-500"></i>
                      Serving Noida & Ghaziabad Since 2008
                    </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-brand-blue leading-tight mb-4">
                  Simplify Your <br/>
                  <span className="text-brand-lightBlue">Industrial Compliance</span>
                </h1>
                
                <h2 className="text-xl lg:text-2xl font-sans text-brand-amber font-medium mb-6">
                  फैक्ट्री और लेबर कानूनों का संपूर्ण समाधान
                </h2>
                
                <p className="text-base lg:text-lg text-brand-text mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  We handle the bureaucracy so you can focus on production. From Factory Licenses to Pollution NOCs, we are your trusted partners in regulatory compliance.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="#contact" className="bg-brand-amber text-white px-8 py-3.5 rounded-lg font-bold shadow-lg shadow-amber-500/30 hover:shadow-xl hover:bg-amber-600 transition-all uppercase text-sm tracking-wide">
                    Request Consultation
                  </a>
                  <a href="#services" className="bg-white text-brand-blue border border-brand-blue/30 px-8 py-3.5 rounded-lg font-bold hover:bg-blue-50 transition-all uppercase text-sm tracking-wide">
                    View All Services
                  </a>
                </div>
            </div>

            {/* Hero Graphic */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                <div className="relative w-full max-w-md lg:max-w-lg">
                    {/* Background Blob */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                    
                    <div className="relative bg-white rounded-2xl shadow-2xl p-6 lg:p-8 border border-gray-100">
                        <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-4">
                           <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 text-xl">
                              <i className="fa-solid fa-shield-check"></i>
                           </div>
                           <div>
                              <h3 className="font-bold text-lg text-brand-blue">100% Compliant</h3>
                              <p className="text-xs text-gray-500">Government Standards Met</p>
                           </div>
                        </div>
                        
                        <div className="space-y-4">
                            {[
                              { label: 'Factory License Approved', time: '2 Days ago' },
                              { label: 'Pollution NOC Renewed', time: 'Just now' },
                              { label: 'Labor Returns Filed', time: 'Today' }
                            ].map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                                  <div className="flex items-center gap-3">
                                      <div className="w-2 h-2 bg-brand-amber rounded-full"></div>
                                      <span className="text-sm font-medium text-brand-text">{item.label}</span>
                                  </div>
                                  <span className="text-xs text-gray-400">{item.time}</span>
                              </div>
                            ))}
                        </div>

                        <div className="mt-6 pt-4 text-center">
                           <p className="text-sm text-brand-blue font-semibold">Trusted by 500+ Factories</p>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </section>
  );
};

const Services = () => {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="text-center mb-16 max-w-3xl mx-auto">
            <span className="text-brand-lightBlue font-bold uppercase tracking-widest text-xs mb-2 block">Our Expertise</span>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-brand-blue mb-4">Comprehensive Industrial Solutions</h2>
            <p className="text-brand-text/70">
              We provide end-to-end liaisoning services with government departments to ensure your business runs without legal interruptions.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => (
            <div key={service.id} className="group bg-brand-bg rounded-xl p-8 border border-brand-border hover:border-brand-blue hover:shadow-hover transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-brand-blue/5 w-24 h-24 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-brand-blue/10"></div>
              
              <div className="w-14 h-14 bg-white rounded-lg shadow-sm flex items-center justify-center text-brand-blue text-2xl mb-6 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                 <i className={`fa-solid ${service.icon}`}></i>
              </div>
              
              <h3 className="text-xl font-serif font-bold text-brand-blue mb-2">
                {service.title}
              </h3>
              <h4 className="text-sm font-semibold text-brand-amber mb-4">
                 {service.hindi}
              </h4>
              
              <p className="text-brand-text/70 text-sm leading-relaxed mb-6">
                {service.desc}
              </p>

              <a href="#contact" className="inline-flex items-center text-brand-blue font-bold text-sm hover:text-brand-lightBlue transition-colors">
                 Inquire Now <i className="fa-solid fa-arrow-right ml-2 text-xs"></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-20 bg-brand-blue text-white relative overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 transform origin-top"></div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          <div className="w-full lg:w-1/2">
            <span className="text-brand-amber font-bold uppercase tracking-widest text-xs mb-2 block">Why Choose Consultation House</span>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold mb-6">
              Your Regulatory Shield <br/> in a Complex Industrial World
            </h2>
            
            <div className="space-y-6 text-blue-100 text-lg leading-relaxed">
                <p>
                  Running a factory involves more than just production; it involves navigating a maze of laws. <strong className="text-white">Consultation House</strong> simplifies this for you.
                </p>
                <p>
                  Based in Noida, we understand the local landscape of the UP Industrial Authorities, Pollution Control Board, and Labor Department better than anyone else. Our job is to keep you compliant so you stay profitable.
                </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">
                    <i className="fa-solid fa-clock-rotate-left text-brand-amber text-2xl mb-2"></i>
                    <h4 className="font-bold text-white">Timely Service</h4>
                    <p className="text-xs text-blue-200">No delays in filings</p>
                </div>
                <div className="p-4 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">
                    <i className="fa-solid fa-handshake-simple text-brand-amber text-2xl mb-2"></i>
                    <h4 className="font-bold text-white">Honest Advice</h4>
                    <p className="text-xs text-blue-200">Transparent consulting</p>
                </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
             <div className="bg-white text-brand-text rounded-2xl p-8 lg:p-10 shadow-2xl">
                 <h3 className="font-serif text-2xl font-bold text-brand-blue mb-6">Our Commitment</h3>
                 <ul className="space-y-4">
                     <li className="flex gap-4">
                         <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-1"><i className="fa-solid fa-check text-xs"></i></div>
                         <p className="text-sm">Zero-error documentation for government submissions.</p>
                     </li>
                     <li className="flex gap-4">
                         <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-1"><i className="fa-solid fa-check text-xs"></i></div>
                         <p className="text-sm">Proactive reminders for license renewals.</p>
                     </li>
                     <li className="flex gap-4">
                         <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-1"><i className="fa-solid fa-check text-xs"></i></div>
                         <p className="text-sm">Liaisoning with integrity and transparency.</p>
                     </li>
                     <li className="flex gap-4">
                         <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center shrink-0 mt-1"><i className="fa-solid fa-check text-xs"></i></div>
                         <p className="text-sm">Cost-effective compliance packages for MSMEs.</p>
                     </li>
                 </ul>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-brand-bg">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row">
                
                <div className="w-full md:w-5/12 bg-brand-blue text-white p-10 flex flex-col justify-between">
                     <div>
                        <h3 className="font-serif text-3xl font-bold mb-8">Contact Us</h3>
                        <p className="text-blue-200 mb-8 text-sm">
                          Reach out for a free initial consultation regarding your factory or establishment compliance.
                        </p>
                        
                        <div className="space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                                  <i className="fa-solid fa-location-dot text-brand-amber"></i>
                                </div>
                                <div>
                                  <p className="text-xs text-blue-200 font-bold uppercase mb-1">Office Address</p>
                                  <p className="text-sm leading-snug">{CONTACT_INFO.address}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                                  <i className="fa-solid fa-phone text-brand-amber"></i>
                                </div>
                                <div>
                                  <p className="text-xs text-blue-200 font-bold uppercase mb-1">Call Us</p>
                                  <p className="text-xl font-bold">{CONTACT_INFO.phone}</p>
                                </div>
                            </div>
                             <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                                  <i className="fa-solid fa-envelope text-brand-amber"></i>
                                </div>
                                <div>
                                  <p className="text-xs text-blue-200 font-bold uppercase mb-1">Email</p>
                                  <p className="text-sm">{CONTACT_INFO.email}</p>
                                </div>
                            </div>
                        </div>
                     </div>
                     
                     <div className="mt-12 pt-6 border-t border-white/10">
                         <p className="text-xs text-blue-300">Mon - Sat: 10:00 AM - 7:00 PM</p>
                     </div>
                </div>

                <div className="w-full md:w-7/12 p-10">
                    <h3 className="text-2xl font-serif font-bold text-brand-blue mb-6">Send an Inquiry</h3>
                    <form className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                             <div>
                                 <label className="block text-sm font-bold text-brand-text mb-2">Name / नाम</label>
                                 <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all bg-gray-50" placeholder="Your Name" />
                             </div>
                             <div>
                                 <label className="block text-sm font-bold text-brand-text mb-2">Phone / फ़ोन</label>
                                 <input type="tel" className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all bg-gray-50" placeholder="Your Mobile Number" />
                             </div>
                        </div>
                        <div>
                             <label className="block text-sm font-bold text-brand-text mb-2">Service Required / विषय</label>
                             <select className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all bg-gray-50 text-brand-text">
                                 <option>Select a Service</option>
                                 <option>Factory License</option>
                                 <option>Pollution NOC</option>
                                 <option>Fire Safety</option>
                                 <option>Labor Compliance</option>
                                 <option>Other</option>
                             </select>
                        </div>
                        <div>
                             <label className="block text-sm font-bold text-brand-text mb-2">Message / संदेश</label>
                             <textarea rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-blue focus:ring-1 focus:ring-brand-blue transition-all bg-gray-50 resize-none" placeholder="How can we help you?"></textarea>
                        </div>
                        <button type="button" className="w-full bg-brand-blue text-white font-bold py-4 rounded-lg hover:bg-brand-lightBlue transition-colors shadow-lg shadow-blue-900/10">
                            Submit Request
                        </button>
                    </form>
                </div>

            </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white border-t border-brand-border pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            
            <div className="md:col-span-1">
                <div className="flex items-center gap-2 mb-4">
                    <i className="fa-solid fa-briefcase text-brand-blue text-2xl"></i>
                    <span className="font-serif font-bold text-xl text-brand-blue">Consultation House</span>
                </div>
                <p className="text-sm text-brand-text/70 mb-6">
                    Professional government liaisoning and compliance services for industries in Noida, Greater Noida, and Ghaziabad.
                </p>
                <div className="flex gap-3">
                    <a href="#" className="w-8 h-8 rounded-full bg-brand-bg text-brand-blue flex items-center justify-center hover:bg-brand-blue hover:text-white transition-colors"><i className="fa-brands fa-whatsapp"></i></a>
                    <a href="#" className="w-8 h-8 rounded-full bg-brand-bg text-brand-blue flex items-center justify-center hover:bg-brand-blue hover:text-white transition-colors"><i className="fa-brands fa-linkedin-in"></i></a>
                </div>
            </div>

            <div className="md:col-span-1">
                <h4 className="text-brand-blue font-bold mb-6">Services</h4>
                <ul className="space-y-3 text-sm text-brand-text/80">
                    <li><a href="#" className="hover:text-brand-amber transition-colors">Factory License</a></li>
                    <li><a href="#" className="hover:text-brand-amber transition-colors">Pollution NOC</a></li>
                    <li><a href="#" className="hover:text-brand-amber transition-colors">ESI & PF</a></li>
                    <li><a href="#" className="hover:text-brand-amber transition-colors">Fire Safety</a></li>
                </ul>
            </div>

            <div className="md:col-span-2">
                <h4 className="text-brand-blue font-bold mb-6">Locate Us</h4>
                <div className="bg-brand-bg p-4 rounded-lg border border-brand-border flex items-start gap-4">
                    <i className="fa-solid fa-map-location-dot text-brand-amber text-xl mt-1"></i>
                    <div>
                         <p className="text-sm font-bold text-brand-blue">NOIDA OFFICE</p>
                         <p className="text-sm text-brand-text/80 mt-1">Shop No.-6, 1st Floor, SHD Complex, Shatabdi Enclave, Sector-49, Noida, Dist. Gautam Budh Nagar (U.P.)</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
            <p>&copy; {new Date().getFullYear()} Consultation House. All rights reserved.</p>
            <div className="flex gap-6">
                <a href="#" className="hover:text-brand-blue">Privacy Policy</a>
                <a href="#" className="hover:text-brand-blue">Terms of Service</a>
            </div>
        </div>
      </div>
    </footer>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "नमस्ते! Apna problem bataen ya aj main apki kaise madad kar ksakta hoon?", sender: 'bot' }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatSession, setChatSession] = useState<any>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (!hasInitialized && isOpen) {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const chat = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: "You are a helpful, professional assistant for 'Consultation House' in Noida. You speak in a mix of Hindi and English (Hinglish). You help factory owners with queries about Factory Act, Labor Laws, and Pollution NOCs. Keep answers concise.",
                }
            });
            setChatSession(chat);
            setHasInitialized(true);
        } catch (error) {
            console.error("Error initializing chat:", error);
        }
    }
  }, [isOpen, hasInitialized]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { text: userMsg, sender: 'user' }]);
    setInput("");
    setIsTyping(true);

    try {
        let responseText = "System busy. Please call 9811155576.";
        
        if (chatSession) {
             const result = await chatSession.sendMessage({ message: userMsg });
             responseText = result.text;
        } else {
             // Fallback if session init failed
             const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
             const result = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: userMsg 
             });
             if (result.text) responseText = result.text;
        }
        
        setMessages(prev => [...prev, { text: responseText, sender: 'bot' }]);
    } catch (error) {
        setMessages(prev => [...prev, { text: "Network issue. Please call us directly.", sender: 'bot' }]);
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end font-sans">
      
      {!isOpen && (
        <div className="mb-3 bg-brand-blue text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium animate-bounce cursor-pointer" onClick={() => setIsOpen(true)}>
           नमस्ते! Chat with us
        </div>
      )}

      {isOpen && (
        <div className="bg-white w-[90vw] sm:w-[360px] h-[500px] shadow-2xl rounded-2xl border border-brand-border flex flex-col mb-4 overflow-hidden">
          {/* Header */}
          <div className="bg-brand-blue p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <i className="fa-solid fa-headset text-sm"></i>
              </div>
              <div>
                <h4 className="font-bold text-sm">Consultation House AI</h4>
                <p className="text-[10px] opacity-80">Always Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
              <i className="fa-solid fa-times text-lg"></i>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 bg-gray-50 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-2.5 text-sm rounded-2xl ${
                    msg.sender === 'user' 
                      ? 'bg-brand-blue text-white rounded-br-none shadow-sm' 
                      : 'bg-white text-brand-text border border-gray-200 rounded-bl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                   <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm border border-gray-200">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100">
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Write a message..."
                className="w-full bg-gray-100 rounded-full px-4 py-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-brand-blue text-brand-text"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-10 h-10 bg-brand-blue text-white rounded-full flex items-center justify-center hover:bg-brand-lightBlue transition-colors shadow-md disabled:opacity-50 disabled:shadow-none"
              >
                <i className="fa-solid fa-paper-plane text-xs"></i>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-xl transition-all duration-300 transform hover:scale-105 ${isOpen ? 'bg-gray-800 text-white' : 'bg-brand-amber text-white hover:bg-amber-600'}`}
      >
        <i className={`fa-solid ${isOpen ? 'fa-times' : 'fa-comment-dots'}`}></i>
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div className="antialiased">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Contact />
      <Footer />
      <ChatWidget />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
