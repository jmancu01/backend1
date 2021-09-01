import {myServer} from './services/server'
import { mySQLDB } from './services/db'

const port = 8080 || process.env.PORT

myServer.listen(port, () => console.log(`Listening in port: ${port}`))

//chequeo si existe una tabla
mySQLDB.schema.hasTable('productos').then((exists) =>{
    if(!exists){
        console.log('creando la tabla')
        //creo una tabla con estos 3 datos
        mySQLDB.schema
            .createTable('productos', (table) => {
                table.increments('id')
                table.string('nombre').notNullable();
                table.decimal('precio', 4, 2);
        })
        .then(() => console.log('Tabla ya esta creada'))
    }
})