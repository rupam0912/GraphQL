const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

//allowing cross-origin requests
app.use(cors());

//connect to mLab server - need to provide db name after cluster/
//mongo atlas will not let admin db to be tempered
mongoose.connect(
  "mongodb+srv://rupam0912:0EtC5jMu7Ulxbctc@cluster0.b96sw1c.mongodb.net/graphQL-db?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

// bind express with graphql
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("now listening for requests on port 4000");
});
