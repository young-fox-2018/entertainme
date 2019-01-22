const axios = require('axios')
const redis = require('redis')
const client = redis.createClient()
const bluebird = require('bluebird')

bluebird.promisifyAll(redis.RedisClient.prototype)
bluebird.promisifyAll(redis.Multi.prototype)

module.exports = {
    async getMovies() {
        try {
            let reply = JSON.parse(await client.getAsync('movies'))
            if (reply) return reply
            else {
                const { data } = await axios({
                    url: 'http://localhost:3001/movie',
                    method: 'GET'
                })
                client.set('movies', JSON.stringify(data), 'EX', 60)
                return data
            }
        }
        catch (err) {
            console.log(err.message)
        }
    },
    async getSeries() {
        try {
            let reply = JSON.parse(await client.getAsync('series'))
            if (reply) return reply
            else {
                const { data } = await axios({
                    url: 'http://localhost:3002/series',
                    method: 'GET'
                })
                client.set('series', JSON.stringify(data), 'EX', 60)
                return data
            }
        }
        catch (err) {
            console.log(err.message)
        }
    },
    async createMovie(_root, {poster_path, overview, title, popularity, status, tag}) {
        try {
            const { data } = await axios({
                url: 'http://localhost:3001/movie',
                method: 'POST',
                data: {
                    poster_path,
                    overview,
                    title,
                    popularity,
                    status,
                    tag
                }
            })
            client.del('movies')
            return data
        }
        catch (err) {
            console.log(err.message)
        }
    },
    async updateMovie(_root, {id, poster_path, overview, title, popularity, status, tag}) {
        try {
            const { data } = await axios({
                                url: `http://localhost:3001/movie/${id}`,
                                method: 'PUT',
                                data: {
                                    poster_path,
                                    overview,
                                    title,
                                    popularity,
                                    status,
                                    tag
                                }
                            })
            client.del('movies')
            return data
        }
        catch (err) {
            console.log(err.message)
        }
    },
    async deleteMovie(_root, {id}) {
        try {
            const { data } = await axios({
                                url: `http://localhost:3001/movie/${id}`,
                                method: 'DELETE'
                            })
            client.del('movies')
            return data
        }
        catch (err) {
            console.log(err.message)
        }
    },
    async createSeries(_root, {poster_path, overview, title, popularity, status, tag}) {
        try {
            const { data } = await axios({
                url: 'http://localhost:3002/series',
                method: 'POST',
                data: {
                    poster_path,
                    overview,
                    title,
                    popularity,
                    status,
                    tag
                }
            })
            client.del('series')
            return data
        }
        catch (err) {
            console.log(err.message)
        }
    },
    async updateSeries(_root, {id, poster_path, overview, title, popularity, status, tag}) {
        try {
            const { data } = await axios({
                                url: `http://localhost:3002/series/${id}`,
                                method: 'PUT',
                                data: {
                                    poster_path,
                                    overview,
                                    title,
                                    popularity,
                                    status,
                                    tag
                                }
                            })
            client.del('series')
            return data
        }
        catch (err) {
            console.log(err.message)
        }
    },
    async deleteSeries(_root, {id}) {
        try {
            const { data } = await axios({
                                url: `http://localhost:3002/series/${id}`,
                                method: 'DELETE'
                            })
            client.del('series')
            return data
        }
        catch (err) {
            console.log(err.message)
        }
    }
}