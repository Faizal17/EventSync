//Author: Dhruvin Dankhara

const { Router } = require("express");
const isAuth = require("../middleware/auth");
const router = Router();

//Subscription
router.post("/rate", isAuth, postRating);
router.get("/", isAuth, getRating);


module.exports = router;
