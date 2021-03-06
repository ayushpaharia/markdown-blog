const express = require("express");
const articleRouter = require("./routes/articles");
const Article = require("./models/article");
const mongoose = require("mongoose");
const app = express();
const methodOverride = require("method-override");

mongoose.connect(
  "mongodb+srv://admin:t0Fjs1BHUn15cZct@cluster0.5qwzr.mongodb.net/Cluster0?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  }
);

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
