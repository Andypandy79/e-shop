import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export function proxy() {
  NextAuth(authConfig);
}
