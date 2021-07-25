import * as React from "react";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({ sitedata, pagedata, children }) => {
  useEffect(() => {
    // switch dark mode
    // transition class
    if (typeof window !== "undefined") {
      if (
        localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.body.classList.add("dark");
        document.body.classList.add("bg-gray-800");
      } else {
        document.body.classList.remove("dark");
        document.body.classList.remove("bg-gray-800");
      }
    }
  }, []);
  return (
    <div className="transition">
      <div className="container mx-auto w-5/6 sm:w-3/5 xl:w-3/5 2xl:w-1/3 py-10">
        <div className="mx-auto">
          <Header sitedata={sitedata} pagedata={pagedata} />
          <main>{children}</main>
          <Footer sitedata={sitedata} />
        </div>
      </div>
    </div>
  );
};

export default Layout;
