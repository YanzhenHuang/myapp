import Link from "next/link";

export const Post = (props: any) => {
    let post = props.postObj;
    return (
        <Link href={`/posts/${post.id}`}
            key={post.id}
            className={'bg-white p-5 h-48  overflow-hidden rounded hover:cursor-pointer hover:scale-105 transition-all'}>
            <h2 className={'font-bold'}>{post.id}</h2>
            <p>{post.content}</p>
        </Link>
    );
}

