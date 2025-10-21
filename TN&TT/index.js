"use strict";
import dotEnv from "dotenv";
dotEnv.config();
import express, { json } from "express";
import jsonWTK from "jsonwebtoken";
import cors from "cors";
import bParser from "body-parser";
import { insertHotNews, getHotNews } from "./routes/hot.js";
import { getTrendingNews } from "./api/news.js";

const { urlencoded } = bParser;
const { sign, verify } = jsonWTK;

// Create the express app
const app = express();

// cors
app.use(cors());
app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);

let data;

// Routes and middleware
app.get("/", function (req, res) {
  res.send("Hello, world!");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === process.env.USER && password === process.env.PASS) {
    const token = sign({ username }, process.env.PASS, {
      expiresIn: "1h",
    });
    res.status(200).send({
      status: 200,
      token,
    });
  } else res.status(401).send("Invalid credentials");
});

// Auth layer
app.use((req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    verify(token, process.env.PASS, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.status(401).send("Unauthorized Request");
  }
});

// News route
app.get("/news", async function (req, res) {
  if (!data) {
    try {
      const result = await getTrendingNews();
      let guardian = [...result[1].data.response.results];
      guardian = guardian.map((item) => ({
        title: item.webTitle,
        url: item.webUrl,
        source: "The Guardian",
      }));

      // Using JS object (Dict in Python) to create a queue of results from different sources
      data = {
        worldNYT: [...result[0].data.results],
        trendingGuardian: [...guardian],
      };
      res.status(200).send({ status: 200, data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 500, message: "Error fetching news" });
    }
  } else {
    res.status(200).json({ status: 200, data });
  }
});

// Whats hot route
app.get("/getHot", async function (req, res) {
  try {
    const data = await getHotNews();
    res.status(200).send({ status: 200, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Error fetching news" });
  }
});

// Insert to Hot news
app.post("/addHot", async function (req, res) {
  try {
    await insertHotNews(req.body.item);
    res.status(200).send({ status: 200, message: "Inserted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 500, message: "Error fetching news" });
  }
});

// Error handlers
app.use(function fourOhFourHandler(req, res) {
  res.status(404).send();
});

app.use(function fiveHundredHandler(err, req, res, next) {
  console.error(err);
  res.status(500).send();
});

// Start server
app.listen(1234, function (err) {
  if (err) {
    return console.error(err);
  }

  console.log("Started at http://localhost:1234");
});
