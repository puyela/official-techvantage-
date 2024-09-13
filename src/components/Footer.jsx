import React from 'react';
import { Link } from "react-router-dom";
import '../index.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        {/* Logo Section */}
        <div className="footer-section logo">
          <Link to="/" className="footer-logo">
            <span className="logo-tech">Tech</span>
            <span className="logo-vantage">Vantage</span>
          </Link>
        </div>

        {/* Copyright Section */}
        <div className="footer-section copyright">
          <p>&copy; 2024 TechVantage. All rights reserved.</p>
        </div>

        {/* Social Media Links Section */}
        <div className="footer-section social-media">
          <a href="https://facebook.com/techvantage" className="social-link" aria-label="Facebook">
            <svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.25 1H7C6.00544 1 5.05161 1.39509 4.34835 2.09835C3.64509 2.80161 3.25 3.75544 3.25 4.75V7H1V10H3.25V16H6.25V10H8.5L9.25 7H6.25V4.75C6.25 4.55109 6.32902 4.36032 6.46967 4.21967C6.61032 4.07902 6.80109 4 7 4H9.25V1Z" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
          </a>
          <a href="https://twitter.com/techvantage" className="social-link" aria-label="Twitter">
            <svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 1.00764C20.1294 1.52097 19.1656 1.91359 18.1455 2.17037C17.5979 1.64411 16.8703 1.27111 16.0609 1.10182C15.2516 0.932528 14.3995 0.975113 13.6201 1.22381C12.8406 1.47251 12.1713 1.91533 11.7027 2.49238C11.2341 3.06942 10.9888 3.75285 11 4.45023V5.21018C9.40239 5.24481 7.81934 4.94862 6.39183 4.34798C4.96431 3.74733 3.73665 2.86089 2.81818 1.7676C2.81818 1.7676 -0.818182 8.60718 7.36364 11.647C5.49139 12.7094 3.26105 13.2421 1 13.1669C9.18182 16.9667 19.1818 13.1669 19.1818 4.42743C19.181 4.21575 19.1566 4.00459 19.1091 3.79667C20.0369 3.03177 20.6917 2.06604 21 1.00764Z" stroke="#2563EB" stroke-width="1.81818" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <a href="https://instagram.com/techvantage" className="social-link" aria-label="Instagram">
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.25 1H4.75C2.67893 1 1 2.67893 1 4.75V12.25C1 14.3211 2.67893 16 4.75 16H12.25C14.3211 16 16 14.3211 16 12.25V4.75C16 2.67893 14.3211 1 12.25 1Z" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M11.5 8.02748C11.5926 8.65167 11.486 9.28914 11.1953 9.84924C10.9047 10.4093 10.4449 10.8635 9.88124 11.1472C9.3176 11.4309 8.67886 11.5297 8.05586 11.4294C7.43287 11.3292 6.85734 11.035 6.41115 10.5889C5.96496 10.1427 5.67082 9.56714 5.57058 8.94414C5.47033 8.32115 5.56907 7.6824 5.85277 7.11876C6.13647 6.55512 6.59066 6.09529 7.15076 5.80466C7.71086 5.51404 8.34834 5.40742 8.97252 5.49998C9.60922 5.5944 10.1987 5.89108 10.6538 6.34621C11.1089 6.80134 11.4056 7.39079 11.5 8.02748Z" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12.625 4.375H12.6325" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
           </svg>

          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
