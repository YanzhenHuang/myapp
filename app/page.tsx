import Image from 'next/image'
import PocketBase from 'pocketbase'
import Link from "next/link";
import { Post } from './components/uiComponents/Post';
import { Header } from './components/uiComponents/Header';
import { Grid } from './components/Layout';

export const dynamic = 'auto',
  dynamicParams = 'true',
  revalidate = 0,
  fetchCache = 'auto',
  runtime = 'nodejs',
  preferredRegion = 'auto'

async function getPosts() {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const posts = await pb.collection('posts').getList(1, 50);
  return posts?.items as any[];
}


export default async function Home() {
  const posts = await getPosts();
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header title={''}>
        Something Else
      </Header>
      <Grid>
        {posts?.map((post) => (
          <Post postObj={post}></Post>
        ))}
      </Grid>
    </main>
  )
}
