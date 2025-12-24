const JWT_USER_SECRET = process.env.JWT_USER_PASSWORD; // from env file
const JWT_ADMIN_SECRET = process.env.JWT_ADMIN_PASSWORD; // from env file

module.exports =  {
    JWT_USER_SECRET,
    JWT_ADMIN_SECRET
}