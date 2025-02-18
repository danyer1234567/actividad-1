const users = [
  {
    user: "Camilo3200",
    name: "Camilo Antonio",
    lastname: "Vargas",
    email: "camilovargas@gmail.com",
    sex: "Hombre",
    password: "12345678",
  },
  {
    user: "Andres3200",
    name: "Andres Antonio",
    lastname: "Vargas",
    email: "andresvargas@gmail.com",
    sex: "Hombre",
    password: "12345678",
  },
];
const posts = [
  {
    id: "1e9716b7-a8ad-48c0-8b05-8efd2069a7e3",
    user: "Camilo3200",
    title: "Paisaje Hermoso",
    description: "Un paisaje que gusta verlo",
    url_media:
      "https://bargainfotos.com/blog/wp-content/uploads/2022/07/beautiful-shot-of-small-lake-with-wooden-rowboat-in-focus-and-breathtaking-clouds-in-the-sky.jpg",
    comments: [],
  },
  {
    id: "1e9716b7-a8ad-48c0-8b05-8efd2069a7e3",
    user: "Camilo3200",
    title: "Paisaje Hermoso2",
    description: "Un paisaje que gusta verlo",
    url_media:
      "https://bargainfotos.com/blog/wp-content/uploads/2022/07/beautiful-shot-of-small-lake-with-wooden-rowboat-in-focus-and-breathtaking-clouds-in-the-sky.jpg",
    comments: [],
  },
];
const friends = [
  {
    id: "aa720abe-f94a-4124-af8e-6ae963aa97d1",
    send: "Camilo3200",
    recive: "Andres3200",
    status: true,
  },
];

module.exports = { users, posts, friends };
