const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

// Obtener la bandera de la línea de comandos
const args = process.argv.slice(2);
let environment = "prod"; // Valor predeterminado

if (args.includes("-p")) {
  environment = "prod";
} else if (args.includes("-s")) {
  environment = "staging";
} else {
  console.error(
    "Debe especificar una bandera: -p para producción o -s para staging."
  );
  process.exit(1);
}

console.log(`Building projects for environment: ${environment.toUpperCase()}`);

const projectsDir = path.resolve(__dirname, "../projects");
const distDir = path.resolve(__dirname, "../dist");
const maintenanceDir = path.resolve(__dirname, "../maintenance");

try {
  // Crear directorio `dist-production` si no existe
  if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
  }

  // Copiar el directorio `maintenance` a `dist`
  const maintenanceDist = path.join(distDir, "maintenance");
  if (fs.existsSync(maintenanceDist)) {
    fs.rmSync(maintenanceDist, { recursive: true, force: true });
  }
  fs.cpSync(maintenanceDir, maintenanceDist, { recursive: true });
  console.log(`Copied maintenance directory to ${maintenanceDist}`);

  // Leer todos los directorios en `projects`
  const projects = fs.readdirSync(projectsDir).filter((dir) => {
    const projectPath = path.join(projectsDir, dir);
    return fs.statSync(projectPath).isDirectory();
  });

  if (projects.length === 0) {
    console.error("No projects found in the `projects` directory.");
    process.exit(1);
  }

  // Construir cada proyecto y colocar el distribuible en `dist`
  projects.forEach((project) => {
    const projectPath = path.join(projectsDir, project);
    const projectDist = path.join(distDir, project);

    console.log(`Building project: ${project} in ${environment} mode...`);
    try {
      // Ejecutar el comando de construcción con la bandera de entorno
      execSync(`pnpm --filter ${project} ${environment}`, {
        stdio: "inherit",
      });

      // Validar si el directorio generado existe
      const generatedDist = path.join(projectPath, `dist`);
      if (!fs.existsSync(generatedDist)) {
        console.error(`Expected directory ${generatedDist} not found.`);
        process.exit(1);
      }

      // Mover distribuibles al directorio `dist/<project>`
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
    "All projects and support files are stored in `dist` successfully!"
  );
} catch (error) {
  console.error("An error occurred:", error);
  process.exit(1);
}
