import { Request } from 'express';
import { JwtPayload } from './jwt-payload.type'; // Assuming this is the correct import path

type AuthenticatedRequest = {
  user: JwtPayload;
} & Request;

export { type AuthenticatedRequest };
