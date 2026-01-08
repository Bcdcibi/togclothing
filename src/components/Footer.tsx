"use client"

import { Instagram, Youtube, MapPin, Mail, Phone, ArrowUpRight } from "lucide-react";
import { SiThreads } from "@icons-pack/react-simple-icons";
import Image from "next/image";

const Footer = async () => {
  return (
    <footer id="contact" className="bg-black text-white pt-20 pb-10 mt-20 relative overflow-hidden">
      {/* Background Texture - Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
      </div>

      <div className="container mx-auto px-4 md:px-12 lg:px-24 relative z-10">

        {/* 1. Header Section: Brand & Tagline */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 md:mb-16 border-b border-white/10 pb-8 md:pb-12">
          <div className="flex flex-col items-start space-y-4">
            <Image
              src="/logo.png"
              alt="togclothing_logo"
              width={160}
              height={80}
              className="object-contain md:w-[180px]"
            />
            <h3 className="text-lg md:text-xl font-light tracking-[0.2em] text-gray-400 uppercase">
              Always Behind Excellence
            </h3>
          </div>

          {/* Socials - Moved to top right for better visibility */}
          <div className="flex gap-4 mt-6 md:mt-0 self-start md:self-auto">
            {[
              { icon: <Instagram size={20} />, href: "https://www.instagram.com/to_g_mob?igsh=NG9hamRpam1lcm1r&utm_source=qr", label: "Instagram" },
              { icon: <SiThreads size={20} />, href: "https://www.threads.net/@to_g_mob?igshid=NTc4MTIwNjQ2YQ==", label: "Threads" },
              { icon: <Youtube size={20} />, href: "https://youtube.com/@thegclothing?si=aJZOhITJEpMGXKqd", label: "Youtube" }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                className="bg-white/5 hover:bg-white text-white hover:text-black p-3 md:p-4 rounded-full transition-all duration-300 transform hover:-translate-y-1"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* 2. Main Content Grid - Asymmetrical Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 lg:gap-16 mb-12 md:mb-20">

          {/* Column 1: Get in Touch (Span 5) */}
          <div className="md:col-span-5 space-y-8">
            <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 border-l-2 border-purple-500 pl-3">Get in Touch</h4>

            <div className="space-y-6">
              <a href="mailto:thetopgclothing@gmail.com" className="group block">
                <span className="text-gray-400 text-sm mb-1 block">Email Us</span>
                <span className="text-xl md:text-3xl font-medium text-white group-hover:text-purple-400 transition-colors break-all md:break-words">
                  thetopgclothing@gmail.com
                </span>
              </a>

              <a href="tel:+919080560577" className="group block">
                <span className="text-gray-400 text-sm mb-1 block">Call Us</span>
                <span className="text-2xl md:text-3xl font-medium text-white group-hover:text-purple-400 transition-colors">
                  +91 - 9080560577
                </span>
              </a>
            </div>

            <div className="pt-8 border-t border-white/10">
              <div className="flex items-start gap-4">
                <MapPin className="text-purple-500 mt-1 shrink-0" size={24} />
                <p className="text-base md:text-lg text-gray-300 font-light leading-relaxed">
                  To G clothing, 1st street, Lashme nagar,<br />
                  Pn road, Tiruppur - 641602
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links (Span 3) */}
          <div className="md:col-span-3">
            <h4 className="text-xs md:text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 md:mb-8 border-l-2 border-blue-500 pl-3">Explore</h4>
            <ul className="space-y-3 md:space-y-4">
              {[
                { name: "About Us", href: "#" },
                { name: "Delivery Info", href: "/delivery_info" },
                { name: "Privacy Policy", href: "/privacy" },
                { name: "Terms & Conditions", href: "/terms_conditions" },
                { name: "Shipping & Refund", href: "/shipping_refund" }
              ].map((link, idx) => (
                <li key={idx}>
                  <a
                    href={link.href}
                    className="group flex items-center justify-between py-2 text-gray-400 hover:text-white border-b border-white/5 hover:border-white/20 transition-all duration-300"
                  >
                    <span className="font-light text-base md:text-lg">{link.name}</span>
                    <ArrowUpRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-blue-400" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Map Display (Span 4) */}
          <div className="md:col-span-4 h-[250px] md:h-auto md:min-h-0 relative group rounded-2xl overflow-hidden bg-gray-900 border border-white/10">
            <iframe
              src="https://maps.google.com/maps?q=11.116216,77.337185&z=19&output=embed"
              className="w-full h-full absolute inset-0 grayscale group-hover:grayscale-0 transition-all duration-700 opacity-60 group-hover:opacity-100"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 pointer-events-none">
              <span className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                Locate Us
              </span>
            </div>
          </div>
        </div>

        {/* 3. Footer Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-white/10 gap-4 md:gap-0">
          <p className="text-gray-500 text-xs md:text-sm">
            © 2025 | The Togclothing. Powered by <a href="#" className="text-white hover:underline decoration-purple-500 underline-offset-4">Better Call Devs</a>.
          </p>

          <div className="flex items-center gap-4 md:gap-6 self-start md:self-auto">
            <span className="text-gray-600 text-[10px] md:text-xs uppercase tracking-widest block">Secure Payment</span>
            <Image
              src="/payments.png"
              alt="Payment Methods"
              width={200}
              height={32}
              className="object-contain opacity-60 hover:opacity-100 transition-opacity w-[150px] md:w-[250px]"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
