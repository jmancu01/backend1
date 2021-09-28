import Config from './config';
import Server from './services/server';
import { connectToDB } from './services/db';
import { initWsServer } from './services/socket';
//configuro el puerto en .env
const puerto = Config.PORT;

//function de init
const init = async () => {
  //llamo desde db
  await connectToDB();
  //llamo desde socket
  const io = initWsServer(Server);
  Server.listen(puerto, () => console.log(`Server up puerto ${puerto}`));
};

init();
