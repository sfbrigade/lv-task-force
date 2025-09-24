import fp from 'fastify-plugin';
import fastifyFormbody from '@fastify/formbody';

export default fp(async function (fastify) {
  await fastify.register(fastifyFormbody);
});
