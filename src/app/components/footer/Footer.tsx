import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p>&copy; 2025 Study Abroad Africa. All rights reserved.</p>
          <nav className="mt-2">
            <ul className="flex space-x-4">
              <li>
                <Link href="/terms" className="hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex space-x-4">
          <Link href="https://facebook.com" className="hover:text-blue-400">
            <Facebook size={24} />
            <span className="sr-only">Facebook</span>
          </Link>
          <Link href="https://twitter.com" className="hover:text-blue-400">
            <Twitter size={24} />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="https://instagram.com" className="hover:text-pink-400">
            <Instagram size={24} />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link href="https://linkedin.com" className="hover:text-blue-400">
            <Linkedin size={24} />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
