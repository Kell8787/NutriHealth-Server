# TODO
## Modelo de post
- Crear el paquete con el archivo
- Atributos del modelo
    - Titulo
    - Descripcion
    - Imagen
    - Usuario?
    - Likes
    - Comentario


## Modelo post de mi proyecto
- Crear el paquete con el archivo
- atributos del modelo



## Necesito la base de datos. algo que aun no tengo y debo ir a preguntar.

## Controlador de post
- Crear paquete y archivo controlador
- Crear objeto a exportar
- Crear el metodo create
- Crear el metodo findAll
- Crear el metodo findOneById?


## Validacion de rutas
- Validacion manual
    - Middlewares () => { validar } () => {} () => {}  
- express validator
- Reglas de EV
- middleware de EV

## Implementacion de usuario
- Modelo de usuario
 - Atributos
 -Manejo de password
- Tools para el token
- Registro e Inicio de Sesion
- Rutas que requieren toke - Middleware de toke
- Implementacion de Roles
- Completando la funcionalidad POST
 - Verificar en save y delete que el post sea el del usuario
 - Implementar toggle visibility
 - Implementar like y comentar


##
- Implementacion de roles
 - Sysadmin
    - Admin
     - Gestionar la app
     - Promover usuarios a mods
    - Moderador
        - ver comentarios
        - Bannear gente
    - User
        - crear post
        - Dar like, comentarios.
    - [Moderador, User]
