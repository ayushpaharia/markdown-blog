"use strict";

var express = require("express");

var Article = require("./../models/article");

var router = express.Router();
router.get("/new", function (req, res) {
  res.render("articles/new", {
    article: new Article()
  });
});
router.get("/edit/:id", function _callee(req, res) {
  var article;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Article.findById(req.params.id));

        case 2:
          article = _context.sent;
          res.render("articles/edit", {
            article: article
          });

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.get("/:slug", function _callee2(req, res) {
  var article;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(Article.findOne({
            slug: req.params.slug
          }));

        case 2:
          article = _context2.sent;
          if (article == null) res.redirect("/");
          res.render("articles/show", {
            article: article
          });

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.post("/", function _callee3(req, res, next) {
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          req.article = new Article();
          next();

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
}, saveArticleAndRedirect("new"));
router.put("/:id", function _callee4(req, res, next) {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(Article.findById(req.params.id));

        case 2:
          req.article = _context4.sent;
          next();

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}, saveArticleAndRedirect("edit"));
router["delete"]("/:id", function _callee5(req, res) {
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(Article.findByIdAndDelete(req.params.id));

        case 2:
          res.redirect("/");

        case 3:
        case "end":
          return _context5.stop();
      }
    }
  });
});

function saveArticleAndRedirect(path) {
  return function _callee6(req, res) {
    var article;
    return regeneratorRuntime.async(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            article = req.article;
            article.title = req.body.title;
            article.description = req.body.description;
            article.markdown = req.body.markdown;
            _context6.prev = 4;
            _context6.next = 7;
            return regeneratorRuntime.awrap(article.save());

          case 7:
            article = _context6.sent;
            res.redirect("/articles/".concat(article.slug));
            _context6.next = 14;
            break;

          case 11:
            _context6.prev = 11;
            _context6.t0 = _context6["catch"](4);
            res.render("articles/".concat(path), {
              article: article
            });

          case 14:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, [[4, 11]]);
  };
}

module.exports = router;