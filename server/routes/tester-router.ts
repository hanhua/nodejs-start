import { Router } from 'express';

import { test_func } from '../../mutual/es-feature-test';

export default function testerRouter(): Router {
    const router = Router();
    router.post('/api/tester', (req, res) => res.json({ok: test_func(req.body)}));
    return router;
}
