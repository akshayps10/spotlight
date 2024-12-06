import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/sign-in");
  };

  const handleDashboardClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault(); 
      alert("Please log in to access the Dashboard.");
    }
  };

  return (
    <header className="shadow-lg sticky-top bg-success bg-opacity-25">
      <div className="d-flex justify-content-between align-items-center container p-4">
        <Link to={"/"}>
          <h1 className="font-weight-bold text-xl d-flex flex-wrap">
            <span className="text-primary">
              <i className="fa-solid fa-newspaper"></i> JOURNAL
            </span>
            <span className="text-danger">SPOTLIGHT</span>
          </h1>
        </Link>

        <ul className="d-flex gap-4 list-unstyled mb-0">
          <Link
            to={"/"}
            className="d-none d-lg-inline text-muted text-decoration-none"
          >
            <li className="hover-underline">Home</li>
          </Link>
          <Link
            to={"/about"}
            className="d-none d-lg-inline text-muted text-decoration-none"
          >
            <li className="hover-underline">About</li>
          </Link>
          <Link
            to={"/dashboard"}
            className="d-none d-lg-inline text-muted text-decoration-none"
            onClick={handleDashboardClick}
          >
            <li className="hover-underline">Dashboard</li>
          </Link>
          <Link
            to={"/news"}
            className="d-none d-lg-inline text-muted text-decoration-none"
          >
            <li className="hover-underline">News Articles</li>
          </Link>
        </ul>

        {isLoggedIn ? (
          <button onClick={handleLogout} className="btn btn-danger">
            Sign Out
          </button>
        ) : (
          <Link to={"/sign-in"}>
            <button className="btn btn-success">Sign In</button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
