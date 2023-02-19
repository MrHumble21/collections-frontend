/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect, useLayoutEffect } from "react";

import { Link } from "react-router-dom";
import { CiSettings } from "react-icons/ci";

function NavBar({ category, add, search }) {
  const [oneuser, setUser] = useState("");

  useLayoutEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userObject")));
  }, []);
  useEffect(() => {
    console.log(oneuser);
  }, [oneuser]);

  return (
    <>
      {oneuser && (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
          <div className="container-fluid">
            <a className="navbar-brand" href="/collections/Profile">
              {oneuser.fullName}
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarColor01"
              aria-controls="navbarColor01"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarColor01">
              <ul className="navbar-nav me-auto">
                <li className="nav-item">
                  <a className="nav-link" href="/collections">
                    Collections
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/collections/favourite">
                    Favourite
                  </a>
                </li>

                {category && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      state={category.state}
                      to={category.link}
                    >
                      {category.title}
                    </Link>
                  </li>
                )}
                {add && (
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      state={{ user: add.data, categories: add.categoryList }}
                      to={add.link}
                    >
                      {add.title}
                    </Link>
                  </li>
                )}
                <li className="nav-item">
                  <button
                    onClick={async () => {
                      localStorage.clear();
                      window.location.href = "/";
                      console.log("hey there");
                    }}
                    className="btn nav-link"
                  >
                    Log out
                  </button>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/settings">
                    Settings <CiSettings size={30} />
                  </a>
                </li>
              </ul>
              {search && (
                <form className="d-flex">
                  <input
                    className="form-control me-sm-2"
                    type="search"
                    placeholder="Search"
                  />
                  <button
                    className="btn btn-secondary my-2 my-sm-0"
                    type="submit"
                  >
                    Search
                  </button>
                </form>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default NavBar;
