const { Client } = require('elasticsearch')

// elasticsearch client singleton
let client
const getElasticSearchClient = () => {
  if (!client) {
    const host = process.env.ELASTICSEARCH_HOST || 'localhost'
    const port = process.env.ELASTICSEARCH_PORT || 9200
    client = new Client({
      host: `${host}:${port}`,
      log: 'info'
    })
  }
  return client
}

// Low level ES wrappers
const index = async (defaultParams, esClient, params) => {
  const response = await esClient.index({ ...defaultParams, ...params })
  const { created, result, id } = response
  return { created, result, id }
}
const search = async (defaultParams, esClient, params) => {
  const response = await esClient.search({ ...defaultParams, ...params })
  return response
}

module.exports = {
  getElasticSearchClient,
  index,
  search
}
