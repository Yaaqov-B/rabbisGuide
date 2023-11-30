import express from "express";
import cors from "cors";
// import "./loadEnvironment.mjs";
import records from "./routes/record.mjs";
// const os = require('os');
// const hostname = os.hostname();
// console.log(`Hostname: ${hostname}`);

const PORT = process.env.NODEJS_PORT || 5050;
console.log(`Port: ${PORT}`);
// const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/record", records);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
