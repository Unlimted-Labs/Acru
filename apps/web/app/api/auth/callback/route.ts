import { type NextRequest, NextResponse } from 'next/server';

/** Handles zkLogin OAuth callback — stores app JWT in httpOnly cookie. */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  // TODO: exchange OAuth code for Google JWT, generate ZK proof, POST /v1/auth/verify
  // TODO: set httpOnly cookie with returned app JWT

  const response = NextResponse.redirect(new URL('/dashboard', request.url));
  return response;
}
