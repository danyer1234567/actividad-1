const express = require('express');
const router = express.Router();
const postsControllers = require("../controllers/posts.controles");


// Ruta para registrar publicaciones
router.post("/add", function (req, res, next) {
    postsControllers
    .add(req.body)
    .then((resultado) => {
      res.status(201).json({
        new_post: resultado,
        menssage: "Publicación subida con éxito",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

// Ruta para editar publicaciones
router.put("/edit/:id", function (req, res, next) {
    postsControllers
    .edit(req.body, req.params.id)
    .then((resultado) => {
      res.status(200).json({
        post_edit: resultado,
        menssage: "Publicación editada con éxito",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

// Ruta para comentar publicaciones
router.post("/add/comment/:id", function (req, res, next) {
    postsControllers
    .comment(req.body, req.params.id)
    .then((resultado) => {
      res.status(201).json({
        new_comment: resultado,
        menssage: "Publicación subida con éxito",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

// Ruta para ver los comentarios de una publicaciones
router.get("/get/comment/:id", function (req, res, next) {
    postsControllers
    .getComment(req.params.id)
    .then((resultado) => {
      res.status(201).json({
        post: req.params.id,
        comments: resultado,
        menssage: "Comentarios de la publicación",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

// Ruta para eliminar publicaciones
router.delete("/delete/:id", function (req, res, next) {
    postsControllers
    .delete(req.body, req.params.id)
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
