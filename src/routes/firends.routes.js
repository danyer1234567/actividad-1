const express = require("express");
const router = express.Router();
const friendsControllers = require("../controllers/friends.controles");

// Ruta para enviar solicitudes de amistad
router.post("/send/soli/:user/:friend", function (req, res, next) {
  friendsControllers
    .send(req.params.user, req.params.friend)
    .then((resultado) => {
      res.status(201).json({
        soli_send: resultado,
        menssage: "Solicitud de amistad enviada con éxito",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

// Ruta para aceptar solicitudes de amistad
router.post("/accept/soli/:user/:id", function (req, res, next) {
  friendsControllers
    .accept(req.params.user, req.params.id)
    .then((resultado) => {
      res.status(201).json({
        soli_aceptada: resultado,
        menssage: "Aceptaste la solicitud de amistad",
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

// Ruta para eliminar solicitudes de amistad o amigos
router.delete("/delete/soli/:user/:id", function (req, res, next) {
  friendsControllers
    .delete(req.params.user, req.params.id)
    .then((resultado) => {
      res.status(200).json({
        menssage: resultado,
      });
    })
    .catch((error) => {
      res.status(400).json({ error: error });
    });
});

module.exports = router;
