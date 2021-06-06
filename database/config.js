const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });

        console.log("conectado a la bd");
    }catch(error) {
        throw new Error("Error a la hora de conectar la bd", error);
    }
};

module.exports = {
    dbConnection
}