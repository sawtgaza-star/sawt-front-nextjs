// @ts-nocheck
"use client";
/* eslint-disable */
import Link from "next/link";
import { usePathname } from "next/navigation";

/* Shared top bar + navbar + mobile search (canonical version, unified across pages). */
export default function SiteNav() {
  const pathname = usePathname();
  return (
    <>
      <div className="container nav-face py-2 text-white border-bottom border-light border-opacity-25">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="social-links">
            <span
              className="font-18 ms-2"
              data-i18n="follow_us"
              style={{
                color: "rgba(127, 127, 127, 1)",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              وسائل التواصل الاجتماعي
            </span>
            <a href="#" className="text-white ms-2">
              <i className="fab fa-linkedin-in font-18"></i>{" "}
            </a>
            <a href="#" className="text-white ms-2">
              <i className="fab fa-facebook-f font-18"></i>
            </a>{" "}
            <a href="#" className="text-white ms-2">
              <i className="fa-solid fa-paper-plane"></i>
            </a>{" "}
            <a href="#" className="text-white ms-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.3em"
                height="1.3em"
                viewBox="0 0 24 24"
              >
                {" "}
                <path d="M0 0h24v24H0z" fill="none"></path>{" "}
                <path
                  fill="rgba(76, 92, 55, 1)"
                  d="M19.57 4.488a.75.75 0 0 0-1.14-.976l-5.368 6.274l-5.224-5.938a1.8 1.8 0 0 0-1.357-.598H5.007c-.68 0-1.264.352-1.56.885a1.55 1.55 0 0 0 .204 1.795l6.286 7.147l-5.507 6.435a.75.75 0 1 0 1.14.976l5.368-6.274l5.224 5.938c.345.392.85.598 1.357.598h1.474c.681 0 1.264-.352 1.56-.885a1.55 1.55 0 0 0-.203-1.795l-6.287-7.146z"
                ></path>{" "}
              </svg>{" "}
            </a>{" "}
            <a href="#" className="text-white ms-2">
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.2em"
                height="1.2em"
                viewBox="0 0 24 24"
                className="icon"
              >
                {" "}
                <path d="M0 0h24v24H0z" fill="none"></path>{" "}
                <path
                  fill="rgba(76, 92, 55, 1)"
                  d="M9.367 2.25c-1.092 0-1.958 0-2.655.057c-.714.058-1.317.18-1.868.46a4.75 4.75 0 0 0-2.076 2.077c-.281.55-.403 1.154-.461 1.868c-.057.697-.057 1.563-.057 2.655v5.266c0 1.092 0 1.958.057 2.655c.058.714.18 1.317.46 1.869a4.75 4.75 0 0 0 2.077 2.075c.55.281 1.154.403 1.868.461c.697.057 1.563.057 2.655.057h5.266c1.092 0 1.958 0 2.655-.057c.714-.058 1.317-.18 1.869-.46a4.75 4.75 0 0 0 2.075-2.076c.281-.552.403-1.155.461-1.869c.057-.697.057-1.563.057-2.655V9.367c0-1.092 0-1.958-.057-2.655c-.058-.714-.18-1.317-.46-1.868a4.75 4.75 0 0 0-2.076-2.076c-.552-.281-1.155-.403-1.869-.461c-.697-.057-1.563-.057-2.655-.057zM16.25 6.5a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 0 1.5H17a.75.75 0 0 1-.75-.75m-6.207 1.728a4.25 4.25 0 1 1 3.914 7.544a4.25 4.25 0 0 1-3.914-7.544"
                ></path>{" "}
              </svg>{" "}
            </a>{" "}
          </div>{" "}
          <div className="contact-info small d-flex justify-content-center align-items-center">
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
        </div>{" "}
      </div>
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
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              {" "}
              <path d="M0 0h24v24H0z" fill="none"></path>{" "}
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M10 5h10M4 12h16M4 19h10"
              ></path>{" "}
            </svg>{" "}
          </button>{" "}
          <div
            className="collapse navbar-collapse flex-column flex-lg-row align-items-start align-items-lg-center"
            id="mainNav"
          >
            {" "}
            <ul
              className="navbar-nav mb-2 mb-lg-0 fw-bold"
              style={{ textAlign: "start" }}
            >
              {" "}
              <li className="nav-item ms-lg-3">
                {" "}
                <Link
                  className={
                    "nav-link font-16" + (pathname === "/" ? " active" : "")
                  }
                  href="/"
                  data-i18n="nav_home"
                >
                  الرئيسية
                </Link>{" "}
              </li>{" "}
              <li className="nav-item ms-lg-3">
                {" "}
                <Link
                  className={
                    "nav-link font-16" +
                    (pathname === "/about" ? " active" : "")
                  }
                  href="/about"
                  target="_self"
                  data-i18n="nav_about"
                >
                  من نحن
                </Link>{" "}
              </li>{" "}
              <li className="nav-item ms-lg-3">
                {" "}
                <a
                  className={
                    "nav-link font-16" +
                    (pathname === "/content" ? " active" : "")
                  }
                  href="/content"
                  data-i18n="nav_content"
                >
                  محتوانا
                </a>{" "}
              </li>{" "}
              <li className="nav-item ms-lg-3">
                {" "}
                <a className="nav-link font-16" href="#" data-i18n="nav_team">
                  الفريق
                </a>{" "}
              </li>{" "}
              <li className="nav-item ms-lg-3">
                {" "}
                <a
                  className={
                    "nav-link font-16" +
                    (pathname === "/creators" ? " active" : "")
                  }
                  href="/creators"
                  data-i18n="nav_creators"
                >
                  صناع المحتوى
                </a>{" "}
              </li>{" "}
              <div className="v-divider d-none d-lg-block mx-3"></div>{" "}
              <li className="nav-item ms-lg-3">
                {" "}
                <a
                  className="nav-link nav-link-back font-16"
                  href="#"
                  style={{ color: "rgba(76, 92, 55, 1) !important" }}
                  data-i18n="nav_incubator"
                >
                  حاضنة صوت
                </a>{" "}
              </li>{" "}
              <li className="nav-item ms-lg-3">
                {" "}
                <a
                  className="nav-link nav-link-back font-16 font-color-green"
                  href="#"
                  style={{ color: "rgba(76, 92, 55, 1) !important" }}
                  data-i18n="nav_media"
                >
                  صوت ميديا
                </a>{" "}
              </li>{" "}
            </ul>{" "}
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
              <button className="btn rounded-nav nav-bttn">
                {" "}
                <i className="ri-moon-line"></i>{" "}
              </button>{" "}
              <button className="btn rounded-nav language-btn nav-bttn">
                {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="2em"
                  height="3em"
                  viewBox="0 0 24 24"
                >
                  {" "}
                  <path d="M0 0h24v24H0z" fill="none"></path>{" "}
                  <g fill="none" stroke="currentColor" strokeWidth="1.5">
                    {" "}
                    <circle cx="12" cy="12" r="10"></circle>{" "}
                    <path
                      strokeLinejoin="round"
                      d="M8 12c0 6 4 10 4 10s4-4 4-10s-4-10-4-10s-4 4-4 10Z"
                    ></path>{" "}
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 15H3m18-6H3"
                    ></path>{" "}
                  </g>{" "}
                </svg>{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </nav>
      <div className="mobile-search-panel d-lg-none" id="mobileSearchPanel">
        {" "}
        <form className="mobile-search-form container" role="search">
          {" "}
          <button
            type="button"
            className="mobile-search-close"
            id="mobileSearchClose"
            aria-label="إغلاق"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.25em"
              height="1.25em"
              viewBox="0 0 24 24"
            >
              {" "}
              <path
                fill="none"
                stroke="rgba(76, 92, 55, 1)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M6 6l12 12M18 6L6 18"
              ></path>{" "}
            </svg>{" "}
          </button>{" "}
          <input
            type="search"
            className="form-control mobile-search-input"
            id="mobileSearchInput"
            placeholder="ابحث هنا..."
            data-i18n-placeholder="search_placeholder"
            aria-label="بحث"
          />{" "}
          <button
            type="submit"
            className="mobile-search-submit"
            aria-label="بحث"
          >
            {" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.25em"
              height="1.25em"
              viewBox="0 0 24 24"
            >
              {" "}
              <path d="M0 0h24v24H0z" fill="none"></path>{" "}
              <path
                fill="none"
                stroke="#fff"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="m17 17l4 4m-2-10a8 8 0 1 0-16 0a8 8 0 0 0 16 0"
              ></path>{" "}
            </svg>{" "}
          </button>{" "}
        </form>{" "}
      </div>
    </>
  );
}
