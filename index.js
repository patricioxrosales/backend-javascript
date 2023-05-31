const express = require("express");

const app = express();

require("./base-orm/sqlite-init");

app.use(express.json());

