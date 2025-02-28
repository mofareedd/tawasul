import { HttpException } from '@/lib/exception';
import authMiddleware from '@/middleware/auth.middleware';
import { Router } from 'express';
import { commentRoute } from './comment/comment.route';
import { groupRoute } from './group/group.route';
import { postRoute } from './post/post.route';
import { clearDB } from './post/post.service';
const routes = Router();

routes.use('/post', postRoute);
routes.use('/comment', commentRoute);
routes.use('/group', groupRoute);
routes.use(
  '/clear',
  routes.get('/', authMiddleware, async (req, res) => {
    if (req.user.email !== 'm.alaolaqi1417@gmail.com') {
      throw new HttpException({
        message: 'Unauthorized',
        statusCode: 401,
      });
    }

    await clearDB();

    res.status(201).json({ message: 'DB is cleared' });
  })
);

export { routes };
