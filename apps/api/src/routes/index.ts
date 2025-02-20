import { Router } from 'express';
import { commentRoute } from './comment/comment.route';
import { postRoute } from './post/post.route';
const routes = Router();

routes.use('/post', postRoute);
routes.use('/comment', commentRoute);

export { routes };
