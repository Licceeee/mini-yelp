// constUser = require('../models/Student');
const bcrypt = require('bcrypt')

const login = async (req, res, next) => {
    
    const { email, password } = req.body

    const user = {
        text: `
            SELECT * FROM users
            WHERE email = $1;
         `,
         values: [email]}

    if (!user) return res.status(400).send('Invalid Credentials')
    try {
        const { rows } = await db.query(user)
        res.send(rows)
    } catch (e) {
        res.status(404).send("User not found")
    }
    // const match = await bcrypt.compare(password, user.password)

    // if (!match) return res.status(400).send(`Invalid Credentials`)

    // const token = user.createToken()
    // res.set('x-authorization-token', token).send('User logged in successfully')

}

module.exports = {
    login
}