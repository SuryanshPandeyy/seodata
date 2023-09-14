"use client";

import React, { useState } from "react";
import axios from "axios";
import styles from "./page.module.css";
import { RiLoader3Line } from "react-icons/ri";
import { CircularProgressbar } from "react-circular-progressbar";

const API = "https://api.dataforseo.com/v3/on_page/instant_pages";

const config = {
  auth: {
    username: "suryanshpallavi@gmail.com",
    password: "ba2a7f84b202d21f",
  },

  headers: {
    "content-type": "application/json",
  },
};

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const submitUrl = async (e) => {
    e.preventDefault();
    setLoading(true);

    const post_array = [
      {
        url,
        load_resources: true,
        enable_javascript: true,
        enable_browser_rendering: true,
      },
    ];

    try {
      await axios
        .post(API, post_array, config)
        .then((response) => {
          setLoading(false);

          const result = response["data"]["tasks"];
          setData(result);
          console.log(result);
        })
        .catch(function (error) {
          setLoading(false);
          console.error(error);
        });
    } catch (err) {
      setLoading(false);
    }
  };

  const newData = data[0];
  const items =
    newData &&
    newData?.result &&
       newData?.result[0] &&
    newData?.result[0]?.items &&
    newData?.result[0]?.items[0];

  return (
    <main className={styles.main}>
      {loading && (
        <div className={styles.loader}>
          <RiLoader3Line color="#fff" size={40} className={styles.loading} />
        </div>
      )}
      <form className={styles.urlContainer} onSubmit={submitUrl}>
        <input
          name="url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className={styles.input}
          placeholder="Type URL here"
        />
        <button type="submit" className={styles.submit}>
          Submit
        </button>
      </form>

      {items && (
        <div className={styles.container}>
          <CircularProgressbar
            className={styles.progress}
            value={items?.onpage_score || 0}
            text={`${items?.onpage_score.toFixed(0)}%`}
          />

          <div className={styles.grid}>
            {Object.entries(items?.meta?.content).map((item, i) => {
              const names =
                item &&
                item[0]
                  ?.split("_")
                  .join(" ")
                  .replace(/\b\w/g, (match) => match.toUpperCase());

              return (
                <div key={i} className={styles.box}>
                  <p className={styles.gridValue}>
                    {parseFloat(Number(item ? item[1] : 0)?.toFixed(2))}
                  </p>
                  <p className={styles.gridTitle}>{names}</p>
                </div>
              );
            })}

            <div className={styles.box}>
              <p className={styles.gridValue}>
                {items?.meta?.internal_links_count}
              </p>
              <p className={styles.gridTitle}>Internal Links Count</p>
            </div>

            <div className={styles.box}>
              <p className={styles.gridValue}>
                {items?.meta?.external_links_count}
              </p>
              <p className={styles.gridTitle}>External Links Count</p>
            </div>

            <div className={styles.box}>
              <p className={styles.gridValue}>{items?.meta?.images_count}</p>
              <p className={styles.gridTitle}>Number of Images</p>
            </div>

            <div className={styles.box}>
              <p className={styles.gridValue}>{items?.meta?.images_size}</p>
              <p className={styles.gridTitle}>Images Size</p>
            </div>

            <div className={styles.box}>
              <p className={styles.gridValue}>{items?.meta?.scripts_count}</p>
              <p className={styles.gridTitle}>Scripts</p>
            </div>

            <div className={styles.box}>
              <p className={styles.gridValue}>{items?.meta?.scripts_size}</p>
              <p className={styles.gridTitle}>Scripts Size</p>
            </div>

            <div className={styles.box}>
              <p className={styles.gridValue}>
                {items?.meta?.stylesheets_count}
              </p>
              <p className={styles.gridTitle}>Stylesheets Count</p>
            </div>

            <div className={styles.box}>
              <p className={styles.gridValue}>
                {items?.meta?.stylesheets_size}
              </p>
              <p className={styles.gridTitle}>Stylesheets Size</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
