const app = require("./app");

const PORT = 3000;

app.listen(PORT, (err) => {
  if (err) {
    return console.log("Something bad happened", err);
  }
  console.log(`Server is listening on ${PORT}`);
});