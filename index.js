import express from 'express'
const app = express();
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
dotenv.config()

import CMSRoutes from './routes/cmsroutes.js';

// settings
app.set("port", process.env.PORT || 8000);
app.use(bodyParser.json());

// routes
app.use('/',CMSRoutes)

// listening the Server
app.listen(app.get("port"), () => {
  console.log("Server on port", app.get("port"));
});
