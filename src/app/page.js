"use client";

import React, { useState } from "react";
import axios from "axios";
import styles from "./page.module.css";
import { RiLoader3Line } from "react-icons/ri";

const API = "https://api.dataforseo.com/v3/on_page/task_post";

const config = {
  auth: {
    username: "suryanshpallavi@gmail.com",
    password: "ba2a7f84b202d21f",
  },

  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Headers":
      "Origin, Content-Type, Accept, Authorization, X-Request-With",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
  },
};

export default function Home() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  const submitUrl = async (e) => {
    e.preventDefault();
    setLoading(true);

    const post_array = [
      {
        target: url,
        max_crawl_pages: 10,
        load_resources: true,
        enable_javascript: true,
        custom_js: "meta = {}; meta.url = document.URL; meta;",
      },
    ];

    try {
      await axios
        .post(API, post_array, config)
        .then((response) => {
          const result = response["data"]["tasks"];
          const id = result && result[0]?.id;

          getPage(id);

          // Result data
          console.log(id);
        })
        .catch(function (error) {
          setLoading(false);
          console.error(error);
        });
    } catch (err) {
      setLoading(false);
    }
  };

  const getPage = async (id) => {
    const post_array = [
      {
        id,
        url,
      },
    ];

    try {
      await axios
        .post(url, post_array, config)
        .then(function (res) {
          setLoading(false);
          var result = res["data"]["tasks"];
          setData(result[0]);
          console.log(result);
        })
        .catch(function (error) {
          setLoading(false);
          console.log(error);
        });
    } catch (err) {
      setLoading(false);
    }
  };

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
    </main>
  );
}
