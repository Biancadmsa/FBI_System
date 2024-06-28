# FBI System Desafío (JWT)

Sistema online que gestione misiones secretas...


## Instalación
```
1. Clona este repositorio.
2. Instala las dependencias con npm:

   npm install
   ```

## Endpoints

### Iniciar Sesión
### Descripción: Endpoint para autenticar usuarios y generar un token JWT.
### URL: 
```
/iniciarSesion
```

### Método: GET
### Parámetros:
```
1. email: Email del usuario.
2. password: Contraseña del usuario.
```

## Accesos permitidos:
```
 {
    email: 'who@fbi.com',
    password: 'me',
  },
  {
    email: 'where@fbi.com',
    password: 'there',
  },
  {
    email: 'how@fbi.com',
    password: 'exactly',
    },
  {
    email: 'piero@gmail.com',
    password: 'profe',
  },
  {
    email: 'bdmsa12@gmail.com',
    password: 'suma',
  }

```

## Respuesta Exitosa:
```
Código: 200
Contenido: HTML con mensaje de bienvenida y token JWT almacenado en sessionStorage.
```

## Respuesta de Error:
```
Código: 401
Contenido: Mensaje de error en caso de credenciales incorrectas.
```

## Ruta Restringida
```
Descripción: Endpoint para acceder a una ruta restringida utilizando JWT.
URL: /rutaRestringida
Método: GET
Headers:
* Authorization: Bearer <token>
```

## Respuesta Exitosa:
```
Código: 200
Contenido: Mensaje de bienvenida con el email del usuario autenticado.
```

## Respuesta de Error:
```
Código: 401
Contenido: Mensaje de error si el token es inválido o ha expirado.
```

## Tecnologías:
 ```
Express.js
JWT (JSON Web Tokens)
HTML/JavaScript (para la interfaz de usuario)
```