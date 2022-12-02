const bcrypt = require('bcrypt');

const hashPassword = async function (password,saltRounds = 10 ) {
  const hash = await bcrypt.hash(password,saltRounds)
  return hash
}

const verifyPassword = async function (password, hashedPassword) {
  const isCorrect = await bcrypt.compare(password, hashedPassword); 
  return isCorrect;
}

module.exports = {
  hashPassword,
  verifyPassword
}

