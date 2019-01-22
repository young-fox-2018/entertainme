const express = require('express')
const expressGraphql = require('express-graphql')
const schema = require('./graphQL/schema')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.json())

app.use('/graphql', expressGraphql({
    schema,
    graphiql: true
}))

app.use(express.urlencoded({ extended: false }))

const router = require('./routes')
app.use('/', router)

const port = 3000
app.listen(port, () => {
    console.log(`listening on port: ${port}`)
})

module.exports = app