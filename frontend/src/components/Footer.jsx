import { Linkedin, Instagram, Github } from "lucide-react";

function Footer() {
  return (
    <footer className="px-6 py-12 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto text-center">
        <div className="text-2xl font-bold mb-4">DSABetter</div>
        <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
          Empowering developers to master Data Structures & Algorithms through
          intelligent practice and revision.
        </p>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-6 text-gray-400">
          <a
            href="https://www.linkedin.com/in/koustav-bera-b88b95270/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://www.instagram.com/yours.koustav"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={24} />
          </a>
          <a
            href="https://github.com/koustavbera"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github size={24} />
          </a>
        </div>

        {/* Buy Me a Coffee Button */}
        <div className="mb-6">
          <a
            href="https://coff.ee/KoustavBera"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded transition-colors"
          >
            ☕ Buy Me a Coffee
          </a>
        </div>

        <div className="text-gray-500 text-sm">
          © 2025 DSABetter. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
