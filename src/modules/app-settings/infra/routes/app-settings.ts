import { Router } from 'express';

// Controller
import { getSettings, updateSettings } from '../controller/settings';

const router = Router();

router.get('/:clientId', getSettings);
router.put('/:clientId', updateSettings);

export { router as appSettingsRouter };
