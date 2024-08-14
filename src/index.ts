import express from 'express';
import { knex } from 'knex';
import dbConfig from './utils/infrasctruture/database/knexfile';
import cors from 'cors';
import morgan from 'morgan';

// DAL
import { createEventDAL } from './modules/events/application/dal/events.dal';
import { createTicketDAL } from './modules/tickets/application/dal/tickets.dal';

// Controllers
import { createGetEventsController } from './modules/events/infra/controller/get-events';

// Routes
import { appSettingsRouter } from './modules/app-settings/infra/routes/app-settings';

// initialize Knex
const Knex = knex(dbConfig.development);

// Initialize DALs
const eventDAL = createEventDAL(Knex);
const TicketDAL = createTicketDAL(Knex);

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

app.use('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/events', createGetEventsController({ eventsDAL: eventDAL, ticketsDAL: TicketDAL }));

// Settings endpoints
app.use('/settings', appSettingsRouter);

app.use('/', (_req, res) => {
  res.json({ message: 'Hello API' });
});

app.listen(3000, () => {
  console.log('Server Started');
});
