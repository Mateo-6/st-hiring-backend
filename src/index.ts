import express from 'express';
import { knex } from 'knex';
import dbConfig from './knexfile';
import cors from 'cors';

// DAL
import { createEventDAL } from './dal/events.dal';
import { createTicketDAL } from './dal/tickets.dal';

// Controllers
import { createGetEventsController } from './controllers/get-events';
import { getSettings, updateSettings } from './controllers/settings';

// initialize Knex
const Knex = knex(dbConfig.development);

// Initialize DALs
const eventDAL = createEventDAL(Knex);
const TicketDAL = createTicketDAL(Knex);

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

app.use('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/events', createGetEventsController({ eventsDAL: eventDAL, ticketsDAL: TicketDAL }));

// Settings end points
app.get('/settings/:clientId', getSettings);
app.put('/settings/:clientId', updateSettings);

app.use('/', (_req, res) => {
  res.json({ message: 'Hello API' });
});

app.listen(3000, () => {
  console.log('Server Started');
});
