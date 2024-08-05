const express = require("express");
const assetController = require("../controllers/asset.controller");
const router = express.Router();

router.get("/", assetController.getAssets);
router.post("/add", assetController.addAsset);
router.put("/:id", assetController.updateAsset);
router.delete("/:id", assetController.deleteAsset);

module.exports = router;
