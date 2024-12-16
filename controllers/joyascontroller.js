const {
  obtenerjoyas,
  Hateoas,
  obtenerJoya,
  obtenerJoyasPorFiltros,
} = require("../mdels/joyasModel.js");

const getJoyasController = async (req, res) => {
  try {
    const queryStrings = req.query;
    const joyas = await obtenerjoyas(queryStrings);
    const formatHateoas = await Hateoas(joyas);
    res.status(200).json(formatHateoas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJoyaController = async (req, res) => {
  try {
    const { id } = req.params;
    const joya = await obtenerJoya(id);
    res.status(200).json(joya);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getJoyasFiltrosController = async (req, res) => {
  try {
    const queryStrings = req.query;
    const joyas = await obtenerJoyasPorFiltros(queryStrings);
    res.status(200).json(joyas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getJoyasController,
  getJoyaController,
  getJoyasFiltrosController,
};
