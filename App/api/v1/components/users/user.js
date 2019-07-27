const db = require('../../../../../config/database');
const sequelize = db.sequelize;

const create = async (body) => {
    const query = `INSERT INTO usuario (nombre_usuario, email, unidad, tipo_usuario) VALUES
    ('${body.nombre_usuario}', '${body.email}', '${body.unidad}', '${body.tipo_usuario}')`;

    await sequelize.query(query);
}

const get = async (id) => {
    const query = `SELECT * FROM usuario WHERE usuario.nombre_usuario = '${id}'`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data;
}

const getAll = async () => {
    const query = `SELECT * FROM usuario`;

    let data = await sequelize.query(query);
    data = JSON.parse(JSON.stringify(data[0]));

    return data;
}

const update = async (id, body) => {
    const query = `UPDATE usuario SET nombre_usuario = '${body.nombre_usuario}',
        email = '${body.email}', unidad = '${body.unidad}', tipo_usuario = '${body.tipo_usuario}'
        WHERE nombre_usuario = '${id}'`;

    let res = await sequelize.query(query);
    return res[0].info;
}

const remove = async (id) => {
    const query = `DELETE FROM usuario WHERE nombre_usuario = '${id}'`;

    let res = await sequelize.query(query);
    return res[0].affecterRows;
}

const isAdmin = async (id) => {
    let user = await get(id);
    if (!user) {
        return false;
    }
    return user.tipo_usuario == 1;
}

const isAux = async (id) => {
    let user = await get(id);
    if (!user) {
        return false;
    }
    return user.tipo_usuario == 2;
}

module.exports = {
    create,
    get,
    getAll,
    update,
    remove,
    isAdmin,
    isAux
}