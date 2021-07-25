import * as React from "react";
import { Link } from "gatsby";

const Header = ({ sitedata, pagedata }) => {
  // switch btn color
  const switchBtnColor =
    typeof window !== "undefined"
      ? localStorage.theme === "dark"
        ? "text-white"
        : null
      : null;

  const switchTheme = () => {
    if (typeof window !== "undefined") {
      document.body.classList.add("transition");
      if (localStorage.theme === "dark") {
        document.body.classList.remove("dark");
        document.body.classList.remove("bg-gray-800");
        document
          .getElementById("switchThemeBtn")
          .classList.remove("text-white");
        localStorage.removeItem("theme");
      } else {
        document.body.classList.add("dark");
        document.body.classList.add("bg-gray-800");
        document.getElementById("switchThemeBtn").classList.add("text-white");
        localStorage.theme = "dark";
      }
    }
  };
  return (
    <>
      {pagedata ? (
        // page header
        <header>
          <h5 className="transition pt-5 text-indigo-400 hover:text-indigo-800">
            <Link to="/">{sitedata.siteMetadata.title}</Link>
          </h5>
          <h1 className="py-5 dark:text-gray-200">{pagedata.title}</h1>
          <span className="text-gray-500 text-sm">{pagedata.date}</span>
        </header>
      ) : (
        // home header
        <header>
          <h1 className="transition text-indigo-500 hover:text-indigo-800 cursor-default dark:text-indigo-400">
            <Link to="/">{sitedata.siteMetadata.title}</Link>
          </h1>
          <h5 className="pt-5 text-indigo-400 font-light">
            {sitedata.siteMetadata.description}
          </h5>
        </header>
      )}
      <nav className="pt-8 pb-2 flex justify-between border-dotted border-b-4 border-red-300">
        <ul className="flex flex-wrap text-xl text-yellow-600">
          {sitedata.siteMetadata.navlink.map((link) =>
            // 假如是外链则使用 a 标签，否则使用 Link 标签
            // PS:后面才发现 Gatsby 的 Link 会自己识别外链。。。。😥
            link.url.includes("http://") || link.url.includes("https://") ? (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-pink-500 pr-5"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                to={link.url}
                className="transition hover:text-pink-500 pr-5"
              >
                {link.label}
              </Link>
            )
          )}
        </ul>
        <button
          onClick={() => {
            switchTheme();
          }}
        >
          <svg
            id="switchThemeBtn"
            xmlns="http://www.w3.org/2000/svg"
            className={`fill-current h-5 w-5 ${switchBtnColor}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </button>
      </nav>
    </>
  );
};

export default Header;
