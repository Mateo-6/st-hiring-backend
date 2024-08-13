import Joi from 'joi';

const deliveryMethodSchema = Joi.object({
  name: Joi.string().required(),
  enum: Joi.string().valid('PRINT_NOW', 'PRINT_AT_HOME').required(),
  order: Joi.number().integer().required(),
  isDefault: Joi.boolean().strict().required(),
  selected: Joi.boolean().strict().required(),
});

const fulfillmentFormatSchema = Joi.object({
  rfid: Joi.boolean().strict().required(),
  print: Joi.boolean().strict().required(),
});

const printerSchema = Joi.object({
  id: Joi.string().allow(null).optional(),
});

const printingFormatSchema = Joi.object({
  formatA: Joi.boolean().strict().required(),
  formatB: Joi.boolean().strict().required(),
});

const scanningSchema = Joi.object({
  scanManually: Joi.boolean().strict().required(),
  scanWhenComplete: Joi.boolean().strict().required(),
});

const paymentMethodsSchema = Joi.object({
  cash: Joi.boolean().strict().required(),
  creditCard: Joi.boolean().strict().required(),
  comp: Joi.boolean().strict().required(),
});

const ticketDisplaySchema = Joi.object({
  leftInAllotment: Joi.boolean().strict().required(),
  soldOut: Joi.boolean().strict().required(),
});

const customerInfoSchema = Joi.object({
  active: Joi.boolean().strict().required(),
  basicInfo: Joi.boolean().strict().required(),
  addressInfo: Joi.boolean().strict().required(),
});

export const settingsSchema = Joi.object({
  clientId: Joi.number().integer().required(),
  deliveryMethods: Joi.array().items(deliveryMethodSchema).required(),
  fulfillmentFormat: fulfillmentFormatSchema.required(),
  printer: printerSchema.required(),
  printingFormat: printingFormatSchema.required(),
  scanning: scanningSchema.required(),
  paymentMethods: paymentMethodsSchema.required(),
  ticketDisplay: ticketDisplaySchema.required(),
  customerInfo: customerInfoSchema.required(),
});
