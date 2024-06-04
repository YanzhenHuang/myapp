import Image from 'next/image'
import PocketBase, { ListResult } from 'pocketbase'
import Link from "next/link";
import { Post } from './components/uiComponents/Post';
import { Header } from './components/uiComponents/Header';
import { Grid } from './components/Layout';
import { PostModel } from '@/types';

export const dynamic = 'auto',
  dynamicParams = 'true',
  revalidate = 0,
  fetchCache = 'auto',
  runtime = 'nodejs',
  preferredRegion = 'auto'

/**
 * Retrieve a list result of PostModels.
 * @returns A list result of PostModels, containing excessive paging information.
 */
async function getPosts(): Promise<ListResult<PostModel>> {
  const pb = new PocketBase('http://127.0.0.1:8090');
  const postListResult = await pb.collection<PostModel>('posts').getList(1, 50);
  return postListResult;
}

export default async function Home() {
  const postLR = await getPosts();
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header title={'Posts'}>
        Something Else
      </Header>
      <Grid>
        {postLR?.items.map((postModel) => (
          <Post postModel={postModel}></Post>
        ))}
      </Grid>

    </main>
  )
}
