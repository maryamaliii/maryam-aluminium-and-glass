import Link from "next/link";
import LogoIcon from "./LogoIcon";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900/80 backdrop-blur-xl border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <LogoIcon size={32} className="text-white shrink-0" />
              <span className="text-lg font-semibold text-white">
                Meer Engineering
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-gray-400">
              Premium aluminium fabrication and modern glass solutions. Excellence in precision, durability, and professional finishing since 2015.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200 mb-4">
              Services
            </h3>
            <ul className="space-y-3">
              {[
                { name: "Aluminium Windows", href: "/services" },
                { name: "Glass Doors", href: "/services" },
                { name: "Custom Fabrication", href: "/services" },
                { name: "Glass Partitions", href: "/services" },
                { name: "Mirrors & Wardrobes", href: "/services" },
                { name: "Kitchen Glass", href: "/services" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about" },
                { name: "Services", href: "/services" },
                { name: "Projects", href: "/projects" },
                { name: "Portfolio", href: "/portfolio" },
                { name: "Contact", href: "/contact" },
                { name: "Get a Quote", href: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-200 mb-4">
              Contact Info
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <span className="block text-gray-300 text-xs uppercase tracking-wider mb-1">Email</span>
                <a href="mailto:info@meerengineering.com" className="hover:text-white transition-colors duration-200">
                  info@meerengineering.com
                </a>
              </li>
              <li>
                <span className="block text-gray-300 text-xs uppercase tracking-wider mb-1">Phone / WhatsApp</span>
                <a href="https://wa.me/923233541250" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200">
                  +92 323 3541250
                </a>
              </li>
              <li>
                <span className="block text-gray-300 text-xs uppercase tracking-wider mb-1">Location</span>
                <p>Pakistan</p>
              </li>
              <li>
                <span className="block text-gray-300 text-xs uppercase tracking-wider mb-1">Support</span>
                <p>Available 24/7</p>
              </li>
            </ul>

            <div className="mt-6">
              <a
                href="https://wa.me/923233541250"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                aria-label="Contact us on WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.485 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.38z" />
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} Meer Engineering. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/privacy-policy" className="hover:text-white transition-colors duration-200" aria-label="Privacy Policy">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors duration-200" aria-label="Terms and Conditions">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
