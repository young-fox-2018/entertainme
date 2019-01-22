const axios = require('axios')
const redis = require('redis')
const client = redis.createClient()

module.exports = {
    get(req, res, next) {
        client.get('entertainme', (err, reply) => {
            if (reply) res.status(200).json(JSON.parse(reply))
            else {
                Promise.all([axios.get('http://localhost:3001/movie'), axios.get('http://localhost:3002/series')])
                    .then(arrData => {
                        client.set('entertainme', JSON.stringify({movies: arrData[0].data, series: arrData[1].data}), 'EX', 60)
                        res.status(200).json({movies: arrData[0].data, series: arrData[1].data})
                    })
                    .catch(err => {
                        res.status(500).json({info: 'error geting all data', data: err.message})
                    })
            }
        })
    }
}