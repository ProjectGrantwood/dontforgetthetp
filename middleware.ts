import { auth } from './auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isAuthed = !!req.auth;
  const { pathname } = req.nextUrl;
  const isPublic = pathname === '/' || pathname.startsWith('/login') || pathname.startsWith('/signup');
    
  if (!isAuthed && !isPublic) {
    const url = new URL('/login', req.url);
    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }
  
  if (isAuthed && isPublic) {
    return NextResponse.redirect(new URL('/home', req.url));
  }
  
})
 
export const config = {
  matcher: [String.raw`/((?!api|_next/static|_next/image|.*\.png$).*)`]
};