show dbs;

use prueba;

db.productscollection.insert({name: "Fideos","categoria": "harinas", precio: 205});
db.productscollection.insert({name: "Lecha","categoria": "Lacteos", precio: 30});
db.productscollection.insert({name: "Crema","categoria": "Lacteos", precio: 60});

show collections

db.productscollection.find()