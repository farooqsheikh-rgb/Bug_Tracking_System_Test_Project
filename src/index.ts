import sequelize from "./helpers/database";
import { createServer } from "./utilities/server";
import dotenv from "dotenv";
dotenv.config();
const server = createServer();

const port = process.env.PORT || 5000;

server.listen(port, async () => {
  console.log(`Running on Port:${port}`);
  sequelize
    .authenticate()
    .then(async () => {
      console.log("Database Connected!");
      try {
        await sequelize.sync({ force: true });
      } catch (e: any) {
        console.log(e.message);
      }
    })
    .catch((e) => {
      console.log(e.message);
    });
});
