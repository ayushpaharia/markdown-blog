const express = require("express");
const articleRouter = require("./routes/articles");
const Article = require("./models/article");
const mongoose = require("mongoose");
const DATABASE_URL = require("config");
const app = express();
const methodOverride = require("method-override");
require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles });
});
const PORT = process.env.PORT || 5000;

app.use("/articles", articleRouter);

app.listen(PORT);