declare namespace Express {
    interface Request {
      payload: Payload | null;
    }
  }

  interface Payload {
    userId: number;
}