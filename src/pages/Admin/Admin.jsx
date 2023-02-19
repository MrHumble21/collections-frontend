/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import TableComponent from "../../components/table/Table";
import axios from "axios";
import { Link } from "react-router-dom";
import { CSVLink } from "react-csv";
import {
  BASE_URL,
  userCollectionHeader,
} from "../../extras/frontend_constants";
import { AiOutlineCloudDownload } from "react-icons/ai";

function Admin() {
  const [users, setUsers] = useState([]);
  const [search, found] = useState("");
  const [filtered, setFiltered] = useState([...users]);
  const fetchUsers = async () => {
    axios.get(BASE_URL + "/users").then((res) => {
      console.log("object");
      setUsers(res.data.users);
    });
  };
  const user = JSON.parse(localStorage.getItem("userObject"));
  useEffect(() => {
    fetchUsers();
  }, []);

  if (localStorage.getItem("userRole") !== "Admin") {
    window.location.href = "/";
  } else {
    console.log("you are admin");
  }

  const dataUser = [];
  users &&
    users.map((user) => {
      const a = {
        fullName: user.fullName,
        gender: user.gender,
        email: user.email,
        phone: user.phone,
        password: user.password,
        collections: user.collections.length,
        role: user.role,
      };
      dataUser.push(a);
    });
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary text-white">
        <div className="container-fluid text-white">
          <a className="navbar-brand text-white" href="/">
            User management
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  state={user}
                  className="nav-link active text-white"
                  aria-current="page"
                  to="/collections/add"
                >
                  Create collection
                </Link>
              </li>
              <li className="nav-item text-white">
                <a className="nav-link text-white" href="frontend/src/pages#">
                  Link
                </a>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="text"
                value={search}
                onChange={(e) => {
                  found(e.target.value);
                  setUsers(
                    users.filter((user) =>
                      user.fullName
                        .toLocaleLowerCase()
                        .includes(search.toLocaleLowerCase())
                    )
                  );
                }}
                placeholder="Search"
                aria-label="Search"
              />
            </form>
          </div>
        </div>
      </nav>
      <div className="container m-2 p-2 d-flex">
        <CSVLink
          data={dataUser}
          headers={userCollectionHeader}
          filename={"User.csv"}
          className="btn btn-primary"
          target="_blank"
        >
          Download Users Report CSV
          <AiOutlineCloudDownload size={25} />
        </CSVLink>
      </div>
      {users.length > 0 && (
        <TableComponent
          head={[
            "#",
            "Full Name",
            "Gender",
            "Email",
            "Phone",
            "role",
            "Delete",

            "Collections",
          ]}
          body={users}
        />
      )}
    </div>
  );
}

export default Admin;
