const express   = require("express");
const router    = express.Router();
const controller = require("../controllers/joyascontroller.js");

router.get("/joyas", controller.getJoyasController);
router.get("/joya/:id", controller.getJoyaController);
router.get("/joyas/filtros", controller.getJoyasFiltrosController);

module.exports = router;