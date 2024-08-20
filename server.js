// import { createServer } from 'node:http'

// const server = createServer((request, response)=> {
//     response.write('oi')

//     return response.end()
// })

// server.listen(8080)


import { fastify } from 'fastify'
// import { DatabaseMemory } from './database-memory.js'
import { DatabasePostgres } from './database-postgrest.js'


const server = fastify()

// const database = new DatabaseMemory()
const database =  new DatabasePostgres()

server.post('/videos', async(request, reply) => {
    const { title, description, duration } = request.body

   await database.create({
        title,
        description,
        duration,
    })

    return reply.status(201).send() // 201 significa que algo foi criado
})

server.get('/videos',async (request) => {
    const search = request.query.search
    const videos = await database.list(search)

    return videos
})

server.put('/videos/:id',async (request, reply) => {
    const videoId = request.params.id
    const {title, description, duration} = request.body
    
    await database.update(videoId, {
        title,
        description,
        duration
    })

    return reply.status(204).send() // 204 significa que teve sucesso na resposta mas nao tem conteudo na resposta
})
server.delete('/videos/:id',(request, reply) => {
    const videoId = request.params.id

    database.delete(videoId)

    return reply.status(204).send()
})

server.listen({
    host:"0.0.0.0", 
    port: process.env.PORT ?? 8080,
})