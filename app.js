const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const swaggerUI = require("swagger-ui-express");
const swaggerJSON = require("./docs/swagger/swagger.json");
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// accept request in form or JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON));
app.set('view engine', 'ejs');

const db = require("./app/models");
db.client.sync();

require("./app/routes/player.routes")(app);

app.get('/', (req,res) => {
   res.render('home'); 
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
