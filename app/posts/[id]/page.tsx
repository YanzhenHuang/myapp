import Link from "next/link";

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
            <div>
                <h1><Link href="../">posts</Link> / {post.id}</h1>
                <p>{post.content}</p>
            </div>
        </main>
    )
}