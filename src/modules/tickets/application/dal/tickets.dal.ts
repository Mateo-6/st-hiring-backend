import { Knex } from 'knex';
import { Ticket } from '../../domain/entities/ticket';

export interface TicketsDAL {
  getTicketsByEvent(eventId: number): Promise<Ticket[]>;
}

export const createTicketDAL = (knex: Knex): TicketsDAL => {
  return {
    async getTicketsByEvent(eventId): Promise<Ticket[]> {
      // Using the improved events query, this query will not be executed anymore
      return await knex<Ticket>('tickets as t')
        .select('*')
        .whereRaw(`event_id = ${eventId} AND t.status = 'available'`);
    },
  };
};
