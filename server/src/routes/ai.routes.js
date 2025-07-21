let express = require("express");
const aiController = require("../controllers/aiController");

const router = express.Router();

router.post("/get-review", aiController.getReview);

module.exports = router;
