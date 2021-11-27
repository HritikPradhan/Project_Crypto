const express = require('express');
const router = express.Router();

const cryptoController= require("../controllers/cryptoController")


router.get("/crypto",cryptoController.crypto)


module.exports = router;