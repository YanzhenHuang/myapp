"use client"
import { ReactNode } from "react";

const btnStyles = "pt-2 pb-2 pl-5 pr-5 rounded-md hover:scale-[1.02] hover:opacity-80 transition-all";

const getBtnVariation = (bgColor: string, textColor: string) => {
    return `text-${textColor} bg-${bgColor}`;
}

export interface BaseButtonProps {
    children: ReactNode | ReactNode[];
    onClickDo: (e: React.MouseEvent<HTMLButtonElement>) => any | Promise<any>;
    onExceptionDo?: (err: any) => any;
}

export interface ButtonProps extends BaseButtonProps {
    bgColor: string;
    textColor: string;
}

export const Button = (props: ButtonProps) => {
    let styles = getBtnVariation(props.bgColor, props.textColor) + " " + btnStyles;

    // Unify sync & async functions.
    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const result = props.onClickDo(e);
        if (result! instanceof Promise) {
            return;
        }

        try {
            await result;
        }
        catch (err: any) {
            props.onExceptionDo && props.onExceptionDo(err);
        }
    }

    return (
        <button className={styles} onClick={(e) => { handleClick }}>{props.children}</button>
    );
};

export const PrimaryButton = (props: BaseButtonProps) => {
    return (
        <Button bgColor={"themeColor"} textColor={"white"} onClickDo={props.onClickDo}>{props.children}</Button>
    );
};