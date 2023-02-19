import React, { useState, useEffect } from "react";
import { CollectionItem } from "../../components/CollectionItem/CollectionItem";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import { BsPlusLg } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import { GuestCollectionItem } from "../../components/Guest Collection Item/GuestCollectionItem";
import { BASE_URL } from "../../extras/frontend_constants";

export function GuestCollectionsPage() {
  const [collectionList, setCollectionList] = useState("");
  const id = useLocation().state;
  console.log(id);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCollections = async () => {
    setIsLoading(true);

    await axios
      .post(BASE_URL + "/get_user", {
        id: id._id,
      })
      .then((res) => {
        setCollectionList(res.data.col);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);

        console.log(err);
      });
  };
  ///get-collections-by-category
  useEffect(() => {
    fetchCollections().then((r) => {
      console.log(r);
    });
  }, []);
  return (
    <>
      <NavBar
        category={{
          title: "Add Category +",
          link: "/add_category",
          state: { id, collectionList },
        }}
      />
      <br />
      <center>
        <h3>Guest collections page</h3>
      </center>
      <>
        <div className="m-2">
          <center>
            <div
              className="btn-group"
              role="group"
              aria-label="Basic radio toggle button group"
            >
              <input
                type="radio"
                className="btn-check"
                name="btnradio"
                id="btnradio1"
                defaultChecked
                autoComplete="off"
              />
            </div>
          </center>
        </div>
        <div className="m-3">
          <div className="container p-3">
            <div className="row mb-2 ">
              {collectionList.length > 0 &&
                collectionList.map((el, i) => (
                  <div key={i} className="col-sm-12 col-md-4 col-lg-3">
                    <GuestCollectionItem
                      id={el._id}
                      image={el.image}
                      title={el.name}
                      tags={el.tags}
                      description={el.description}
                      link={el._id}
                      collection={el}
                      user={id}
                    />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </>
    </>
  );
}
