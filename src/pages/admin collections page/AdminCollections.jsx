import React, { useState, useEffect } from "react";
import { CollectionItem } from "../../components/CollectionItem/CollectionItem";
import axios from "axios";
import NavBar from "../../components/navbar/NavBar";
import { BsPlusLg } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ReactHtmlParser from "react-html-parser";
import CustomCollectionItem from "../../components/CollectionItem/CustomCollectionItem";
import { CSVLink } from "react-csv";
import {
  BASE_URL,
  headersCollections,
  userCollectionHeader,
} from "../../extras/frontend_constants";
import { AiOutlineCloudDownload } from "react-icons/ai";

export function AdminCollections() {
  const [collectionList, setCollectionList] = useState("");
  const id = useLocation().state;
  const [content, setContent] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTag, setSearchTag] = useState("");
  const [close, setClose] = useState(true);
  const [typeName, setTypeName] = useState("");
  const [type, setType] = useState("");
  const [custom, setCustom] = useState([]);
  const [customValues, setCustomValues] = useState({});
  const selectTag = (t) => {
    setSearchTag(t);
    setClose(false);
  };

  const fetchCollections = async () => {
    setIsLoading(true);
    if (!id) {
      setContent(false);
    }

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
  const dataCollections = [];
  const dataUser = [id];
  return (
    <>
      <NavBar
        category={{
          title: "Add Category +",
          link: "/add_category",
          state: { id, collectionList },
        }}
      />
      {isLoading && <Loader />}
      <div className="container m-2 p-2 d-flex">
        <div className="mx-2">
          <CSVLink
            data={dataCollections}
            headers={headersCollections}
            filename={"CollectionsReport.csv"}
            className="btn btn-primary"
            target="_blank"
          >
            Download Collections Report CSV <AiOutlineCloudDownload size={25} />
          </CSVLink>
        </div>

        <br />
        <CSVLink
          data={dataUser}
          headers={userCollectionHeader}
          filename={"User.csv"}
          className="btn btn-primary"
          target="_blank"
        >
          Download User Report CSV <AiOutlineCloudDownload size={25} />
        </CSVLink>
      </div>
      <div id="custom">
        {custom.length > 0 && custom.map((el, i) => <div key={i}>{el}</div>)}
      </div>
      {!close && (
        <div
          className="container rounded my-5 p-3"
          style={{ backgroundColor: "#ECF9FF" }}
        >
          <div className="d-flex justify-content-between">
            <h5 className="fs-3 text-black-50 font-weight-bold">Result</h5>{" "}
            <span
              role="button"
              onClick={() => {
                setClose(true);
              }}
              className=""
            >
              ❌
            </span>
          </div>

          <div className="container p-3">
            {searchTag &&
              searchTag.filtered.map((el, i) => (
                <CustomCollectionItem
                  id={el._id}
                  image={el.image}
                  title={el.name}
                  tags={el.tags}
                  description={el.description}
                  link={el._id}
                  collection={el}
                  user={id}
                  onSelectTag={selectTag}
                />
              ))}
          </div>
        </div>
      )}
      {content ? (
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
                  collectionList.map((el, i) => {
                    const a = {
                      title: el.title,
                      description: el.description,
                      tags: el.tags,
                      comments: el.comments,
                      likes: el.likes.length,
                      image: el.image,
                    };
                    dataCollections.push(a);

                    return (
                      <div key={i} className="col-sm-12 col-md-4 col-lg-3">
                        <CustomCollectionItem
                          id={el._id}
                          image={el.image}
                          title={el.name}
                          tags={el.tags}
                          description={el.description}
                          link={el._id}
                          collection={el}
                          user={id}
                          onSelectTag={selectTag}
                        />
                      </div>
                    );
                  })}
                <div className="col-sm-12 col-md-4 col-lg-3"></div>
              </div>
            </div>
          </div>
          <Link
            state={JSON.parse(localStorage.getItem("userObject"))}
            to={"/collections/add"}
          >
            <button
              style={{
                bottom: "40px",
                right: "20px",
                borderRadius: "100%",
              }}
              type="button"
              className="btn shadow p-3 position-absolute  btn-primary"
            >
              <BsPlusLg size={35} />
            </button>
          </Link>
        </>
      ) : (
        <h1 className="m-5 text-center"> You are not authorized </h1>
      )}
    </>
  );
}
