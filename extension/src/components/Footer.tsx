import { FaGithub, FaLinkedin } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import { SiBuymeacoffee } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="mt-2">
      <div className="flex justify-center space-x-4">
        <a
          href="https://github.com/PoorvKumar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900"
        >
          <FaGithub size={18} />
        </a>
        <a
          href="https://www.linkedin.com/in/poorvkumar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900"
        >
          <FaLinkedin size={18} />
        </a>
        <a
          href="mailto:poorvkumar14@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900"
        >
          <GoMail size={18} />
        </a>
        <a
          href="https://buymeacoffee.com/poorvkumar"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-600 hover:text-gray-900"
        >
          <SiBuymeacoffee size={18} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
