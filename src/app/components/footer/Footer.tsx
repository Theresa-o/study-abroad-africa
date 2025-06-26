import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { TikTokIcon } from "../shared/icons/TikTok";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <p>&copy; 2025 Study Abroad Africa. All rights reserved.</p>
          <nav className="mt-2">
            <ul className="flex space-x-4">
              <li>
                <Link href="/terms_of_service" className="hover:underline">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy_policy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact_us" className="hover:underline">
                  Contact Us
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="flex space-x-4">
          <Link
            href="https://www.linkedin.com/company/study-abroad-africa/"
            className="hover:text-secondary"
          >
            <Linkedin size={24} />
            <span className="sr-only">LinkedIn</span>
          </Link>
          <Link
            href="https://www.tiktok.com/@studyabroadafrica1"
            className="hover:text-secondary"
          >
            <TikTokIcon size={24} />
            <span className="sr-only">Tiktok</span>
          </Link>
          <Link
            href="https://www.instagram.com/studyabroadafrica/"
            className="hover:text-secondary"
          >
            <Instagram size={24} />
            <span className="sr-only">Instagram</span>
          </Link>
          <Link
            href="https://x.com/studyabroadafri"
            className="hover:text-secondary"
          >
            <Twitter size={24} />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link
            href="https://www.youtube.com/channel/UCSnxYOYXSkPzZrxvM8dAGTw"
            className="hover:text-secondary"
          >
            <Youtube size={24} />
            <span className="sr-only">Youtube</span>
          </Link>
          <Link
            href="https://www.facebook.com/groups/605764575429869"
            className="hover:text-secondary"
          >
            <Facebook size={24} />
            <span className="sr-only">Facebook</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
