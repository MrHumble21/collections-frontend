import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBProgress,
  MDBProgressBar,
  MDBIcon,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import NavBar from "../navbar/NavBar";
import profile from "./profile.module.css";
import Lottie from "react-lottie";

import animationDataMale from "./male.json";
import animationDataFemale from "./female.json";
import { BASE_URL } from "../../extras/frontend_constants";

export function Profile({ fullName, gender, phone, email }) {
  const id = JSON.parse(localStorage.getItem("userObject"));
  console.log(id);

  const [oneuser, setUser] = useState("");
  const defaultOptions = {
    loop: true,
    autoplay: true,

    animationData:
      id.gender === "male" ? animationDataMale : animationDataFemale,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const fetchUser = async () => {
    await axios
      .get(BASE_URL + `/user-profile/${id._id}`)
      .then((res) => {
        console.log(oneuser, "oneuser");
        setUser(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // {oneuser.userProfile[0].fullName}
  return (
    <>
      <NavBar />
      {oneuser && (
        <div className="container m-3 p-3 d-flex justify-content-center align-items-center">
          <div className={profile.card + " bg-info"}>
            <div className={profile.cover_photo}>
              {/*<img src={}  alt={''}/>*/}

              <div className={profile.profile}>
                <Lottie options={defaultOptions} height={150} width={150} />
              </div>
            </div>
            <br />

            <p className={profile.about + " text-white"}>
              {oneuser.userProfile[0].fullName.toString()}
            </p>
            <button className={profile.btn}>Message</button>
            <button className={profile.btn}>Following</button>
          </div>
        </div>
      )}
    </>
  );
}
