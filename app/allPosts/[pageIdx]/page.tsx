import PocketBase, { ListResult } from 'pocketbase'
import Link from "next/link";
import { Post } from '@/components/uiComponents/Post';
import { Header } from '@/components/uiComponents/Header';
import { Grid } from '@/components/Layout';
import { PostModel, UserInfoModel } from '@/types';
import { u_p_server } from '@/utils/u_paths';
import { NavUList } from '@/components/Lists';
import { Main } from '@/components/Frames';
import { PageSelectorList } from '@/components/uiComponents/PageSelector';
import { RedirectType, redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { pb } from '@/utils/u_pocketbase'
import { RequestCookie, stringifyCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { List } from 'postcss/lib/list';


// const pb = new PocketBase(u_p_server.BASE_URL);

export const dynamic = 'auto',
    dynamicParams = 'true',
    revalidate = 0,
    fetchCache = 'auto',
    runtime = 'nodejs',
    preferredRegion = 'auto'

const postsConfig = {
    numPerPage: 10,
}

/**
 * Retrieve a list result of PostModels.
 * @returns A list result of PostModels, containing excessive paging information.
 */
async function getPosts(startIdx: number): Promise<ListResult<PostModel>> {
    // const pb = new PocketBase(u_p_server.BASE_URL);
    const postListResult = await pb.collection<PostModel>('posts').getList(startIdx, postsConfig.numPerPage, { sort: '-updated' });
    return postListResult;
}

/**
 * Retrieve user information using user id.
 * @param {string} uid - User id. 
 * @returns 
 */
async function getUserInfo(uid: string): Promise<UserInfoModel> {
    const userInfo = await pb.collection<UserInfoModel>('users').getOne(uid, { expand: 'username,email,name,avatar,created,updated' });
    return userInfo;
}

export default async function Home({ params }: any) {

    if (!cookies().get('PB_AUTH_TOKEN')) {
        redirect('/user/signin', RedirectType.replace);
    }

    // Get posts and pages
    let startIdx = params.pageIdx;
    let postLR = await getPosts(startIdx);

    // Get user information
    let _loginUid = cookies().get('PB_AUTH_ID');
    let loginUid = _loginUid?.value;
    let userInfo = await getUserInfo(loginUid as string);

    return (
        <Main title="BBS">
            {/* Header */}
            <Header title={'Posts'}>
                <NavUList gap={5}>
                    <p>Welcome, {userInfo.username}!</p>
                    <Link href={'/user/register/'}>Email: {userInfo.email}</Link>
                    <Link href={'/user/register/'}>
                        <img src={`${u_p_server.BASE_URL}/api/files/_pb_users_auth_/${loginUid}/${userInfo.avatar}`}
                            className={"w-10 h-10 object-cover rounded-full"} />
                    </Link>
                </NavUList>
            </Header>

            {/* Page Selector */}
            <br></br>
            <PageSelectorList destination={'allPosts'} numOfPage={postLR.totalPages} />

            {/* Post Grid */}
            <Grid>
                {postLR?.items.map((postModel, index) => (
                    <Post key={index} postModel={postModel}></Post>
                ))}
            </Grid>

        </Main>
    )
}
