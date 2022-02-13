let io;

module.exports = {
    init: httServer=>{
        io= require('socket.io')(httServer, {
            cors: {
                origin: "*",
                methods: ["GET", "POST", "PATCH"]
            }
        } );
        return io;
    },
    getIO:()=>{
        if(!io){
            throw new Error('Socket not initialized!!');
        }
        return io;
    }
};

