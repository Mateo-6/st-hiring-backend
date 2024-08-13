import { Request, Response } from 'express';
import { SettingsRepository } from '../repositories/settings.repository';
import { settingsSchema } from '../validate/settings';

const repository = new SettingsRepository();

export async function getSettings(req: Request, res: Response): Promise<void> {
  const clientId = parseInt(req.params.clientId, 10);

  try {
    const settings = await repository.getSettingsByClientId(clientId);
    res.json(settings);
  } catch (error) {
    console.error('Error getting settings:', error);
    res.status(500).json({ error: (error as Error).message });
  }
}

export async function updateSettings(req: Request, res: Response): Promise<void> {
  const clientId = parseInt(req.params.clientId, 10);
  const newSettings = req.body;

  const { error } = settingsSchema.validate(newSettings, { abortEarly: false });

  if (error) {
    res.status(400).json({ errors: error.details.map((detail) => detail.message) });
    return;
  }

  try {
    const updatedSettings = await repository.updateSettingsByClientId(clientId, newSettings);
    res.status(200).json(updatedSettings);
  } catch (err) {
    console.error('Error updating settings:', err);
    res.status(500).json({ message: 'Error updating settings' });
  }
}
