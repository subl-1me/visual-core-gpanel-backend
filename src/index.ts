import Server from "./server";

function main(args?: string[]): void {
  // run server
  console.log("Starting server...");
  try {
    Server.start();
  } catch (error) {
    console.error(error);
  }

  //TODO: Try again

  // handle process exit
  process.on("SIGINT", () => {
    console.log("Shutting down server...");
    process.exit(0);
  });
}

main();
