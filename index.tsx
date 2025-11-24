
import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleGenAI, Chat } from "@google/genai";

// --- Data & Constants ---

const SERVICES = [
  { id: 1, title: 'Factories Act', hindi: 'फैक्ट्री एक्ट लाइसेंस', icon: 'fa-industry', desc: 'Complete licensing, map approval, and renewal services.', color: 'text-blue-500' },
  { id: 2, title: 'ESI & PF', hindi: 'ईएसआई और पीएफ', icon: 'fa-users-gear', desc: 'Monthly return filing, challan generation, and employee claims.', color: 'text-emerald-500' },
  { id: 3, title: 'Pollution NOC', hindi: 'प्रदूषण नियंत्रण एनओसी', icon: 'fa-smog', desc: 'CTE and CTO clearances from UP Pollution Control Board.', color: 'text-teal-500' },
  { id: 4, title: 'Fire Safety', hindi: 'अग्निशमन एनओसी', icon: 'fa-fire-extinguisher', desc: 'Fire department No Objection Certificate and safety audits.', color: 'text-rose-500' },
  { id: 5, title: 'Labor License', hindi: 'लेबर लाइसेंस', icon: 'fa-id-card-clip', desc: 'Registration under CLRA for contract workers.', color: 'text-indigo-500' },
  { id: 6, title: 'Shop Registration', hindi: 'दुकान एवं स्थापना', icon: 'fa-store', desc: 'Commercial registration for shops and offices.', color: 'text-orange-500' },
  { id: 7, title: 'Payroll Compliance', hindi: 'वेतन और बोनस', icon: 'fa-file-invoice-dollar', desc: 'Bonus, Gratuity, and Minimum Wages Act compliance.', color: 'text-green-600' },
  { id: 8, title: 'Electrical Safety', hindi: 'विद्युत सुरक्षा', icon: 'fa-bolt', desc: 'NOC for DG Sets and electrical load safety.', color: 'text-yellow-500' },
  { id: 9, title: 'Map Approval', hindi: 'नक्शा स्वीकृति', icon: 'fa-map-location-dot', desc: 'Factory building plan approvals from authorities.', color: 'text-purple-500' },
  { id: 10, title: 'MSME / Udyam', hindi: 'एमएसएमई पंजीकरण', icon: 'fa-award', desc: 'Udyam registration for small business benefits.', color: 'text-pink-500' },
  { id: 11, title: 'Legal Notices', hindi: 'कानूनी नोटिस', icon: 'fa-gavel', desc: 'Drafting replies to labor and factory inspector notices.', color: 'text-red-500' },
  { id: 12, title: 'Consultancy', hindi: 'परामर्श सेवाएं', icon: 'fa-handshake-angle', desc: 'Expert advice on industrial disputes and compliance.', color: 'text-cyan-600' },
];

const CONTACT_INFO = {
  phone: '9811155576',
  email: 'arvind.hi05@gmail.com',
  address: 'Shop No.-6, 1st Floor, SHD Complex, Shatabdi Enclave, Sector-49, Noida'
};

// --- Helper Components ---

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const RevealOnScroll: React.FC<RevealOnScrollProps> = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          if (entry.target) observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [delay]);

  return (
    <div ref={ref} className={`${className} transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
      {children}
    </div>
  );
};

// --- Theme Context ---
const useTheme = () => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  return { theme, toggleTheme };
};

// --- Main Components ---

const Navbar = ({ toggleTheme, theme }: { toggleTheme: () => void, theme: string }) => {
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
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-[60] transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-4 lg:py-6'}`}>
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3 group relative z-[70]">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white shadow-glow transition-transform group-hover:rotate-6">
            <i className="fa-solid fa-scale-balanced text-lg"></i>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-xl leading-none text-gray-900 dark:text-white tracking-tight">
              Consultation House
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-600 dark:text-accent-400">
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
              className="font-heading font-medium text-sm text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-accent-400 transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-primary-600 dark:after:bg-accent-400 after:transition-all hover:after:w-full"
            >
              {link.name}
            </a>
          ))}
          
          <button 
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <i className={`fa-solid ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
          </button>

          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="px-6 py-2.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-bold text-sm shadow-lg shadow-primary-500/30 transition-all hover:-translate-y-0.5 flex items-center gap-2"
          >
             <i className="fa-solid fa-phone animate-pulse-slow"></i> 
             <span>{CONTACT_INFO.phone}</span>
          </a>
        </div>

        {/* Mobile Toggle & Theme */}
        <div className="flex items-center gap-4 lg:hidden relative z-[70]">
          <button 
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center text-gray-700 dark:text-white"
          >
             <i className={`fa-solid ${theme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
          </button>
          
          <button
            className="text-2xl text-gray-700 dark:text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className={`fa-solid ${isOpen ? 'fa-times' : 'fa-bars-staggered'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`lg:hidden fixed inset-0 bg-white dark:bg-dark-bg z-[60] transition-all duration-300 ease-in-out flex flex-col justify-center ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-4'}`}
      >
        <div className="flex flex-col h-full justify-center px-8 relative">
           <div className="flex flex-col space-y-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-4xl font-heading font-bold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-accent-400 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
          
           <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
             <p className="text-gray-500 dark:text-gray-400 text-xs uppercase tracking-widest font-bold mb-3">Direct Contact</p>
             <a 
                href={`tel:${CONTACT_INFO.phone}`} 
                className="text-3xl font-heading font-bold text-primary-600 dark:text-accent-400 block mb-2"
                onClick={() => setIsOpen(false)}
             >
                {CONTACT_INFO.phone}
             </a>
             <div className="text-gray-600 dark:text-gray-300 text-sm max-w-xs">{CONTACT_INFO.address}</div>
           </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-32 lg:pt-20">
      {/* Animated Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-primary-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-[-10%] left-[-10%] w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-accent-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob delay-200"></div>
          <div className="absolute bottom-[-20%] left-[20%] w-[300px] lg:w-[500px] h-[300px] lg:h-[500px] bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob delay-500"></div>
      </div>
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            
            <div className="w-full lg:w-1/2 text-center lg:text-left mt-8 lg:mt-0">
                <div className="inline-block px-4 py-1.5 rounded-full bg-white/50 dark:bg-white/10 border border-gray-200 dark:border-gray-700 backdrop-blur-sm mb-6 animate-fade-in-up">
                    <span className="font-heading font-semibold text-primary-600 dark:text-accent-400 text-xs uppercase tracking-widest">
                      <i className="fa-solid fa-location-dot mr-2"></i>Noida & Ghaziabad
                    </span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-heading font-extrabold text-gray-900 dark:text-white leading-[1.1] mb-6 tracking-tight animate-fade-in-up delay-100">
                  Compliance <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">Simplified.</span>
                </h1>
                
                <h2 className="text-xl lg:text-2xl font-sans text-gray-600 dark:text-gray-300 font-medium mb-8 animate-fade-in-up delay-200">
                  फैक्ट्री और लेबर कानूनों का संपूर्ण समाधान
                </h2>
                
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 animate-fade-in-up delay-300">
                  We handle the bureaucracy so you can handle the business. Factories Act, Pollution NOC, and Labor Compliance experts since 2008.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up delay-500">
                  <a href="#contact" className="px-8 py-4 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-sm uppercase tracking-wider hover:shadow-xl hover:scale-105 transition-all duration-300 shadow-lg">
                    Start Consultation
                  </a>
                  <a href="#services" className="px-8 py-4 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-bold text-sm uppercase tracking-wider hover:border-primary-600 dark:hover:border-accent-400 hover:text-primary-600 dark:hover:text-accent-400 transition-all duration-300 bg-white/50 dark:bg-black/20 backdrop-blur-sm">
                    Our Services
                  </a>
                </div>
            </div>

            {/* Graphic */}
            <div className="w-full lg:w-1/2 flex justify-center animate-fade-in-up delay-300 pb-12 lg:pb-0">
                <div className="relative w-full max-w-md aspect-square">
                    {/* Abstract Floating Cards */}
                    <div className="absolute top-[10%] left-[5%] w-[260px] p-6 bg-white dark:bg-dark-card rounded-2xl shadow-card dark:shadow-none dark:border dark:border-gray-700 animate-float z-20">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                                <i className="fa-solid fa-check"></i>
                            </div>
                            <div className="h-2 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                        </div>
                        <div className="h-2 w-full bg-gray-100 dark:bg-gray-700 rounded-full mb-2"></div>
                        <div className="h-2 w-2/3 bg-gray-100 dark:bg-gray-700 rounded-full"></div>
                    </div>

                    <div className="absolute bottom-[15%] right-[5%] w-[240px] p-6 bg-white dark:bg-dark-card rounded-2xl shadow-card dark:shadow-none dark:border dark:border-gray-700 animate-float z-30" style={{animationDelay: '1.5s'}}>
                         <div className="flex items-center justify-between mb-4">
                             <span className="text-sm font-bold text-gray-900 dark:text-white">Audit Score</span>
                             <span className="text-primary-600 font-bold">98%</span>
                         </div>
                         <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                             <div className="bg-gradient-to-r from-primary-500 to-accent-500 h-2 rounded-full w-[98%]"></div>
                         </div>
                    </div>

                    {/* Central Element */}
                    <div className="absolute inset-[10%] bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-[2rem] transform rotate-3 shadow-2xl z-10 flex items-center justify-center border border-white dark:border-gray-700">
                         <div className="text-center">
                             <div className="w-20 h-20 mx-auto bg-gradient-to-br from-primary-600 to-accent-500 rounded-2xl flex items-center justify-center text-white text-3xl shadow-glow mb-4">
                                <i className="fa-solid fa-shield-halved"></i>
                             </div>
                             <h3 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">100% Legal</h3>
                             <p className="text-sm text-gray-500 dark:text-gray-400">Zero Tolerance</p>
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
    <section id="services" className="py-24 bg-gray-50 dark:bg-dark-bg/50 relative">
      <div className="container mx-auto px-4 lg:px-8">
        
        <div className="mb-16 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-6">
                Our Areas of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">Expertise</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg">
              Comprehensive statutory compliance services tailored for the industrial hubs of Noida, Greater Noida, and Ghaziabad.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, index) => (
            <RevealOnScroll key={service.id} delay={index * 50}>
              <div 
                className="group bg-white dark:bg-dark-card p-8 rounded-2xl shadow-sm hover:shadow-card-hover border border-gray-100 dark:border-gray-800 hover:border-primary-200 dark:hover:border-primary-900 transition-all duration-300 h-full flex flex-col justify-between relative overflow-hidden"
              >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent dark:from-primary-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="flex justify-between items-start mb-6">
                        <div className={`w-14 h-14 rounded-xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center ${service.color} text-2xl group-hover:scale-110 transition-transform duration-300`}>
                            <i className={`fa-solid ${service.icon}`}></i>
                        </div>
                        <span className="font-heading text-gray-200 dark:text-gray-800 text-4xl font-bold group-hover:text-primary-100 dark:group-hover:text-primary-900 transition-colors">
                            {service.id.toString().padStart(2, '0')}
                        </span>
                    </div>
                    
                    <h3 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-1">
                      {service.title}
                    </h3>
                    <h4 className="text-sm font-medium text-primary-600 dark:text-accent-400 mb-4 font-sans">
                      {service.hindi}
                    </h4>
                    
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 font-light">
                      {service.desc}
                    </p>
                </div>

                <div className="relative z-10 flex justify-end">
                    <a href="#contact" className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2 group-hover:gap-3 transition-all">
                        <span>Details</span>
                        <i className="fa-solid fa-arrow-right text-primary-600"></i>
                    </a>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-24 bg-white dark:bg-dark-bg relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-gray-50 dark:bg-gray-900/50 skew-x-12 transform origin-top-right"></div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <RevealOnScroll className="w-full lg:w-1/2">
            <h2 className="text-4xl lg:text-5xl font-heading font-bold text-gray-900 dark:text-white mb-8 leading-tight">
              Trust Built on <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500">Precision & Integrity</span>
            </h2>
            
            <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                <p>
                  <strong className="font-bold text-gray-900 dark:text-white">Consultation House</strong> is not just an agency; we are your legal safeguard. Operating since 2008, we have established deep roots in the industrial sectors of UP.
                </p>
                <p>
                  We understand that for a factory owner, time is money. A delayed license or a pollution notice can halt production. We ensure that never happens.
                </p>
            </div>

            <div className="mt-12 flex gap-8">
                <div>
                    <h4 className="text-4xl font-heading font-bold text-primary-600 dark:text-accent-400">15+</h4>
                    <p className="text-xs uppercase tracking-widest mt-1 text-gray-500">Years Experience</p>
                </div>
                <div className="w-px bg-gray-200 dark:bg-gray-700 h-12"></div>
                <div>
                    <h4 className="text-4xl font-heading font-bold text-primary-600 dark:text-accent-400">500+</h4>
                    <p className="text-xs uppercase tracking-widest mt-1 text-gray-500">Clients Served</p>
                </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="w-full lg:w-1/2" delay={200}>
             <div className="bg-gradient-to-br from-gray-900 to-primary-900 text-white p-8 lg:p-12 rounded-3xl shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16"></div>
                 
                 <h3 className="font-heading text-2xl font-bold mb-8 uppercase flex items-center gap-3 relative z-10">
                    <i className="fa-solid fa-check-circle text-accent-400"></i> Why Choose Us
                 </h3>
                 <ul className="space-y-6 relative z-10">
                     {[
                         "Direct Liaisoning with Govt Officials",
                         "24/7 Response to Legal Notices",
                         "On-Site Compliance Audits",
                         "Zero Penalty Record"
                     ].map((item, i) => (
                         <li key={i} className="flex gap-4 items-center group">
                             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-accent-400 group-hover:bg-accent-400 group-hover:text-white transition-colors">
                                 <i className="fa-solid fa-angle-right"></i>
                             </div>
                             <p className="font-medium text-lg">{item}</p>
                         </li>
                     ))}
                 </ul>
             </div>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate network request
    setTimeout(() => {
      setFormState('success');
      // Reset after 3 seconds
      setTimeout(() => setFormState('idle'), 3000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 bg-gray-50 dark:bg-dark-bg/50">
      <div className="container mx-auto px-4 lg:px-8">
        <RevealOnScroll>
            <div className="max-w-5xl mx-auto bg-white dark:bg-dark-card rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
                
                <div className="w-full md:w-5/12 bg-primary-900 dark:bg-primary-950 text-white p-12 flex flex-col justify-between relative">
                     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                     <div className="relative z-10">
                        <span className="text-xs font-bold uppercase tracking-widest text-accent-400 mb-2 block">Contact Us</span>
                        <h3 className="font-heading text-4xl font-bold mb-10 leading-tight">Get Your <br/>Compliance Sorted.</h3>
                        
                        <div className="space-y-8 font-sans">
                            <div className="flex items-start gap-4">
                                <div className="mt-1 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <i className="fa-solid fa-location-dot"></i>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest opacity-60 mb-1">Office</p>
                                    <p className="font-medium opacity-90">{CONTACT_INFO.address}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="mt-1 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <i className="fa-solid fa-phone"></i>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest opacity-60 mb-1">Phone</p>
                                    <a href={`tel:${CONTACT_INFO.phone}`} className="text-xl font-bold hover:text-accent-400 transition-colors">{CONTACT_INFO.phone}</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="mt-1 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                                    <i className="fa-solid fa-envelope"></i>
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-widest opacity-60 mb-1">Email</p>
                                    <a href={`mailto:${CONTACT_INFO.email}`} className="font-medium opacity-90 hover:text-accent-400 transition-colors">{CONTACT_INFO.email}</a>
                                </div>
                            </div>
                        </div>
                     </div>
                </div>

                <div className="w-full md:w-7/12 p-8 lg:p-12">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div>
                                 <label className="block text-xs font-bold uppercase tracking-wide mb-2 text-gray-500">Name</label>
                                 <input type="text" required className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white" placeholder="Full Name" />
                             </div>
                             <div>
                                 <label className="block text-xs font-bold uppercase tracking-wide mb-2 text-gray-500">Phone</label>
                                 <input type="tel" required className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white" placeholder="Mobile Number" />
                             </div>
                        </div>
                        <div>
                             <label className="block text-xs font-bold uppercase tracking-wide mb-2 text-gray-500">Service</label>
                             <select className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white">
                                 <option>General Inquiry</option>
                                 <option>Factory License</option>
                                 <option>Pollution NOC</option>
                                 <option>Fire Safety</option>
                             </select>
                        </div>
                        <div>
                             <label className="block text-xs font-bold uppercase tracking-wide mb-2 text-gray-500">Message</label>
                             <textarea rows={3} required className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all dark:text-white resize-none"></textarea>
                        </div>
                        <div className="pt-4">
                            <button 
                              type="submit" 
                              disabled={formState !== 'idle'}
                              className={`w-full md:w-auto font-bold uppercase tracking-widest text-xs py-4 px-10 rounded-lg shadow-lg transition-all flex items-center justify-center gap-2 
                                ${formState === 'success' 
                                  ? 'bg-green-600 text-white cursor-default' 
                                  : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-500 hover:to-primary-600 text-white hover:shadow-xl hover:-translate-y-1'}`}
                            >
                                {formState === 'idle' && <span>Send Message</span>}
                                {formState === 'submitting' && (
                                  <>
                                    <i className="fa-solid fa-circle-notch animate-spin"></i>
                                    <span>Sending...</span>
                                  </>
                                )}
                                {formState === 'success' && (
                                  <>
                                    <i className="fa-solid fa-check"></i>
                                    <span>Sent Successfully!</span>
                                  </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-dark-card border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
            
            <div className="max-w-sm">
                <div className="flex items-center gap-3 mb-6">
                     <div className="w-10 h-10 rounded-lg bg-primary-600 flex items-center justify-center text-white text-lg">
                        <i className="fa-solid fa-scale-balanced"></i>
                    </div>
                    <span className="font-heading font-bold text-xl text-gray-900 dark:text-white">Consultation House</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                    The trusted choice for industrial compliance in Noida. Precision, Speed, and Integrity.
                </p>
            </div>

            <div className="flex flex-wrap gap-12 lg:gap-24">
                <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white uppercase mb-6 tracking-wider">Navigate</h4>
                    <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                        <li><a href="#home" className="hover:text-primary-600 transition-colors">Home</a></li>
                        <li><a href="#services" className="hover:text-primary-600 transition-colors">Services</a></li>
                        <li><a href="#about" className="hover:text-primary-600 transition-colors">About</a></li>
                        <li><a href="#contact" className="hover:text-primary-600 transition-colors">Contact</a></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white uppercase mb-6 tracking-wider">Social</h4>
                    <ul className="space-y-3 text-sm text-gray-500 dark:text-gray-400">
                        <li><a href="#" className="hover:text-primary-600 transition-colors">LinkedIn</a></li>
                        <li><a href="#" className="hover:text-primary-600 transition-colors">Twitter</a></li>
                        <li><a href="#" className="hover:text-primary-600 transition-colors">Facebook</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div className="border-t border-gray-100 dark:border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
            <p>&copy; {new Date().getFullYear()} Consultation House. All rights reserved.</p>
            <p>Designed for Excellence.</p>
        </div>
      </div>
    </footer>
  );
};

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "नमस्ते! How can we help you with compliance today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    if (!hasInitialized && isOpen) {
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const chat = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: "You are a professional industrial consultant for 'Consultation House'. Be brief, formal, and helpful. Use a mix of Hindi and English.",
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
             responseText = result.text ?? "No response";
        } else {
             const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
             const result = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: userMsg 
             });
             if (result.text) responseText = result.text;
        }
        
        setMessages(prev => [...prev, { text: responseText, sender: 'bot' }]);
    } catch (error) {
        setMessages(prev => [...prev, { text: "Network error. Call 9811155576.", sender: 'bot' }]);
    } finally {
        setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[70] flex flex-col items-end font-sans">
      
      {!isOpen && (
        <div 
            className="mb-3 bg-white dark:bg-dark-card text-gray-900 dark:text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest shadow-xl cursor-pointer hover:scale-105 transition-transform border border-gray-100 dark:border-gray-700 animate-float" 
            onClick={() => setIsOpen(true)}
        >
           Chat Support
        </div>
      )}

      {isOpen && (
        <div className="bg-white dark:bg-dark-card w-[90vw] sm:w-[360px] h-[550px] shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 flex flex-col mb-4 overflow-hidden animate-fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                <i className="fa-solid fa-robot text-sm"></i>
              </div>
              <h4 className="font-bold text-sm uppercase tracking-wider">Assistant</h4>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
              <i className="fa-solid fa-times text-sm"></i>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 bg-gray-50 dark:bg-gray-900/50 p-4 overflow-y-auto">
            <div className="space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-primary-600 text-white rounded-br-none' 
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700 rounded-bl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                 <div className="flex justify-start">
                   <div className="px-4 py-2 bg-white dark:bg-gray-800 rounded-2xl rounded-bl-none border border-gray-200 dark:border-gray-700 text-xs text-gray-500 flex items-center gap-1">
                     <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                     <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></span>
                     <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></span>
                   </div>
                 </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white dark:bg-dark-card border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2 relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type here..."
                className="w-full bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-3 pr-12 text-sm focus:outline-none focus:border-primary-500 text-gray-900 dark:text-white transition-all"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-1 top-1 bottom-1 w-10 h-10 rounded-full bg-primary-600 text-white flex items-center justify-center hover:bg-primary-700 disabled:opacity-50 disabled:hover:bg-primary-600 transition-all shadow-md"
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
        className={`w-14 h-14 rounded-full shadow-glow flex items-center justify-center text-xl transition-all duration-300 hover:scale-110 ${isOpen ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900' : 'bg-gradient-to-r from-primary-600 to-accent-500 text-white'}`}
      >
        <i className={`fa-solid ${isOpen ? 'fa-times' : 'fa-comment-dots'}`}></i>
      </button>
    </div>
  );
};

const App = () => {
  const themeProps = useTheme();
  return (
    <div className="antialiased overflow-x-hidden min-h-screen bg-light-bg text-light-text dark:bg-dark-bg dark:text-dark-text transition-colors duration-300">
      <Navbar {...themeProps} />
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
