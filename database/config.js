const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(`${process.env.DB_CNN}`);

    console.log('DB only');
  } catch (error) {
    console.log(error);
    throw new 'Error a la hora de inicializar la base datos'();
  }
};

module.exports = {
  dbConnection,
};
