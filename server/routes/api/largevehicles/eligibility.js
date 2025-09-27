import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

export default async function (fastify, opts) {
  fastify.get('/eligibility', {
    schema: {
      description: 'Returns whether a vehicle is eligible for the Large Vehicle Task Force.',
      querystring: z.object({
        search: z.string(),
      }),
      response: {
        [StatusCodes.OK]: z.boolean(),
      }
    },
  },
  async function (request, reply) {
    const { search } = request.query;
    if (!search?.trim()) {
      reply.status(StatusCodes.BAD_REQUEST).send();
      return;
    }
    const isEligible = await fastify.prisma.largeVehicle.isEligible({ licensePlateNumber: search.trim() });
    reply.send(isEligible);
  });
}
