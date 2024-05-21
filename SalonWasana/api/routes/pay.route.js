import express from 'express';
import * as payController from '../controllers/pay.controller.js';
// import * as payNowController from '../controllers/pay.now.controller.js';

const router = express.Router();

router.post('/create-checkout-session', payController.createSession);
// router.post('/create-paynow', payNowController.createOneSession);
router.post('/webhook', payController.handleWebhook);
// router.post('/webhook', payNowController.handleWebhook);

export default router;
