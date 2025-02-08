"use client"

import { Instagram, Youtube, MapPin } from "lucide-react";
import { SiThreads } from "@icons-pack/react-simple-icons";
import Image from "next/image"; // Import the Image component

const Footer = async () => {
  return (
    <>
      <footer id="contact" className="bg-gray-950/90 text-gray-300 py-16 mt-16">
        <div className="container mx-auto px-4 md:px-24 sm:px-12 lg:px-32">
          {/* 5-Column Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Contact Details */}
            <div className="hidden sm:flex flex-col justify-center items-start">
              <h3 className="text-white text-xl font-medium mb-6">CONTACT</h3>
              <div className="space-y-4 flex sm:block flex-col justify-center items-center">
                <div>
                  <h4 className="text-white/90 sm:text-left text-center text-lg mb-2">Address</h4>
                  <p className="text-sm font-light group relative flex items-start gap-2 text-gray-400">
                    <MapPin className="mt-1 flex-shrink-0 text-gray-400" size={20} />
                    To G clothing, 1st street, Lashme nagar, Pn road, Tiruppur - 641602
                  </p>
                  {/* Google Maps Embed (5th column) */}
                  <div className="w-full mt-4 h-full">
                    <div className="w-full h-24 rounded-lg overflow-hidden">
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
                <div className="flex sm:block flex-col justify-center items-center">
                  <h4 className="text-white/90 text-lg mb-2">Contact Details</h4>
                  <p className="text-base mb-2 text-gray-400 font-light">+91 - 908056057</p>
                  <p className="text-base mb-4 text-gray-400 font-light">thetopgclothing@gmail.com</p>
                </div>
              </div>
            </div>
            {/* For mobile */}
            <div className="lg:col-span-1 flex sm:hidden flex-col justify-center items-center">
              <Image
                src="/logo.png"
                alt="togclothing_logo"
                width={200} // Set width
                height={100} // Set height
                className="object-contain mb-6"
              />
              <h3 className="text-xl mb-4 text-gray-400 text-center">ALWAYS BEHIND EXCELLENCE</h3>

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
            <div className="flex flex-col justify-center sm:justify-start items-center">
              <h3 className="text-white text-xl font-medium mb-6">INFORMATION</h3>
              <ul className="space-y-4 font-light text-gray-400 flex sm:block flex-col justify-center items-center">
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

            {/* Logo and Description */}
            <div className="lg:col-span-1 hidden sm:flex flex-col justify-center items-center">
              <Image
                src="/logo.png"
                alt="togclothing_logo"
                width={200} // Set width
                height={100} // Set height
                className="object-contain mb-6"
              />
              <h3 className="text-xl mb-4 text-gray-400 text-center">ALWAYS BEHIND EXCELLENCE</h3>

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
            {/* For mobile */}
            <div className="flex sm:hidden flex-col justify-center items-center">
              <h3 className="text-white text-xl font-medium mb-6">CONTACT</h3>
              <div className="space-y-4 flex sm:block flex-col justify-center items-center">
                <div>
                  <h4 className="text-white/90 sm:text-left text-center text-lg mb-2">Address</h4>
                  <p className="text-sm font-light group relative flex items-start gap-2 text-gray-400">
                    <MapPin className="mt-1 flex-shrink-0 text-gray-400" size={20} />
                    To G clothing, 1st street, Lashme nagar, Pn road, Tiruppur - 641602
                  </p>
                  {/* Google Maps Embed (5th column) */}
                  <div className="w-full mt-4 h-full">
                    <div className="w-full h-24 rounded-lg overflow-hidden">
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
                <div className="flex sm:block flex-col justify-center items-center">
                  <h4 className="text-white/90 text-lg mb-2">Contact Details</h4>
                  <p className="text-base mb-2 text-gray-400 font-light">+91 - 908056057</p>
                  <p className="text-base mb-4 text-gray-400 font-light">thetopgclothing@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Bar */}
      <div className="bg-gray-800 border-t border-gray-800 p-4">
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
