import app from "./app";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(
    `Server listening on port ${PORT}! Welcome to the Medical Service Restful API!`
  );
  console.log(
    `Here you have access to the swagger docs: http://localhost:3000/api-docs`
  );
});
