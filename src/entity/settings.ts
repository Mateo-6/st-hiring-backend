import { ObjectId } from 'mongodb';

export enum Eenum {
  PRINT_NOW = 'PRINT_NOW',
  PRINT_AT_HOME = 'PRINT_AT_HOME',
}

export interface DeliveryMethod {
  name: string;
  enum: Eenum;
  order: number;
  isDefault: boolean;
  selected: boolean;
}

export interface FulfillmentFormat {
  rfid: boolean;
  print: boolean;
}

export interface Printer {
  id: string | null;
}

export interface PrintingFormat {
  formatA: boolean;
  formatB: boolean;
}

export interface Scanning {
  scanManually: boolean;
  scanWhenComplete: boolean;
}

export interface PaymentMethods {
  cash: boolean;
  creditCard: boolean;
  comp: boolean;
}

export interface TicketDisplay {
  leftInAllotment: boolean;
  soldOut: boolean;
}

export interface CustomerInfo {
  active: boolean;
  basicInfo: boolean;
  addressInfo: boolean;
}

export interface Settings {
  _id?: ObjectId;
  clientId: number;
  deliveryMethods: DeliveryMethod[];
  fulfillmentFormat: FulfillmentFormat;
  printer: Printer;
  printingFormat: PrintingFormat;
  scanning: Scanning;
  paymentMethods: PaymentMethods;
  ticketDisplay: TicketDisplay;
  customerInfo: CustomerInfo;
}
