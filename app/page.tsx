import { redirect } from 'next/navigation';

export default function Home() {
  redirect('/intro'); // 최초 진입 시 /intro로 이동
}