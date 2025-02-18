const express = require("express");
const router = express.Router();
const usersControllers = require("../controllers/users.controles");

// Ruta para registrar usuarios
router.post("/register", function (req, res, next) {
  usersControllers
    .register(req.body)
    .then((resultado) => {
      res.status(201).json({
        user_register: resultado,
        menssage: "Registrado el usuario con exito",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

// Ruta para editar usuarios
router.put("/edit", function (req, res, next) {
  usersControllers
    .edit(req.body)
    .then((resultado) => {
      res.status(201).json({
        user_edit: resultado,
        menssage: "Editado el usuario con exito",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

// Ruta para ver las publicaciones de un usuarios
router.get("/posts/:user", function (req, res, next) {
  usersControllers
    .posts(req.params.user)
    .then((resultado) => {
      res.status(201).json({
        user: req.params.user,
        posts: resultado,
        menssage: "Publiaciones del usuario " + req.params.user,
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

// Ruta para ver las feed de un usuarios
router.get("/feed/:user", function (req, res, next) {
  usersControllers
    .feed(req.params.user)
    .then((resultado) => {
      res.status(201).json({
        user: req.params.user,
        feed: resultado,
        menssage: "Feed del usuario " + req.params.user,
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

// Ruta para eliminar usuarios
router.delete("/delete/:user", function (req, res, next) {
  usersControllers
    .delete(req.params.user)
    .then((resultado) => {
      res.status(201).json({
        menssage: resultado,
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

module.exports = router;
