require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const exphbs = require("express-handlebars");
const path = require("path")
const port = process.env.PORT || 8080;
const app = express();
const routes = require("./controllers/burgers_controller")


app.use('/static', express.static(path.join(__dirname, './public')));

app.use(bodyParser.urlencoded({ extended: false}));
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");
app.use("/", routes);


app.listen(port, ()=>{
    console.log(`App listening on PORT: ${port}`);
});