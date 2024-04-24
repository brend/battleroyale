if (!process.env.SECRET_KEY) {
  throw new Error('SECRET_KEY is not defined');
}

module.exports = {
  mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/battleroyale-db',
  secretKey: process.env.SECRET_KEY
};