import Link from "next/link";
import { Header } from "@/components/uiComponents/Header";
import Head from "next/head";
import { Post } from "@/components/uiComponents/Post";

async function getPost(postID: string) {
    const res = await fetch(`http://127.0.0.1:8090/api/collections/posts/records/${postID}`,
        {
            next: { revalidate: 10 },
        });

    const data = await res.json();
    return data;
}

export default async function PostPage({ params }: any) {
    const post = await getPost(params.id);
    return (
        <main className="min-h-screen">
            <Header />
            <div className="p-10">
                <div className="mb-3">
                    <p className="font-bold text-3xl">
                        <Link href="../" className="opacity-50">Posts /</Link>
                        {` ${post.id}`}
                    </p>
                </div>
                <Post postModel={post} haveHoverEffect={false}></Post>
            </div>
        </main>
    )
}