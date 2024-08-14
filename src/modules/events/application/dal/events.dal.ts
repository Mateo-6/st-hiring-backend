import { Knex } from 'knex';
import { Event } from '../../domain/entities/event';

export interface EventDAL {
  getEvents(limit: number): Promise<Event[]>;
}

export const createEventDAL = (knex: Knex): EventDAL => {
  return {
    async getEvents(limit): Promise<Event[]> {
      /* 
        Original
      */
      // return await knex<Event>('events').select('*').limit(limit);

      /* 
        From the concept I found, n+1 problem refers to a situation where multiple 
        database queries are performed instead of a single, more efficient query.

        So, the solution I can think of is to avoid the for loop since it is the one 
        that causes this problem by calling the getTicketsByEvent function, and optimizing 
        the sqlquery so that it allows obtaining the data without resorting to n number of extra queries.

        This improvement made the endpoint respond from 400ms-500ms(Soon) to 100ms-150ms(approximately)
      */
      const eventsWithTickets = await knex<Event>('events as e')
        .select('e.*', knex.raw('json_agg(t.*) as availableTickets'))
        .leftJoin('tickets as t', 'e.id', 't.event_id')
        .where('t.status', 'available')
        .groupBy('e.id')
        .orderBy('e.id')
        .limit(limit);

      return eventsWithTickets;
    },
  };
};
