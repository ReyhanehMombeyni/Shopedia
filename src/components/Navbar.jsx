import { useContext } from "react";
import Link from "./shared/Link";
import { AppContext } from "../App";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const {state}= useContext(AppContext);
  const {items}= state;

  const location= useLocation();

  return (
    <nav className="navbar bg-base-100 rounded-xl shadow-xl px-10">
      <div className="flex-1">
        <a className="btn btn-ghost text-3xl font-bold bg-clip-text bg-linear-to-r text-transparent from-[#F97316] to-[#22C55E]">Shopedia</a>
      </div>
      <div className="flex items-center">
        <div className="flex pr-30 gap-10 text-lg font-medium">
          <Link address="/" text="Product" />
          <Link address="signup" text="SignUp" />
          <Link address="login" text="Login" />
        </div>
        <div className="flex-none">
          <div>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item bg-red-500 text-white">
                  {
                    location.pathname==="/" && (state?.items ? items.length : 0)
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
