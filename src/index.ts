import App from './app';
import { FavoriteControllerV1, ProfileControllerV1, SimulatorControllerV1 } from '@v1/index';

const server = new App([FavoriteControllerV1, ProfileControllerV1, SimulatorControllerV1]);

(async () => {
  await server.initServerWithDB();
})();

const gracefulShutdown = async () => {
  try {
    await server.stopWebServer();
    await App.closeDB();

    console.log(`Process ${process.pid} received a graceful shutdown signal`);
    process.exit(0);
  } catch (error) {
    console.log(`graceful shutdown Process ${process.pid} got failed!`);
    process.exit(1);
  }
};

process.on('SIGTERM', gracefulShutdown).on('SIGINT', gracefulShutdown);
