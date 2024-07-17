const mongoose = require('mongoose');

const chonijappDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log('Connected to DDBB')

  } catch (error) {
    console.error(error.message)

  }
}

module.exports = { chonijappDB }