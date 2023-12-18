import http from 'node:http'



const server = http.createServer( (req, res) => {
    return res.end('heya zz')
})

server.listen(3333)