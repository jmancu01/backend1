import knex from "knex";
//configuracion de la data
export const mySQLDB = knex({
    client: 'mysql',
    connection: {
      host: '127.0.0.1', //host local
      user: 'root', //usuario generico
      password: '',
      database: 'productsdata', //selecciono la db donde se va a crear todo
    },
    pool: { min: 0, max: 7 },
});
  
// export const sqliteDB = knex({
//   client: 'sqlite3',
//   connection: { filename: './midbligera.sqlite' },
//   useNullAsDefault: true,
// });
    