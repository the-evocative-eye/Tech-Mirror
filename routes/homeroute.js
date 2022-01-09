const express = require("express");
const homeRouter = express.Router(); //to serve the external connection of modules
const axios = require("axios");
homeRouter.get("/", async (req, res) => {
  //res.render('news');
  try {
    const newsAPI = await axios.get(`https://raddy.co.uk/wp-json/wp/v2/posts/`);
    res.render("news", { articles: newsAPI.data });
  } catch (err) {
    if (err.response) {
      res.render("news", { articles: null });
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request) {
      res.render("news", { articles: null });
      console.log(err.request);
    } else {
      res.render("news", { articles: null });
      console.error("error", err.message);
    }
  }
});
homeRouter.post("/", async (req, res) => {
  let search = req.body.search
  try {
    const newsAPI = await axios.get(`https://raddy.co.uk/wp-json/wp/v2/posts?search=${search}`);
    res.render("newSearch", { articles: newsAPI.data });
  } catch (err) {
    if (err.response) {
      res.render("newSearch", { articles: null });
      console.log(err.response.data);
      console.log(err.response.status);
      console.log(err.response.headers);
    } else if (err.request) {
      res.render("newSearch", { articles: null });
      console.log(err.request);
    } else {
      res.render("newSearch", { articles: null });
      console.error("error", err.message);
    }
  }
});
module.exports=homeRouter;
