import sequelize from "./helpers/database";
import { createServer } from "./utilities/server";

const server = createServer();

const port = process.env.PORT || 5000;

process.on("uncaughtException", (error) => {
  console.log(error);
});

server.listen(port, async () => {
  console.log(`Running on Port:${port}`);
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
  } catch (error) {
    const err = error as Error;
    console.log(err.message);
  }
});
