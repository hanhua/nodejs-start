import { Router } from 'express';

export default function healthRouter(): Router {
    const router = Router();
    router.get('/api/health', async (req, res) => res.json({ok: true}));
    return router;
}
