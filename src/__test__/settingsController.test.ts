import request from 'supertest';
import express from 'express';
import { SettingsRepository } from '../modules/app-settings/infra/adapters/settings-repository';
import { updateSettings, getSettings } from '../modules/app-settings/infra/controller/settings';

const app = express();
app.use(express.json());
app.put('/settings/:clientId', updateSettings);
app.get('/settings/:clientId', getSettings);

jest.mock('../modules/app-settings/infra/adapters/settings-repository');

describe('PUT /settings/:clientId', () => {
  let mockUpdateSettingsByClientId: jest.Mock;

  beforeEach(() => {
    mockUpdateSettingsByClientId = jest.spyOn(SettingsRepository.prototype, 'updateSettingsByClientId') as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return 204 and the updated settings when valid data is provided', async () => {
    const clientId = 1;
    const newSettings = {
      clientId,
      deliveryMethods: [
        { name: 'Print Now', enum: 'PRINT_NOW', order: 1, isDefault: true, selected: true },
        { name: 'Print@Home', enum: 'PRINT_AT_HOME', order: 2, isDefault: false, selected: true },
      ],
      fulfillmentFormat: { rfid: false, print: false },
      printer: { id: null },
      printingFormat: { formatA: true, formatB: false },
      scanning: { scanManually: true, scanWhenComplete: false },
      paymentMethods: { cash: true, creditCard: false, comp: false },
      ticketDisplay: { leftInAllotment: true, soldOut: true },
      customerInfo: { active: false, basicInfo: false, addressInfo: false },
    };

    mockUpdateSettingsByClientId.mockImplementationOnce(() => {});

    const response = await request(app).put(`/settings/${clientId}`).send(newSettings);

    expect(response.status).toBe(204);
  });

  it('should return 400 when validation fails', async () => {
    const clientId = 1;
    const invalidSettings = { clientId: 'invalid' }; // Invalid data

    const response = await request(app).put(`/settings/${clientId}`).send(invalidSettings);

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it('should return 500 when an error occurs in the repository', async () => {
    const clientId = 2;
    const newSettings = {
      clientId,
      deliveryMethods: [
        { name: 'Print Now', enum: 'PRINT_NOW', order: 1, isDefault: true, selected: true },
        { name: 'Print@Home', enum: 'PRINT_AT_HOME', order: 2, isDefault: false, selected: true },
      ],
      fulfillmentFormat: { rfid: false, print: false },
      printer: { id: null },
      printingFormat: { formatA: true, formatB: false },
      scanning: { scanManually: true, scanWhenComplete: false },
      paymentMethods: { cash: true, creditCard: false, comp: false },
      ticketDisplay: { leftInAllotment: true, soldOut: true },
      customerInfo: { active: false, basicInfo: false, addressInfo: false },
    };

    mockUpdateSettingsByClientId.mockRejectedValue(new Error('Database error'));

    const response = await request(app).put(`/settings/${clientId}`).send(newSettings);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Error updating settings');
  });
});

describe('GET /settings/:clientId', () => {
  let mockGetSettingsByClientId: jest.Mock;

  beforeEach(() => {
    mockGetSettingsByClientId = jest.spyOn(SettingsRepository.prototype, 'getSettingsByClientId') as jest.Mock;
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should return 200 and the settings when the clientId exists', async () => {
    const clientId = 1;
    const settings = {
      clientId,
      deliveryMethods: [
        { name: 'Print Now', enum: 'PRINT_NOW', order: 1, isDefault: true, selected: true },
        { name: 'Print@Home', enum: 'PRINT_AT_HOME', order: 2, isDefault: false, selected: true },
      ],
      fulfillmentFormat: { rfid: false, print: false },
      printer: { id: null },
      printingFormat: { formatA: true, formatB: false },
      scanning: { scanManually: true, scanWhenComplete: false },
      paymentMethods: { cash: true, creditCard: false, comp: false },
      ticketDisplay: { leftInAllotment: true, soldOut: true },
      customerInfo: { active: false, basicInfo: false, addressInfo: false },
    };

    mockGetSettingsByClientId.mockResolvedValue(settings);

    const response = await request(app).get(`/settings/${clientId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(settings);
  });

  it('should return 200 and a default settings when no settings are found for the clientId', async () => {
    const clientId = 2; // Assumed to be a clientId with no settings
    const defaultSettings = {
      clientId,
      deliveryMethods: [
        { name: 'Print Now', enum: 'PRINT_NOW', order: 1, isDefault: true, selected: true },
        { name: 'Print@Home', enum: 'PRINT_AT_HOME', order: 2, isDefault: false, selected: true },
      ],
      fulfillmentFormat: { rfid: false, print: false },
      printer: { id: null },
      printingFormat: { formatA: true, formatB: false },
      scanning: { scanManually: true, scanWhenComplete: false },
      paymentMethods: { cash: true, creditCard: false, comp: false },
      ticketDisplay: { leftInAllotment: true, soldOut: true },
      customerInfo: { active: false, basicInfo: false, addressInfo: false },
    };

    mockGetSettingsByClientId.mockResolvedValue(defaultSettings);

    const response = await request(app).get(`/settings/${clientId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(defaultSettings);
  });

  it('should return 500 when an error occurs in the repository', async () => {
    const clientId = 1;

    mockGetSettingsByClientId.mockRejectedValue(new Error('Database error'));

    const response = await request(app).get(`/settings/${clientId}`);

    expect(response.status).toBe(500);
    expect(response.body.message).toBe('Error retrieving settings');
  });
});
