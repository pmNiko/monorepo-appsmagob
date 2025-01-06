# Etapa de configuración de Nginx
FROM nginx:alpine

# Copiar los archivos 'dist' generados por el script
COPY ./dist/home /usr/share/nginx/html/inicio
COPY ./dist/rentas /usr/share/nginx/html/rentas
COPY ./dist/comercio /usr/share/nginx/html/comercio
COPY ./dist/compras /usr/share/nginx/html/compras
COPY ./dist/errores /usr/share/nginx/html/errores
COPY ./dist/institucional /usr/share/nginx/html/institucional
COPY ./dist/rrhh /usr/share/nginx/html/rrhh
COPY ./dist/vivienda /usr/share/nginx/html/vivienda
COPY ./dist/maintenance /usr/share/nginx/html/support

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]