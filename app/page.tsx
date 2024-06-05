import { RedirectType, redirect, useSearchParams } from 'next/navigation';

export default async function Home() {

  redirect('/allPosts/1', RedirectType.replace);

}
