const express = require("express");
const newsRouter = express.Router(); //to serve the external connection of modules
const axios = require("axios");
newsRouter.get("/:id", async (req, res) => {
  let articleid = req.params.id;
  try {
    const newsAPI = await axios.get(`https://raddy.co.uk/wp-json/wp/v2/posts/${articleid}`);
    res.render("newsingle", { article: newsAPI.data });
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
module.exports=newsRouter;
