import { Router } from 'express';

// Controller
import { getSettings, updateSettings, getClientId } from '../controller/settings';

const router = Router();

router.get('/:clientId', getSettings);
router.put('/:clientId', updateSettings);
router.get('/', getClientId);

export { router as appSettingsRouter };
