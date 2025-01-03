const { execSync } = require("child_process");

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error(
    "Please specify a project name, e.g., `pnpm start institucional`"
  );
  process.exit(1);
}

const project = args[0];
console.log(`Starting project: ${project}`);
try {
  execSync(`pnpm --filter ${project} dev`, { stdio: "inherit" });
} catch (error) {
  console.error(`Failed to start project: ${project}`);
  process.exit(1);
}
