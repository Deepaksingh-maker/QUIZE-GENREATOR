import { Router } from 'express';
import { getMyUploads, uploadFiles } from '../controllers/uploadController.js';
import { requireAuth } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = Router();

router.post('/', requireAuth, upload.array('files'), uploadFiles);
router.get('/', requireAuth, getMyUploads);

export default router;
