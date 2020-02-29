const express = require("express");
const { getPosts, createPosts } = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { createPostValidator } = require("../validator");

const router = express.Router();

router.get("/", getPosts);
router.post("/post", requireSignin, createPostValidator, createPosts);

// any route containing :userId, our app will first execure userById()
router.param("userId", userById);

module.exports = router;
