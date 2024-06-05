"use client"

import { Main } from "@/components/Frames";
import React, { useRef } from "react";
import { FaUser } from '@react-icons/all-files/fa/FaUser';
import { IconType } from "@react-icons/all-files";

const inputStyles = "w-80 p-3 rounded-md border-2 border-gray focus:border-themeColor focus:outline-none";

export default async function Home() {
    const avatarDivRef = React.createRef<HTMLDivElement>();
    const fileInputRef = React.createRef<HTMLInputElement>();
    const avatarRef = React.createRef<IconType>();

    return (
        <Main>
            'Hello World!'
            <form>
                <div className="flex flex-col bg-white gap-5 p-32 items-center">
                    <div
                        ref={avatarDivRef}
                        onClick={() => { fileInputRef.current?.click(); }}
                        onChangeCapture={(e) => { }}
                        className="bg-themeColorUltraLight h-32 w-32 rounded-full hover:cursor-pointer">
                        <input type="file" ref={fileInputRef} className="hidden"></input>
                        <FaUser ref={avatarRef} className="w-full h-full p-10 text-white" />
                    </div>
                    <input placeholder="Email" className={inputStyles}></input>
                    <input placeholder="Set Password" type="password" className={inputStyles}></input>
                    <input placeholder="Confirm Password" type="password" className={inputStyles}></input>
                </div>

            </form>
        </Main>
    );
}