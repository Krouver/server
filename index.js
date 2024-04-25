const { readFileSync } = require('fs')
const { Server } = require('http')
const server = new Server
const users = [{ name: 'Bob' }, { name: 'no Bob' }]

server.listen(1000, () => console.log('http://localhost:1000'))
server.on('request', handleRequest)

function handleRequest(request, response) {
  if (request.url.startsWith("/api/")) {
    handleAPI(request, response)
  } else {
    serveFile(request, response)
  }
}

function handleAPI(request, response) {
  response.end(JSON.stringify(users))
}

function serveFile(request, response) {
  if (request.url == "/") request.url = "/index.html"

  try {
    const filePath = 'public' + request.url
    const fileContent = readFileSync(filePath)

    response.end(fileContent)

  } catch {
    const filePath = 'public/404.html'
    const fileContent = readFileSync(filePath)

    response.statusCode = 404
    response.end(fileContent)
  }
}

