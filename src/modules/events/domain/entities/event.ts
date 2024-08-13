import { Ticket } from '../../../tickets/domain/entities/ticket';

export interface Event {
  id: number;
  name: string;
  date: Date;
  location: string;
  description: string;
  availableTickets: Ticket[];
  createdAt: Date;
  updatedAt: Date;
}
