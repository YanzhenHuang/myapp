import { ReactNode } from "react";

export const Main = (props: { children: ReactNode | ReactNode[], title?: string }) => {
    return (
        <main className="flex min-h-screen flex-col items-center">
            <title>
                {props.title || "Untitled"}
            </title>
            {props.children}
        </main>
    );
}