import { PostModel } from "@/types";
import Link from "next/link";

/**
 * A card-styled post component.
 * @param props 
 * @prop {PostModel} postModel - The post model inputted into the component.
 * @returns 
 */
export const Post = (props: { postModel: PostModel, haveHoverEffect?: boolean }) => {
    let post = props.postModel;
    let haveHoverEffect = props.haveHoverEffect ?? true;
    return (
        <div className={`bg-white w-96 h-48 overflow-hidden rounded hover:cursor-pointer ${haveHoverEffect && `hover:scale-105`} transition-all`}>
            <Link href={`/posts/${post.id}`} key={post.id} className={'w-full h-full'}>
                <div className={'w-full h-full  p-5'}>
                    <h2 className={'font-bold'}>{post.id}</h2>
                    <p>{post.content}</p>
                </div>
            </Link>
        </div>
    );
}

