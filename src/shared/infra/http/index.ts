import { SetupServer } from './server';

enum ExitStatus {
  Failure = 1,
  Success = 0,
}

process.on('unhandledRejection', (reason, promise) => {
  console.error(
    `App exiting due to an unhandled promise: ${promise} and reason: ${reason}`,
  );

  throw reason;
});

process.on('uncaughtException', error => {
  console.error(`App exiting due to an unaught exepition: ${error}`);
  process.exit(ExitStatus.Failure);
});

(async (): Promise<void> => {
  try {
    const server = new SetupServer(3333);
    await server.init();
    await server.start();

    const exitSignal: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    exitSignal.map(sig =>
      process.on(sig, async () => {
        try {
          await server.close();
          console.info('App exited with success');
          process.exit(ExitStatus.Success);
        } catch (error) {
          console.error(`App exited with error: ${error}`);
          process.exit(ExitStatus.Failure);
        }
      }),
    );
  } catch (error) {
    console.error(`App exited with error: ${error}`);
    process.exit(ExitStatus.Failure);
  }
})();
