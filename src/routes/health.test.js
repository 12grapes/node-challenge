const request = require('supertest')
const server = require('../app').listen()

// Close the server after each test
afterEach(() => {
  server.close()
})

describe('/health', () => {
  it('should respond 200 and JSON with an success: true status', async () => {
    const response = await request(server).get('/health')
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    expect(response.body).toMatchSnapshot()
  })
  it('should log the request in elasticsearch', async () => {
    const response = await request(server).get('/health')
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    // TODO: add more assertions
  })
})

describe('/weekly-report', () => {
  // TODO: write tests
})
