import type { auth } from '@tawasul/auth/server';

type Session = typeof auth.$Infer.Session;
declare global {
  namespace Express {
    interface Request {
      user: Session['user']; // Add user to the Request interface
    }
  }
}
