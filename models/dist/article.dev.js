"use strict";

var mongoose = require("mongoose");

var marked = require("marked");

var slugify = require("slugify");

var createDomPurify = require("dompurify");

var _require = require("jsdom"),
    JSDOM = _require.JSDOM;

var dompurify = createDomPurify(new JSDOM().window);
var articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  markdown: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    "default": Date.now
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  sanitizedHtml: {
    type: String,
    required: true
  },
  admin: {
    type: String,
    required: true,
    "default": "false"
  }
});
articleSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true
    });
  }

  if (this.markdown) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdown));
  }

  next();
});
module.exports = mongoose.model("Article", articleSchema);