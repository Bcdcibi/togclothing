"use client";

import { Instagram, Youtube, MapPin } from "lucide-react";
import { SiThreads } from "@icons-pack/react-simple-icons";
import Image from "next/image"; // Import the Image component

const Footer = () => {
  return (
    <>
      <footer className="bg-black text-gray-300 py-16 lg:py-24">
        <div className="container mx-auto px-4 lg:px-8">
          {/* 5-Column Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Logo and Description */}
            <div className="lg:col-span-1">
              <Image
                src="/logo.png"
                alt="togclothing_logo"
                width={200} // Set width
                height={100} // Set height
                className="object-contain mb-6"
              />
              <h3 className="text-xl mb-4 text-gray-400">ALWAYS BEHIND EXCELLENCE</h3>

              <div className="flex gap-6 mb-4">
                <a href="https://www.instagram.com/to_g_mob?igsh=NG9hamRpam1lcm1r&utm_source=qr" className="hover:text-white transition-colors duration-300">
                  <Instagram size={24} />
                </a>
                <a href="https://www.threads.net/@to_g_mob?igshid=NTc4MTIwNjQ2YQ==" className="hover:text-white transition-colors duration-300">
                  {/* Threads icon */}
                  <SiThreads size={24} />
                </a>
                <a href="https://youtube.com/@thegclothing?si=aJZOhITJEpMGXKqd" className="hover:text-white transition-colors duration-300">
                  <Youtube size={24} />
                </a>
              </div>
            </div>

            {/* Information */}
            <div>
              <h3 className="text-white text-xl font-medium mb-6">INFORMATION</h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-300">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/delivery_info" className="hover:text-white transition-colors duration-300">
                    Delivery Info
                  </a>
                </li>
                <li>
                  <a href="/Privacy" className="hover:text-white transition-colors duration-300">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms_conditions" className="hover:text-white transition-colors duration-300">
                    Terms & Cond.
                  </a>
                </li>
                <li>
                  <a href="/shipping_refund" className="hover:text-white transition-colors duration-300">
                    Shipping & Refund
                  </a>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-white text-xl font-medium mb-6">CATEGORIES</h3>
              <ul className="space-y-4 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-300">
                    T-Shirts
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-300">
                    Shirts
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-300">
                    Trousers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-300">
                    Hoodies
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors duration-300">
                    Jackets
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Details */}
            <div>
              <h3 className="text-white text-xl font-medium mb-6">CONTACT</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white text-lg mb-2">Address</h4>
                  <p className="text-base group relative flex items-start gap-2 text-gray-400">
                    <MapPin className="mt-1 flex-shrink-0 text-gray-400" size={20} />
                    To g clothing, 1st street, Lashme nagar, Pn road, Tiruppur - 641602
                  </p>
                </div>
                <div>
                  <h4 className="text-white text-lg mb-2">Contact Details</h4>
                  <p className="text-base mb-2 text-gray-400">+91 - 908056057</p>
                  <p className="text-base mb-4 text-gray-400">Thetopgclothing@gmail.com</p>
                </div>
              </div>
            </div>

            {/* Google Maps Embed (5th column) */}
            <div className="lg:col-span-1 w-full h-full">
              <div className="w-full h-64 rounded-lg overflow-hidden">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3914.9618983022106!2d77.33718487504686!3d11.116215689053945!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zM13CsDA2JzU4LjQiTiA3N8KwMjAnMjMuMSJF!5e0!3m2!1sen!2sin!4v1738498840577!5m2!1sen!2sin"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  allowFullScreen={true} 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Bar */}
      <div className="bg-black border-t border-gray-800">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white text-base text-center md:text-left mb-4 md:mb-0">
            © 2025 | The Togclothing. Powered by {" "}
            <a href="#" className="text-blue-500 hover:text-blue-400">
              BCD
            </a>
            .
          </p>
          <div className="flex items-center gap-4">
            <Image
              src="/payments.png"
              alt="Payment Methods"
              width={250} // Set width
              height={100} // Set height
              className="object-contain opacity-80 grayscale hover:grayscale-0 transition-all duration-300"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
