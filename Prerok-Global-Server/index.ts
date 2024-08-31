require("dotenv").config();
const app = require("./app");
const port = process.env.PORT || 5003;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
