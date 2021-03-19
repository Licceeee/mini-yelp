const bcrypt = require('bcrypt')
const db = require('../db/client')

const login = async (req, res, next) => {
    
    const { email, password } = req.body

    const user = {
        text: `
            SELECT * FROM users
            WHERE email like $1;
         `,
         values: [email]}

    
    try {
        const { rows } = await db.query(user)

        if (!user) return res.status(400).send('Invalid Credentials')

        console.log(rows[0].password)

        const match = await bcrypt.compare(password, rows[0].password)
        if (!match) return res.status(400).send(`Invalid Credentials`)

        res.send(match)
    } catch (e) {
        res.status(404).send(`${e} - User not found`)
    }

}

module.exports = {
    login
}