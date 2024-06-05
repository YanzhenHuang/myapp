import Link from "next/link";
import { Key } from "react";
import { UList } from "@/components/Lists";

/**
 * A specialized button that directs to a page with a specific index.
 * @param props 
 * @prop {Key} index - The index of the page.
 * @prop {string} destination - The destination root of the page.
 * @example
 * <PageSelector index={1} destination="allPosts" />
 * @returns 
 */
export const PageSelector = (props: { index: Key, destination: string }) => {
    const index = props.index;
    const nominalIndex = Number(index.toString()) + 1;
    const destination = props.destination.replace(/\//g, "");

    return (
        <div className="w-14 h-14 flex justify-center items-center bg-white hover:bg-themeColor hover:scale-105 hover:cursor-pointer transition-all rounded-md">
            <Link key={index} href={`/${destination}/${nominalIndex}`} className="w-full h-full hover:text-white">
                <div className="text-center font-bold text-justify pl-5 pt-4 w-full h-full">
                    {nominalIndex}
                </div>
            </Link>
        </div>
    );
}

/**
 * A specialized button list that allows user to navigate between pages.
 * @param props 
 * @prop {string} destination - The common destination root of the buttons.
 * @prop {number} numOfPage - Number of Pages.
 * @returns 
 */
export const PageSelectorList = (props: { destination: string, numOfPage: number }) => {
    const numOfPage = Math.max(0, props.numOfPage);
    return (
        <UList flexDirection="row" gap={5}>
            {
                Array.from(new Array(numOfPage)).map((_, index) => (
                    <PageSelector key={index} index={index} destination={props.destination}></PageSelector>
                ))
            }
        </UList>
    );
}