const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const projectsDir = path.resolve(__dirname, "../projects");
const distStagingDir = path.resolve(__dirname, "../dist-staging");
const supportDir = path.resolve(__dirname, "../support");

try {
  // Crear directorio `dist-staging` si no existe
  if (!fs.existsSync(distStagingDir)) {
    fs.mkdirSync(distStagingDir, { recursive: true });
  }

  // Copiar el directorio `support` a `dist-staging`
  const supportDist = path.join(distStagingDir, "support");
  if (fs.existsSync(supportDist)) {
    fs.rmSync(supportDist, { recursive: true, force: true }); // Limpiar destino previo
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

  // Construir cada proyecto y colocar el distribuible en `dist-staging`
  projects.forEach((project) => {
    const projectPath = path.join(projectsDir, project);
    const projectDist = path.join(distStagingDir, project);

    console.log(`Building project: ${project} in staging mode...`);
    try {
      // Ejecutar el comando de construcción con Vite
      execSync(`pnpm --filter ${project} build --mode staging`, {
        stdio: "inherit",
      });

      // Mover distribuibles al directorio `dist-staging/<project>`
      if (fs.existsSync(projectDist)) {
        fs.rmSync(projectDist, { recursive: true, force: true }); // Limpiar destino previo
      }
      fs.renameSync(path.join(projectPath, `dist-staging`), projectDist);
      console.log(`Moved ${project} build to ${projectDist}`);
    } catch (error) {
      console.error(`Failed to build project: ${project}`);
      process.exit(1);
    }
  });

  console.log(
    "All projects and support files are stored in `dist-staging` successfully!"
  );
} catch (error) {
  console.error("An error occurred:", error);
  process.exit(1);
}
