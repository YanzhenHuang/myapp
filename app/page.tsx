import { RedirectType, redirect, useSearchParams } from 'next/navigation';
import { cookies } from 'next/headers';

// const pb = new PocketBase(u_p_server.BASE_URL);

export default async function Home() {

  let redir = '/allPosts/1';

  if (!cookies().get('PB_AUTH_TOKEN')) {
    redir = '/user/signin';
  }

  redirect(redir, RedirectType.replace);

}
