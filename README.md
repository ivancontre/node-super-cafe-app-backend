Aplicación backend API con confguraciones iniciales

Está creada en base:

* NodeJS
* Express
* Typescript

### Despliegue en Heroku por primera vez

1. Crear una aplicación en Heroku y escoger la opción "Heroku Git"
2. En la raíz del proyecto ejecutar mediante consola ``heroku login``
3. En la raíz del proyecto ejecutar mediante consola  ``heroku git:clone -a rest-server-nodejs-express-ic``


### Despliegue de cambios

1. Subir cambios a git
2. En la raíz del proyecto ejecutar mediante consola ``git push heroku main``

Seguimientos de logs en Heroku: en la consola ejecutar: ``heroku logs --tail``