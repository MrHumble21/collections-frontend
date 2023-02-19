/* eslint-disable no-restricted-globals */
import React, { useState } from "react";
import axios from "axios";
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
} from "mdb-react-ui-kit";
import { MdOutlineHideImage } from "react-icons/md";
import { AiFillDelete, AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link } from "react-router-dom";
import Toast from "../toast/Toast";

export function GuestCollectionItem(props) {
  const [toastMessage, setToastMessage] = useState("");
  const [isVisibleToast, setIsVisibleToast] = useState(false);
  const [fav, setFav] = useState(false);
  const { id, image, title, description, link, collection, tags, user } = props;
  console.log({ collection });
  return (
    <>
      <MDBCard className="position-relative">
        <MDBCard className="h-100">
          {!image ? (
            <div
              style={{ border: "1px solid black" }}
              className="container d-flex justify-content-center align-items-center  h-75"
            >
              <MdOutlineHideImage size={80} />
            </div>
          ) : (
            <MDBCardImage height={220} src={image} alt="..." position="top" />
          )}
          <div className="bg-blur  position-absolute m-2"></div>

          <Link
            className="text-decoration-none"
            to={`/guest/collections/${link}`}
            state={collection}
          >
            <MDBCardBody>
              <MDBCardTitle className="m-0">{title}</MDBCardTitle>
              <MDBCardText>
                {description.toString().slice(0, 50) + "..."}
              </MDBCardText>
            </MDBCardBody>
            <hr />
            <div className="container">
              Tags:
              {tags.length > 0 &&
                tags.map((el, i) => (
                  <p key={i} className="d-inline-block mx-1 badge bg-light">
                    #{el}
                  </p>
                ))}
            </div>
          </Link>
        </MDBCard>
      </MDBCard>
      {isVisibleToast && <Toast message={toastMessage} />}{" "}
    </>
  );
}
