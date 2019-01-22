const gql = require('graphql')
const graphqlController = require('../controllers/graphqlController')

const tagType = new gql.GraphQLObjectType({
    name: 'tagType',
    fields: {
        _id: { type: gql.GraphQLID },
        text: { type: gql.GraphQLString }
    }
})

const entertainmeType = new gql.GraphQLObjectType({
    name: 'entertainmeType',
    fields: {
        _id: { type: gql.GraphQLID },
        poster_path: { type: gql.GraphQLString },
        overview: { type: gql.GraphQLString },
        title: { type: gql.GraphQLString },
        popularity: { type: gql.GraphQLFloat },
        status: { type: gql.GraphQLString },
        tag: { type: gql.GraphQLList(tagType) }
    }
})

const infoDataTypeList = new gql.GraphQLObjectType({
    name: 'infoDataTypeList',
    fields: {
        info: { type: gql.GraphQLString },
        data: { type: gql.GraphQLList(entertainmeType) }
    }
})

const infoDataType = new gql.GraphQLObjectType({
    name: 'infoDataType',
    fields: {
        info: { type: gql.GraphQLString },
        data: { type: entertainmeType }
    }
})

const schema = new gql.GraphQLSchema({
    query: new gql.GraphQLObjectType({
        name: 'root',
        fields: {
            movies: {
                type: infoDataTypeList,
                resolve: graphqlController.getMovies
            },
            series: {
                type: infoDataTypeList,
                resolve: graphqlController.getSeries
            }
        }
    }),
    mutation: new gql.GraphQLObjectType({
        name: 'mutationRoot',
        fields: {
            createMovie: {
                type: infoDataType,
                args: {
                    poster_path: { type: gql.GraphQLString },
                    overview: { type: gql.GraphQLString },
                    title: { type: gql.GraphQLString },
                    popularity: { type: gql.GraphQLFloat },
                    status: { type: gql.GraphQLString },
                    tag: { type: gql.GraphQLList(gql.GraphQLString) }
                },
                resolve: graphqlController.createMovie
            },
            updateMovie: {
                type: infoDataType,
                args: {
                    id: { type: gql.GraphQLString },
                    poster_path: { type: gql.GraphQLString },
                    overview: { type: gql.GraphQLString },
                    title: { type: gql.GraphQLString },
                    popularity: { type: gql.GraphQLFloat },
                    status: { type: gql.GraphQLString },
                    tag: { type: gql.GraphQLList(gql.GraphQLString) }
                },
                resolve: graphqlController.updateMovie
            },
            deleteMovie: {
                type: infoDataType,
                args: {
                    id: { type: gql.GraphQLString }
                },
                resolve: graphqlController.deleteMovie
            },
            createSeries: {
                type: infoDataType,
                args: {
                    poster_path: { type: gql.GraphQLString },
                    overview: { type: gql.GraphQLString },
                    title: { type: gql.GraphQLString },
                    popularity: { type: gql.GraphQLFloat },
                    status: { type: gql.GraphQLString },
                    tag: { type: gql.GraphQLList(gql.GraphQLString) }
                },
                resolve: graphqlController.createSeries
            },
            updateSeries: {
                type: infoDataType,
                args: {
                    id: { type: gql.GraphQLString },
                    poster_path: { type: gql.GraphQLString },
                    overview: { type: gql.GraphQLString },
                    title: { type: gql.GraphQLString },
                    popularity: { type: gql.GraphQLFloat },
                    status: { type: gql.GraphQLString },
                    tag: { type: gql.GraphQLList(gql.GraphQLString) }
                },
                resolve: graphqlController.updateSeries
            },
            deleteSeries: {
                type: infoDataType,
                args: {
                    id: { type: gql.GraphQLString }
                },
                resolve: graphqlController.deleteSeries
            }
        }
    })
})

module.exports = schema