import Image from 'next/image'
import PocketBase, { ListResult } from 'pocketbase'
import Link from "next/link";
import { Post } from './components/uiComponents/Post';
import { Header } from './components/uiComponents/Header';
import { Grid } from './components/Layout';
import { PostModel } from '@/types';
import { u_p_server } from '@/utils/u_paths';
import { UList, NavUList } from './components/Lists';
import { Main } from './components/Frames';

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
  const url = u_p_server.BASE_URL;
  const pb = new PocketBase(u_p_server.BASE_URL);
  const postListResult = await pb.collection<PostModel>('posts').getList(1, 50);
  return postListResult;
}

export default async function Home() {
  const postLR = await getPosts();
  return (
    <Main title="BBS">
      {/* Header */}
      <Header title={'Posts'}>
        <NavUList>
          <Link href={'https://www.google.com'}> About Us</Link>
          <Link href={'https://www.google.com'}> Me</Link>
        </NavUList>
      </Header>

      <Grid>
        {postLR?.items.map((postModel) => (
          <Post postModel={postModel}></Post>
        ))}
      </Grid>

    </Main>
  )
}
