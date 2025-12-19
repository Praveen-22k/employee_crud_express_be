const express = require("express");
const router = express.Router();
const {
  getdata,
  createdata,
  updatedata,
  deletedata,
} = require("../controller/controller");
router.get("/", getdata);
router.post("/", createdata);
router.put("/:id", updatedata);
router.delete("/:id", deletedata);
module.exports = router;
