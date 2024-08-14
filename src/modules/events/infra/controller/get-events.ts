import { EventDAL } from '../../application/dal/events.dal';
import { Request, Response } from 'express';
import { TicketsDAL } from '../../../tickets/application/dal/tickets.dal';

export const createGetEventsController =
  ({ eventsDAL, ticketsDAL }: { eventsDAL: EventDAL; ticketsDAL: TicketsDAL }) =>
  async (_req: Request, res: Response) => {
    const events = await eventsDAL.getEvents(50);

    /* 
      original
    */
    //add the available tickets to the response for each event
    /* for (let i = 0; i < events.length; i++) {
      const event = events[i];
      const tickets = await ticketsDAL.getTicketsByEvent(event.id);
      events[i].availableTickets = tickets;
    } */

    res.json(events);
  };
