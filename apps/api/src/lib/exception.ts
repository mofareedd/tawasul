export class HttpException extends Error {
  message: string;
  statusCode: number;
  status: string;
  constructor({
    message,
    statusCode,
  }: { message: string; statusCode: number }) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.status = statusCode.toString().startsWith('4') ? 'fail' : 'error';

    Error.captureStackTrace(this, this.constructor);
  }
}
