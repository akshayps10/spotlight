import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" bg-success bg-opacity-25 text-light py-5">
      <div className="container">
        <div className="row">
      

          <div className="col-md-4 mb-4">
            <h5 className="text-dark fw-bold mb-3">About Us</h5>
            <p className="text-dark">
              We are committed to delivering the best service and information.
              Our mission is to enrich lives through exceptional digital
              experiences.
            </p>
          </div>

          <div className="text-dark col-md-4 mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text text-decoration-none hover-text-light">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/about" className="text text-decoration-none hover-text-light">
                  About Us
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/news" className="text text-decoration-none hover-text-light">
                  News Articles
                </Link>
              </li>
              <li>
                <Link to="/about" className="text text-decoration-none hover-text-light">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="fw-bold mb-3 text-dark">Contact Us</h5>
            <p className="text-muted">Kakkanad, kochin, india</p>
            <p className="text-muted">Email: journal@gmail.com</p>
            <p className="text-muted">Phone: +918301017309</p>
          </div>
        </div>

        
        <div className="border-top border-secondary pt-4 text-center">
          <p className="text-muted mb-3">Follow us on:</p>
          <div className="d-flex justify-content-center gap-3">
            <a href="#" className="text-muted text-decoration-none">
              Facebook
            </a>
            <a href="#" className="text-muted text-decoration-none">
              Twitter
            </a>
            <a href="#" className="text-muted text-decoration-none">
              LinkedIn
            </a>
            <a href="#" className="text-muted text-decoration-none">
              Instagram
            </a>
          </div>
          <p className="text-muted mt-3">
            &copy; {new Date().getFullYear()} JOURNAL SPOTLIGHT. All rights
            reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
