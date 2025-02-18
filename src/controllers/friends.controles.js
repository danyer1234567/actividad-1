const { users, friends } = require("../database/database");
const { v4: uuidv4 } = require("uuid");

// Funcion para saber si existe el usuario
function verifyUserDB(user) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].user === user) {
      return true;
    }
  }
  return false;
}

// Funcion para verificar las variantes para enviar solicitudes
function verifySoli(user, friend) {
  for (let i = 0; i < friends.length; i++) {
    if (
      friends[i].send === user &&
      friends[i].recive === friend &&
      friends[i].status === true
    ) {
      return 1;
    }
    if (
      friends[i].send === friend &&
      friends[i].recive === user &&
      friends[i].status === true
    ) {
      return 1;
    }
    if (friends[i].send === user && friends[i].recive === friend) {
      return 2;
    }
    if (friends[i].send === friend && friends[i].recive === user) {
      return 3;
    }
  }
}

// Función para verificar que exista la solicitud de amistad
function verifySoliSend(id) {
  for (let i = 0; i < friends.length; i++) {
    if (friends[i].id === id) {
      return {
        error: false,
        soli: friends[i],
      };
    }
  }
  return {
    error: true,
  };
}

class friendsControllers {
  // Metodo para evniar solicitudes de amistad a usuarios
  async send(user, friend) {
    return new Promise(async (resolve, reject) => {
      try {
        // Verificamos que el usuario exista
        if (!verifyUserDB(user)) {
          return reject("El usuario no existe");
        }

        // Verificamos que el futuro amigo exista
        if (!verifyUserDB(friend)) {
          return reject("El usuario que quieres enviar la solicitud no existe");
        }

        // Verificamos que el usuario no tenga solicitus de su futuro amigo y que tampoco repita la solicitud
        let caso = verifySoli(user, friend);
        if (caso === 1) {
          return reject("Usted y el usuario " + friend + " ya son amigos");
        }
        if (caso === 2) {
          return reject("Usted ya le envio un solicitud de amista a " + friend);
        }
        if (caso === 3) {
          return reject(
            "El usuario " +
              friend +
              " ya te envio una solicitud de amistad debes aceptarla"
          );
        }

        // Creamos la solicitud de Amistad y agregarmos a la base de datos
        let newSoli = {
          id: uuidv4(),
          send: user,
          recive: friend,
          status: false,
        };
        friends.push(newSoli);
        return resolve(newSoli);
      } catch (error) {
        return reject(error);
      }
    });
  }

  // Metodo para aceptar solicitudes de amistad
  async accept(user, id) {
    return new Promise(async (resolve, reject) => {
      try {
        // Verificamos que el usuario exista
        if (!verifyUserDB(user)) {
          return reject("El usuario no existe");
        }

        // Verificamos que exista la solicitud
        let caso = verifySoliSend(id);
        if (caso.error) {
          return reject("No exista esta solicitud de amistad");
        }

        // Verificamos que sea valido aceptar la solicitud
        if (caso.soli.recive === user && caso.soli.status === false) {
          for (let i = 0; i < friends.length; i++) {
            if (friends[i].id === id) {
              friends[i].status = true;
              return resolve("Has aceptado la solicitud de amistad");
            }
          }
        }
        return reject("No se permite realizar esta acción");
      } catch (error) {
        return reject(error);
      }
    });
  }

  // Metodo para eliminar solicitudes de amistad
  async delete(user, id) {
    return new Promise(async (resolve, reject) => {
      try {
        // Verificamos que exista la solicitud
        let caso = verifySoliSend(id);
        if (caso.error) {
          return reject("No exista esta relación de amistad");
        }

        for (let i = 0; i < friends.length; i++) {
          if (friends[i].id === id) {
            if (friends[i].send === user || friends[i].recive === user) {
              friends.splice(i, 1)
              return resolve("Se ha eliminado la relacion de amigos exitosamente")
            }
          }
        }
        return reject("No se permite realizar esta acción");
      } catch (error) {
        return reject(error);
      }
    });
  }
}

module.exports = new friendsControllers();
