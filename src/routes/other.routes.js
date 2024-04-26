const express = require("express");
const router = express.Router();

const { home, search, aboutUs } = require("../controllers/other");

router.get("/", home);
router.get("/home", (req, res) => res.redirect("/"));
router.get("/resultados", search);

router.get("/sobre-nosotros", aboutUs);

module.exports = router;
