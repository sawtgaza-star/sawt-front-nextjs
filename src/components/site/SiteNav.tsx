// @ts-nocheck
/* eslint-disable */
import { IconGlobe } from "@/components/ui/icons";
import NavTopBar from "./NavTopBar";
import NavLinks from "./NavLinks";
import MobileSearchPanel from "./MobileSearchPanel";

/* Shared top bar + navbar + mobile search (canonical version, unified across pages). */
export default function SiteNav() {
  return (
    <>
      <NavTopBar />
      <nav className="navbar navbar-expand-lg py-1">
        {" "}
        <div className="container bg-white py-1">
          {" "}
          <button
            className="btn mobile-nav-search d-lg-none p-0"
            type="button"
            aria-label="بحث"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              {" "}
              <path d="M0 0h24v24H0z" fill="none"></path>{" "}
              <path
                fill="none"
                stroke="rgba(76, 92, 55, 1)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m17 17l4 4m-2-10a8 8 0 1 0-16 0a8 8 0 0 0 16 0"
              ></path>{" "}
            </svg>{" "}
          </button>{" "}
          <a
            className="navbar-brand"
            href="#"
            style={{ marginRight: "0 !important" }}
          >
            {" "}
            <img
              src="/assets/images/صوت 1.png"
              alt="Sawt Logo"
              height="60"
            />{" "}
          </a>{" "}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainNav"
          >
            {" "}
            <span className="navbar-toggler-icon d-none d-lg-inline-block"></span>{" "}
            <svg
              className="navbar-toggler-svg d-lg-none"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              {" "}
              <path
                d="M14 18C14.5523 18 15 18.4477 15 19C15 19.5523 14.5523 20 14 20H4C3.44772 20 3 19.5523 3 19C3 18.4477 3.44772 18 4 18H14ZM20 11C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12C3 11.4477 3.44772 11 4 11H20ZM20 4C20.5523 4 21 4.44772 21 5C21 5.55228 20.5523 6 20 6H10C9.44772 6 9 5.55228 9 5C9 4.44772 9.44772 4 10 4H20Z"
                fill="#484848"
              ></path>{" "}
            </svg>{" "}
          </button>{" "}
          <div
            className="collapse navbar-collapse flex-column flex-lg-row align-items-start align-items-lg-center"
            id="mainNav"
          >
            {" "}
            <NavLinks />{" "}
            <div className="d-flex gap-2 nav-search-div">
              {" "}
              <div className="position-relative nav-search-div">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24"
                  className="fa fa-search position-absolute top-50 end-0 translate-middle-y me-3"
                >
                  {" "}
                  <path d="M0 0h24v24H0z" fill="none"></path>{" "}
                  <path
                    fill="none"
                    stroke="rgba(145, 145, 145, 1)"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="m17 17l4 4m-2-10a8 8 0 1 0-16 0a8 8 0 0 0 16 0"
                  ></path>{" "}
                </svg>{" "}
                <input
                  type="text"
                  className="form-control custom-placeholder py-2 search-input"
                  placeholder="ابحث هنا..."
                  data-i18n-placeholder="search_placeholder"
                />{" "}
              </div>{" "}
            </div>{" "}
            <div className="contact-info-nav small d-flex">
              {" "}
              <div className="register-btn">
                {" "}
                <a href="/register" data-i18n="register_account">
                  أنشئ حساب
                </a>{" "}
              </div>{" "}
              <div className="sign-in-btn">
                {" "}
                <a href="/login" data-i18n="sign_in">
                  تسجيل الدخول
                </a>{" "}
              </div>{" "}
            </div>{" "}
            <div className="searchDiv d-flex align-items-center gap-2">
              {" "}
              <button
                type="button"
                className="language-btn nav-lang-btn"
                aria-label="تغيير اللغة"
              >
                {" "}
                <IconGlobe />{" "}
                <span data-i18n="auth_lang_label">En</span>{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </nav>
      <MobileSearchPanel />
    </>
  );
}
