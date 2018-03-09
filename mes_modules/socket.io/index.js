let socketio = require('socket.io');

module.exports.listen = function(server){
    let io = socketio.listen(server);

    // ------------------------------ Traitement du socket
    let objUtilisateur = {};
    io.on('connection', function(socket){
    console.log(socket.id);

    socket.on('ajouterUtilisateur', function(data){
      objUtilisateur[socket.id] = data.user;
      console.log(objUtilisateur);
      io.emit('nouvelUtilisateur', data);
  
    })

    socket.on('ajouterMessage', function(data){
      console.log(data.message);
      io.emit('nouveauMessage', data);
    })

    socket.on('deconnection', function(data){
      console.log(data.id);
      let message = data.nom + " c'est déconnecté";
      data.message = message;
      console.log(objUtilisateur[socket.id]);
    
     data.id = socket.id;
 
      io.emit('deconnection', data);
      socket.disconnect();
      delete objUtilisateur[socket.id];
    })
    // .......
   })
 return io
}