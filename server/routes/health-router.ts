import { Router } from 'express';

export default function healthRouter(): Router {
    const router = Router();
    router.get('/api/health', (req, res) => res.json({ok: true}));
    return router;
}
