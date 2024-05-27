Las dependencias a instalar son las siguientes:
  -  npm install bcryptjs
  -  npm install cookie-parser
  -  npm install dotenv
  -  npm install express
  -  npm install jsonwebtoken
  -  npm install express-jwt
  -  npm install mysql

Para ejecutar la aplicación el comando es el siguiente:
  -  nodemon app.js o node app.js

En caso de tener un problema de conexion  con MYSQL, ej:
errno: 1251
sqlMessage: 'Client does not support authentication protocol requested by server; consider upgrading MySQL client'

Se recomienda cambiar el tipo de autenticacion por contrasena del usuario encargado de realizar la 
conexion a la base de datos por medio de la siguiente consulta:
  -  ALTER USER 'usuario'@'localhost' IDENTIFIED WITH mysql_native_password BY 'nueva_contraseña';
