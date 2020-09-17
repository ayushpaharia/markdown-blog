"use strict";

var express = require("express");

var articleRouter = require("./routes/articles");

var Article = require("./models/article");

var mongoose = require("mongoose");

var app = express();

var methodOverride = require("method-override");

require("dotenv").config();

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});
app.set("view engine", "ejs");
app.use(express.urlencoded({
  extended: false
}));
app.use(methodOverride("_method"));
app.get("/", function _callee(req, res) {
  var articles;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Article.find().sort({
            createdAt: "desc"
          }));

        case 2:
          articles = _context.sent;
          res.render("articles/index", {
            articles: articles
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
var PORT = process.env.PORT || 5000;
app.use("/articles", articleRouter);
app.listen(PORT);