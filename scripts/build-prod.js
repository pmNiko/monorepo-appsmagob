const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const projectsDir = path.resolve(__dirname, "../projects");
const distProductionDir = path.resolve(__dirname, "../dist-production");
const supportDir = path.resolve(__dirname, "../support");

try {
  // Crear directorio `dist-production` si no existe
  if (!fs.existsSync(distProductionDir)) {
    fs.mkdirSync(distProductionDir, { recursive: true });
  }

  // Copiar el directorio `support` a `dist-production`
  const supportDist = path.join(distProductionDir, "support");
  if (fs.existsSync(supportDist)) {
    fs.rmSync(supportDist, { recursive: true, force: true });
  }
  fs.cpSync(supportDir, supportDist, { recursive: true });
  console.log(`Copied support directory to ${supportDist}`);

  // Leer todos los directorios en `projects`
  const projects = fs.readdirSync(projectsDir).filter((dir) => {
    const projectPath = path.join(projectsDir, dir);
    return fs.statSync(projectPath).isDirectory();
  });

  if (projects.length === 0) {
    console.error("No projects found in the `projects` directory.");
    process.exit(1);
  }

  // Construir cada proyecto y colocar el distribuible en `dist-production`
  projects.forEach((project) => {
    const projectPath = path.join(projectsDir, project);
    const projectDist = path.join(distProductionDir, project);

    console.log(`Building project: ${project} in production mode...`);
    try {
      // Ejecutar el comando de construcción definido en el proyecto
      execSync(`pnpm --filter ${project} prod`, {
        stdio: "inherit",
      });

      // Validar si el directorio generado existe
      const generatedDist = path.join(projectPath, `dist-production`);
      if (!fs.existsSync(generatedDist)) {
        console.error(`Expected directory ${generatedDist} not found.`);
        process.exit(1);
      }

      // Mover distribuibles al directorio `dist-production/<project>`
      if (fs.existsSync(projectDist)) {
        fs.rmSync(projectDist, { recursive: true, force: true });
      }
      fs.renameSync(generatedDist, projectDist);
      console.log(`Moved ${project} build to ${projectDist}`);
    } catch (error) {
      console.error(`Failed to build project: ${project}`);
      console.error(`Error message: ${error.message}`);
      console.error(`Error output: ${error.stderr?.toString() || "No stderr"}`);
      process.exit(1);
    }
  });

  console.log(
    "All projects and support files are stored in `dist-production` successfully!"
  );
} catch (error) {
  console.error("An error occurred:", error);
  process.exit(1);
}
