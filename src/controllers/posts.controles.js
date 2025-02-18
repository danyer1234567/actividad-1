const { posts, users } = require("../database/database");
const { v4: uuidv4 } = require("uuid");

// Funcion para verificar que siempre este los datos necesarios de la base de datos
function verifyData(post) {
  if (!post.user || !post.title || !post.description || !post.url_media) {
    return true;
  } else {
    return false;
  }
}

// Funcion para verificar que el url sea multimedia
function verifyMedia(post) {
  if (
    !post.url_media.endsWith(".gif") &&
    !post.url_media.endsWith(".png") &&
    !post.url_media.endsWith(".jpg") &&
    !post.url_media.endsWith(".jpeg") &&
    !post.url_media.endsWith(".mp3")
  ) {
    return true;
  } else {
    return false;
  }
}

// Funcion para saber si existe el usuario
function verifyUserDB(user) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].user === user) {
      return true;
    }
  }
  return false;
}

// Funcion para saber si existe el post
function verifyPostDB(id) {
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].id === id) {
      return true;
    }
  }
  return false;
}

// Funcion para verificar que el usuario sea el dueño del post
function verifyuserPost(post) {
  for (let i = 0; i < posts.length; i++) {
    if (posts[i].user === post.user) {
      return false;
    }
  }
  return true;
}

class postsControllers {
  // Metodo para crear publicaciones
  async add(post) {
    return new Promise(async (resolve, reject) => {
      try {
        // Verificamos que vengan los datos requeridos
        if (verifyData(post)) {
          return reject("Faltan propiedades dentro del body");
        }

        // Verificamos que la url media sea validad
        if (verifyMedia(post)) {
          return reject("La url no tiene formato multimedia permitido");
        }

        // Verificamos que el usuario exista
        if (!verifyUserDB(post.user)) {
          return reject("El usuario que publica no existe");
        }

        // Creamos el post
        const newPost = {
          id: uuidv4(),
          user: post.user,
          title: post.title,
          description: post.description,
          url_media: post.url_media,
          comments: [],
        };

        // Agregamos a la base de datos y retornamos a la ruta
        posts.push(newPost);
        return resolve(posts);
      } catch (error) {
        return reject(error);
      }
    });
  }

  // Metodo para editar publicaciones
  async edit(post, id) {
    return new Promise(async (resolve, reject) => {
      try {
        // Verificamos que vengan los datos requeridos
        if (verifyData(post)) {
          return reject("Faltan propiedades dentro del body");
        }

        // Verificamos que la url media sea validad
        if (verifyMedia(post)) {
          return reject("La url no tiene formato multimedia permitido");
        }

        // Verificamos que el usuario sea el dueño del post
        if (verifyuserPost(post)) {
          return reject("No eres el dueño del post");
        }

        // Editamos el post
        for (let i = 0; i < posts.length; i++) {
          if (posts[i].id === id) {
            posts[i].title = post.title;
            posts[i].description = post.description;
            posts[i].url_media = post.url_media;
            console.log(posts[i]);
            return resolve(posts[i]);
          }
        }
        return reject("No existe la publicación");
      } catch (error) {
        return reject(error);
      }
    });
  }

  // Metodo para agregar comentarios a una publicacion
  async comment(comment, id) {
    return new Promise(async (resolve, reject) => {
      try {
        // Verificamos que tenga las propiedades necesarias
        if (!comment.text || !comment.user) {
          return reject("Faltan propiedades en el body");
        }

        // Verificamos que exista el usuario
        if (!verifyUserDB(comment.user)) {
          return reject("El usuario que comenta no existe");
        }

        // Verificamos que exista el post
        if (!verifyPostDB(id)) {
          return reject("La publicación no existe");
        }

        for (let i = 0; i < posts.length; i++) {
          if (posts[i].id === id) {
            posts[i].comments.push(comment);
            return resolve(posts[i]);
          }
        }
      } catch (error) {
        return reject(error);
      }
    });
  }

  // Metodo para Mostrar comentarios a una publicacion
  async getComment(id) {
    return new Promise(async (resolve, reject) => {
      try {
        // Verificamos que exista el post
        if (!verifyPostDB(id)) {
          return reject("La publicación no existe");
        }

        for (let i = 0; i < posts.length; i++) {
          if (posts[i].id === id) {
            return resolve(posts[i].comments);
          }
        }
      } catch (error) {
        return reject(error);
      }
    });
  }

  // Metodo para eliminar una publicacion
  async delete(post, id) {
    return new Promise(async (resolve, reject) => {
      try {
        // Verificamos que exista el post
        if (!verifyPostDB(id)) {
          return reject("La publicación no existe");
        }

        // Verificamos que el usuario sea el dueño del post
        if (verifyuserPost(post)) {
          return reject("No eres el dueño de la publicación");
        }

        for (let i = 0; i < posts.length; i++) {
          if (posts[i].id === id) {
            posts.splice(i, 1);
            return resolve("Se eliminó la publicación")
          }
        }
      } catch (error) {
        return reject(error);
      }
    });
  }
}

module.exports = new postsControllers();
