import { connectToMongo } from '../database/mongo';
import { Eenum, Settings } from '../entity/settings';

export class SettingsRepository {
  private collectionName = 'settings';

  public async getSettingsByClientId(clientId: number): Promise<Settings> {
    const db = await connectToMongo();
    const collection = db.collection<Settings>(this.collectionName);

    let settings = await collection.findOne({ clientId });

    if (!settings) {
      const newSettings = this.getDefaultSettings(clientId);
      const newSettingSaved = await collection.insertOne(newSettings);

      return { _id: newSettingSaved.insertedId, ...newSettings };
    }

    return settings;
  }

  public async updateSettingsByClientId(clientId: number, newSettings: Settings): Promise<void> {
    const db = await connectToMongo();
    const collection = db.collection<Settings>(this.collectionName);

    await collection.updateOne({ clientId }, { $set: newSettings }, { upsert: true });
  }

  private getDefaultSettings(clientId: number): Settings {
    return {
      clientId,
      deliveryMethods: [
        { name: 'Print Now', enum: Eenum.PRINT_NOW, order: 1, isDefault: true, selected: true },
        { name: 'Print@Home', enum: Eenum.PRINT_AT_HOME, order: 2, isDefault: false, selected: true },
      ],
      fulfillmentFormat: { rfid: false, print: false },
      printer: { id: null },
      printingFormat: { formatA: true, formatB: false },
      scanning: { scanManually: true, scanWhenComplete: false },
      paymentMethods: { cash: true, creditCard: false, comp: false },
      ticketDisplay: { leftInAllotment: true, soldOut: true },
      customerInfo: { active: false, basicInfo: false, addressInfo: false },
    };
  }
}
