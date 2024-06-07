import { Key, ReactNode } from "react"

/** 
 * Properties of a UList component.
 * @prop {ReactNode | ReactNode[]} children - The child elements of this UList component.
 * @prop {"row" | "column"} flexDirection - The flex direction of the list.
 * @prop {Number} gap - The gap among which the list items settles.
 * @prop {string} l_className - The excessive styles of the list.
 */
type UListProps = {
    children: (ReactNode | ReactNode[]),
    flexDirection?: "row" | "column",
    gap?: Number,
    l_className?: string
};

/**
 * A standard list component that automatically generates a list from the given list of items.
 * @param {UListProps} props - Property of the list. 
 * @returns 
 */
export const UList = (props: UListProps) => {

    const className = `flex ${props.flexDirection || "row"} gap-${props.gap || 3} items-center` + " " + (props.l_className || "");

    if (!Array.isArray(props.children)) {
        return props.children;
    }

    return (
        <ul className={className}>
            {props.children?.map((item: ReactNode, index: Key) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
    )
}

/**
 * A standard navigation list component that automatically generates a list from the given list of items.
 * @param {UListProps} props - Property of the list. 
 * @returns 
 */
export const NavUList = (props: UListProps) => {
    return (
        <nav>
            {UList(props)}
        </nav>
    );
}