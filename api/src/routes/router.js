// const express = require('express');
// const router = express.Router();

// const conection = require('../database/db');

// router.get('/users', (req, res) => {
//     conection.query('SELECT * FROM Table_users', (error, results) => {
//         if(error) {
//             throw error;
//         } else {
//             res.render('index', {results:results})
//         }
//     })
// })

// //Ruta para crear registros
// router.get('/create', (req, res)=> {
//     res.render('create');
// })

// //Ruta para editar registros
// router.get('/edit/:id', (req, res)=> {
//     const id = req.params.id
//     conection.query('SELECT * FROM users WHERE id=?', [id], (error, results)=> {
//         if(error) {
//             throw error;
//         } else {
//             res.render('edit', {user:results[0]})
//         }
//     })
// })

// const crud = require('../controllers/crud')
// router.post('save', crud.save)

// module.exports = router;