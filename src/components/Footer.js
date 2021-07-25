import * as React from "react";

const Footer = ({ sitedata }) => {
  return (
    <footer className="py-8 dark:text-gray-200">
      © {new Date().getFullYear()} {sitedata.siteMetadata.title} All Rights
      Reserved | {` `}
      <span className="text-pink-500">
        Powered By
        {` `}
        <a
          className="text-pink-500 font-semibold hover:text-pink-700"
          href="https://www.gatsbyjs.com"
          target="_blank"
          rel="noreferrer"
        >
          Gatsby
        </a>
      </span>
    </footer>
  );
};

export default Footer;
