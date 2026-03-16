import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  // your logic

  return NextResponse.next();
}

export const { auth: middleware } = NextAuth(authConfig);
