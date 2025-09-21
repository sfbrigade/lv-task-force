import { StatusCodes } from 'http-status-codes';
import { z } from 'zod';

import LargeVehicle from '#models/largeVehicle.js';

export default async function (fastify, opts) {
  fastify.get('/', {
    schema: {
      description: 'Returns a paginated list of Large Vehicles.',
      querystring: z.object({
        search: z.string().optional(),
        page: z.coerce.number().optional(),
        perPage: z.coerce.number().optional(),
      }),
      response: {
        [StatusCodes.OK]: z.array(LargeVehicle.ResponseSchema),
        [StatusCodes.FORBIDDEN]: z.null(),
      }
    },
  },
  async function (request, reply) {
    const { page = '1', perPage = '25', search } = request.query;
    const options = {
      page,
      perPage,
      orderBy: [
        { vehicleId: 'asc' }
      ]
    };
    if (search) {
      options.where = { licensePlateNumber: search.trim() };
    }
    const { records, total } = await fastify.prisma.largeVehicle.paginate(options);
    reply.setPaginationHeaders(page, perPage, total).send(records.map((data) => new LargeVehicle(data)));
  });
}
