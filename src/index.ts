import Server from "./server";

function main(args?: string[]): void {
  // run server
  console.log("Starting server...");
  try {
    Server.start();
  } catch (error) {
    console.error("Failed to start server:", error);
  }
}

main();
