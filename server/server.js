import bodyParser from "body-parser";
import compression from "compression";
import express from "express";
import morgan from "morgan";
import path from "path";
import forceDomain from "forcedomain";
import Loadable from "react-loadable";
import cookieParser from "cookie-parser";

import loader from "./loader";
import api from "./api";

const app = express();
const PORT = process.env.PORT || 3000;

// if (process.env.NODE_ENV === 'production') {
//   app.use(
//     forceDomain({
//       hostname: 'www.perform.org.nz',
//       protocol: 'https'
//     })
//   );
// }
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/api", api);
app.use(express.Router().get("/", loader));
app.use(express.static(path.resolve(__dirname, "../build")));
app.use(loader);
Loadable.preloadAll().then(() => {
  app.listen(PORT, console.log(`App listening on port ${PORT}!`));
});

app.on("error", error => {
  console.log(error);
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
});
