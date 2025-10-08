import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import MagicButton from "./MagicButton";

const Footer = () => {
  return (
    <footer
      className="w-full pt-20 pb-10"
      id="contact"
      aria-labelledby="contact-heading"
    >
      {/* background grid */}
      <div
        className="w-full absolute left-0 -bottom-72 min-h-96"
        aria-hidden="true"
      >
        <img
          src="/footer-grid.svg"
          alt=""
          role="presentation"
          className="w-full h-full opacity-50"
        />
      </div>

      <div className="flex flex-col items-center">
        <h2 id="contact-heading" className="heading lg:max-w-[45vw]">
          Ready to take <span className="text-purple">your</span> digital
          presence to the next level?
        </h2>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help you
          achieve your goals.
        </p>
        <a
          href="mailto:elpraise20@gmail.com"
          aria-label="Send an email to contact me"
          className="focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg"
        >
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
            ariaLabel="Send me an email"
          />
        </a>
      </div>
      <div className="flex mt-16 md:flex-row flex-col justify-between items-center">
        <p className="md:text-base text-sm md:font-normal font-light">
          Copyright © {new Date().getFullYear()} El-Praise Ayo
        </p>

        <nav aria-label="Social media links">
          <ul className="flex items-center md:gap-3 gap-6 list-none">
            {socialMedia.map((info) => (
              <li key={info.id}>
                <a
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit my profile on ${
                    info.img.split("/").pop()?.split(".")[0] || "social media"
                  }`}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg block"
                >
                  <div className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300">
                    <img
                      src={info.img}
                      alt=""
                      aria-hidden="true"
                      width={20}
                      height={20}
                    />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
