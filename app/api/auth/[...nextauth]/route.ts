// 📁 app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import KakaoProvider from 'next-auth/providers/kakao';
import GoogleProvider from 'next-auth/providers/google';
import { authOptions as options } from '@/lib/auth';

const handler = NextAuth(options);
export { handler as GET, handler as POST };
