//Author: Dhruvin Dankhara

const { Router } = require("express");
const isAuth = require("../middleware/auth");
const router = Router();

//Subscription
router.post("/post", isAuth, postComment);
router.get("/", isAuth, getComments);


module.exports = router;
