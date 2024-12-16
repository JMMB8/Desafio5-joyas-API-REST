const { pool } = require("../db.js");

const format = require("pg-format");

const obtenerjoyas = async ({ limits = 10, order_by = "id_ASC", page = 1 }) => {
  const [campo, direccion] = order_by.split("_");
  const offset = (page - 1) * limits;

  const formattedQuery = format(
    "SELECT * FROM inventario  ORDER  BY %s %s LIMIT %s OFFSET %s",
    campo,
    direccion,
    limits,
    offset
  );

  const { rows: inventario } = await pool.query(formattedQuery);
  return inventario;
};

const Hateoas = (data) => {
  const result = data.map((joya) => {
    return {
      name: joya.nombre,
      href: `http://localhost:3000/joyas/${joya.id}`,
    };
  });
  let count = 0;
  data.map((cantidad) => (count += cantidad.stock));

  const totalJoyas = result.length;
  const totalStock = count;
  return (formatHateoas = { totalJoyas, totalStock, result });
};

const obtenerJoya = async (id) => {
  const consulta = "SELECT * FROM inventario WHERE id = $1;";
  const value = [id];
  const { rows: joya } = await pool.query(consulta, value);
  return joya;
};

const obtenerJoyasPorFiltros = async ({
  precio_min,
  precio_max,
  categoria,
  metal,
}) => {
  let filtros = [];
  if (precio_max) filtros.push(`precio <= ${precio_max}`);
  if (precio_min) filtros.push(`precio >= ${precio_min}`);
  if (categoria) filtros.push(`categoria = '${categoria}'`);
  if (metal) filtros.push(`metal = '${metal}'`);

  let consulta = "SELECT * FROM inventario";
  if (filtros.length > 0) {
    filtros = filtros.join(" AND ");
    consulta += ` WHERE ${filtros}`;
  }
  const { rows: joyas } = await pool.query(consulta);
  return joyas;
};
module.exports = { obtenerjoyas, Hateoas, obtenerJoya, obtenerJoyasPorFiltros };
