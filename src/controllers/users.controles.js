const { users, posts, friends } = require("../database/database");

// Funcion para verificar que siempre este los datos necesarios de la base de datos
function verifyData(user) {
  if (
    !user.user ||
    !user.name ||
    !user.lastname ||
    !user.password ||
    !user.sex ||
    !user.email
  ) {
    return true;
  } else {
    return false;
  }
}

// Funcion validar email
function verifyEmail(email) {
  emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
  if (emailRegex.test(email)) {
    return true;
  } else {
    return false;
  }
}

// Funcion para saber si existe el usuario
function verifyUserDB(user) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].user === user) {
      return false;
    }
  }
  return true;
}

class usersControllers {
  // Metodo para registrar usuarios
  async register(user) {
    return new Promise(async (resolve, reject) => {
      try {
        if (verifyData(user)) {
          return reject("Faltan propiedades dentro del body");
        }

        // Verificamos que no se repitan los usuarios en la base de datos
        for (let i = 0; i < users.length; i++) {
          if (users[i].user === user.user) {
            return reject("Ya existe el usuario en Regedit");
          }
        }

        // Verficiamos que las contraseñas coincidan
        if (user.password != user.passwordConfirm || !user.passwordConfirm) {
          return reject("Las contraseñas no coinciden");
        }

        // Verificamos que el email sea valido
        if (!verifyEmail(user.email)) {
          return reject("El email no es valido");
        }

        // Creamos el usuario que se agregara a la base de datos
        const newUser = {
          user: user.user,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          sex: user.sex,
          password: user.password,
        };

        // Agregamos el nuevo usuario a la base de datos
        users.push(newUser);

        // Respondemos el usuario creado a la ruta
        return resolve(newUser);
      } catch (error) {
        return reject(error);
      }
    });
  }

  // Metodo para editar usuarios
  async edit(user) {
    return new Promise(async (resolve, reject) => {
      try {
        if (verifyData(user)) {
          return reject("Faltan propiedades dentro del body");
        }

        // Verficiamos que las contraseñas coincidan
        if (user.password != user.passwordConfirm || !user.passwordConfirm) {
          return reject("Las contraseñas no coinciden");
        }

        // Verificamos que el email sea valido
        if (!verifyEmail(user.email)) {
          return reject("El email no es valido");
        }

        // Creamos el usuario que se editara en la base de datos
        const newUser = {
          user: user.user,
          name: user.name,
          lastname: user.lastname,
          email: user.email,
          sex: user.sex,
          password: user.password,
        };

        // Editamos el usuario en la base de datos
        for (let i = 0; i < users.length; i++) {
          if (users[i].user === user.user) {
            users[i] = newUser;
            // Respondemos el usuario editado a la ruta
            return resolve(newUser);
          }
        }

        // No existe el usuario
        return reject("No existe el usuario");
      } catch (error) {
        return reject(error);
      }
    });
  }

  // Metodo para registrar usuarios
  async posts(user) {
    return new Promise(async (resolve, reject) => {
      try {
        // Verificamos que exista el usuario
        let next = false;
        for (let i = 0; i < users.length; i++) {
          if (users[i].user === user) {
            next = true;
          }
        }
        if (!next) {
          return reject("No existe el usuario");
        }

        // Buscamos las publicaciones del usuario y retornamos
        let postsUser = [];
        for (let i = 0; i < posts.length; i++) {
          if (posts[i].user === user) {
            postsUser.push(posts[i]);
          }
        }
        return resolve(postsUser);
      } catch (error) {
        return reject(error);
      }
    });
  }

  // Metodo para registrar usuarios
  async feed(user) {
    return new Promise(async (resolve, reject) => {
      try {
        // Verificamos si existe el usuario
        if (verifyUserDB(user)) {
          return reject("No existe el usuario");
        }

        // Extraer todos mis amigos
        let myFriends = [];
        for (let i = 0; i < friends.length; i++) {
          if (friends[i].send === user && friends[i].status === true) {
            myFriends.push(friends[i].recive);
          } else {
            if (friends[i].recive === user && friends[i].status === true) {
              myFriends.push(friends[i].send);
            }
          }
        }

        //Cargamos todas las publicaciones de mis amigos
        let feed = [];
        let guia = posts.length - 1
        let one = true
        for (let i = 0; i < myFriends.length; i++) {
          one = true
          for (let j = guia; j > 0; j--) {
            if (one) {
              if (posts[j].user === myFriends[i]) {
                feed.push(posts[j]);
                one = false
              }
            }
          }
        }

        return resolve(feed)
      } catch (error) {
        return reject(error);
      }
    });
  }

    // Metodo para Eliminar usuarios
    async delete(user) {
      return new Promise(async (resolve, reject) => {
        try {
          // Verificamos si existe el usuario
          if (verifyUserDB(user)) {
            return reject("No existe el usuario");
          }
  
          // Eliminamos todas las relaciones de amigos
          for (let i = 0; i < friends.length; i++) {
            if (friends[i].recive === user || friends[i].send === user) {
              friends.splice(i, 1);
              i = i - 1
            }
          }

          // Eliminamos todas las publicaciones
          for (let i = 0; i < posts.length; i++) {
            if (posts[i].user === user) {
              posts.splice(i, 1);
              i = i - 1
            }
          }

          // Eliminamos al usuario
          for (let i = 0; i < users.length; i++) {
            if (users[i].user === user) {
              users.splice(i, 1);
              i = i - 1
            }
          }

          return resolve("El usuario " + user + " ha sido eliminado")
        } catch (error) {
          return reject(error);
        }
      });
    }
}

module.exports = new usersControllers();
