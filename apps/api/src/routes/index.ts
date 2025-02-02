import { Router } from 'express';
import { postRoute } from './post/route';
const routes = Router();

routes.use('/post', postRoute);

export { routes };
