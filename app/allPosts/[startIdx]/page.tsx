import PocketBase, { ListResult } from 'pocketbase'
import Link from "next/link";
import { Post } from '@/components/uiComponents/Post';
import { Header } from '@/components/uiComponents/Header';
import { Grid } from '@/components/Layout';
import { PostModel } from '@/types';
import { u_p_server } from '@/utils/u_paths';
import { NavUList } from '@/components/Lists';
import { Main } from '@/components/Frames';

export const dynamic = 'auto',
    dynamicParams = 'true',
    revalidate = 0,
    fetchCache = 'auto',
    runtime = 'nodejs',
    preferredRegion = 'auto'

const postsConfig = {
    numPerPage: 2,
}

/**
 * Retrieve the current page.
 * @param params 
 * @returns 
 */
async function getServerideParams(params: any) {
    const { startIdx } = params.startIdx;
    if (!startIdx) {
        return 1;
    }
    return startIdx;
}

/**
 * Retrieve a list result of PostModels.
 * @returns A list result of PostModels, containing excessive paging information.
 */
async function getPosts(startIdx: number): Promise<ListResult<PostModel>> {
    const pb = new PocketBase(u_p_server.BASE_URL);
    const postListResult = await pb.collection<PostModel>('posts').getList(startIdx, postsConfig.numPerPage);
    return postListResult;
}

export default async function Home({ params }: any) {
    let startIdx = params.startIdx;
    let postLR = await getPosts(startIdx);

    return (
        <Main title="BBS">
            {/* Header */}
            <Header title={'Posts'}>
                <NavUList>
                    <Link href={'https://www.google.com'}> About Us</Link>
                    <Link href={'https://www.google.com'}> Me</Link>
                </NavUList>
            </Header>

            {/* Post Grid */}
            <Grid>
                {postLR?.items.map((postModel, index) => (
                    <Post key={index} postModel={postModel}></Post>
                ))}
            </Grid>

            <Link href={`/allPosts/${2}`}>
                2
            </Link>
        </Main>
    )
}
