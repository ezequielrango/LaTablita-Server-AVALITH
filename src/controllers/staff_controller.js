const mysqlConnection = require('../database/database');

const getAll = async (req,res) => {
    mysqlConnection.query("SELECT s.Name AS 'Nombre', p.Name AS 'Cargo'  FROM staff s LEFT JOIN position p ON s.position_id = p.id ;", (err, rows , fields) => {
        try {
            if (rows.length == 0) {
                res.status(404).json('Not Found');
            }else{
                res.status(200).json(rows);
            }
        } catch (err) {
            res.status(500).json('Internal Server Error')
        };
    })
};

const getById = async (req,res) => {
    const {id} = req.params;
    mysqlConnection.query("SELECT * FROM staff WHERE id= ?;", id, (err,rows,fields) => {
        try {
            if (!rows) {
                res.status(404).json('Not found');
            }else{
                res.status(200).json(rows);
            };
        } catch (err) {
            res.status(500).json('Internal Server Error')
        };
    });
};

module.exports = {
    getAll,
    getById
};