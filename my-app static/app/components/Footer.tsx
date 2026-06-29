import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer 
      className="relative text-gray-300 bg-transparent"
      style={{
        backdropFilter: "blur(5px)",
      }}
    >
      {/* Transparent - shows page.tsx background */}
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          
          {/* Brand */}
          <div>
            <h2 className="text-xl font-semibold text-white">
              Maryam Aluminium & Glass
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              High-quality aluminium fabrication and modern glass solutions.
              Excellence in precision, durability, and professional finishing.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Services
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Aluminium Windows
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Glass Doors
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Custom Fabrication
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Installation
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-white transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-white">
              Contact Info
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-400">
              <li>Email: <a href="mailto:harisanwarali@gmail.com" className="hover:text-white transition">harisanwarali@gmail.com</a></li>
              <li>Phone: <a href="https://wa.me/923233541250" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">+92 323 3541250</a></li>
              <li>Location: Pakistan</li>
              <li>Available: 24/7</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-600 pt-6 text-center text-sm text-gray-400">
          © {currentYear} Maryam Aluminium & Glass. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
