import { StatusCodes } from 'http-status-codes';
import twilio from 'twilio';
import { z } from 'zod';

export default async function (fastify, opts) {
  fastify.post('/sms',
    {
      schema: {
        description: 'Receives an SMS message from Twilio.',
        response: {
          [StatusCodes.OK]: {
            content: {
              'application/xml': {
                schema: z.string().meta({
                  description:
                    'Returns a response in TWIML XML format.',
                }),
              },
            },
          },
        },
      },
    },
    async function (request, reply) {
      const twilioSignature = request.headers['x-twilio-signature'];
      const twilioUrl = `${process.env.BASE_URL}${request.url}`;
      const twilioParams = { ...request.body };
      const isSignatureValid = twilio.validateRequest(process.env.TWILIO_AUTH_TOKEN, twilioSignature, twilioUrl, twilioParams);

      if (!isSignatureValid) {
        reply.status(StatusCodes.FORBIDDEN).send('Invalid signature');
        return;
      }

      const { Body: body } = twilioParams;
      const licensePlateNumber = body.match(/^[A-Z0-9\- ]{1,10}$/i)?.[0].toUpperCase();
      const twiml = new twilio.twiml.MessagingResponse();
      if (licensePlateNumber) {
        const isEligible = await fastify.prisma.largeVehicle.isEligible({ licensePlateNumber });
        if (isEligible) {
          twiml.message(`License plate: ${licensePlateNumber}. Good news! Your vehicle is in the system. You may qualify for a Large Vehicle Refuge Permit.`);
        } else {
          twiml.message(`License plate: ${licensePlateNumber}. We couldn't find your vehicle in the system. Please double-check the license plate number you entered.`);
        }
      } else {
        twiml.message('Invalid license plate number. Please double-check the license plate number you entered.');
      }
      reply.type('text/xml').send(twiml.toString());
    });
}
