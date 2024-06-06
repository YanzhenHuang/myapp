"use client"

import { Main } from "@/components/Frames";
import React, { useRef, useState } from "react";
import { FaUser } from '@react-icons/all-files/fa/FaUser';
import { IconType } from "@react-icons/all-files";
import PocketBase from 'pocketbase';
import { u_p_server } from "@/utils/u_paths";

type State = {
    'var': string,
    'func': Function,
};

const pb = new PocketBase(u_p_server.BASE_URL);


const FormInput = (props: { placeholder: string, type?: string, name: string, state: State }) => {
    const inputStyles = "w-80 p-3 rounded-md border-2 border-gray focus:border-themeColor focus:outline-none";
    return (
        <input
            placeholder={props.placeholder}
            type={props.type}
            name={props.name}
            className={inputStyles}
            onChange={(e) => {
                props.state.func(e.target.value);
            }}></input>
    );
}

export default function Home() {
    const avatarDivRef = React.createRef<HTMLDivElement>();
    const fileInputRef = React.createRef<HTMLInputElement>();
    const avatarRef = React.createRef<IconType>();
    const formRef = React.createRef<HTMLFormElement>();

    // User Name
    const [m_userName, setUserName] = useState<string>("");

    // Email
    const [m_email, setEmail] = useState<string>("");

    // Password
    const [m_pwd, setPwd] = useState<string>("");

    // Confirm Password
    const [m_confirmPwd, setConfirmPwd] = useState<string>("");

    // Avatar
    const [m_avatar, setAvatar] = useState<Blob>();
    const [m_avatarURL, setAvatarURL] = useState<string>();
    const [m_avatarUsrIconDisplay, setAvatarUsrIconDisplay] = useState<"hidden" | "">("");

    const gatherFormData = (e: React.FormEvent<HTMLFormElement>): any => {
    };

    return (
        <Main>
            <form ref={formRef} >
                <div className="flex flex-col bg-white gap-5 p-32 items-center">
                    {/* User Avatar Input*/}
                    <div
                        ref={avatarDivRef}
                        onClick={() => { fileInputRef.current?.click(); }}
                        style={{
                            backgroundImage: `url(${m_avatarURL})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                        }}
                        className="bg-themeColorUltraLight h-32 w-32 rounded-full hover:cursor-pointer">

                        <input type="file" ref={fileInputRef} className="hidden"
                            onChangeCapture={(e: React.FormEvent<HTMLInputElement>) => {
                                let target = e.target as HTMLInputElement;
                                if (target.files && target.files.length > 0) {
                                    let fileObj = target.files[0];
                                    setAvatar(fileObj);
                                    setAvatarURL(URL.createObjectURL(fileObj));
                                    setAvatarUsrIconDisplay("hidden");
                                }
                            }}></input>
                        <FaUser ref={avatarRef} className={`w-full h-full p-10 text-white ${m_avatarUsrIconDisplay}`} />
                    </div>

                    <FormInput placeholder="User Name" type="text" name="usrName" state={{ 'var': m_userName, 'func': setUserName }}></FormInput>
                    <FormInput placeholder="Email" type="email" name="email" state={{ 'var': m_email, 'func': setEmail }} ></FormInput>
                    <FormInput placeholder="Set Password" type="password" name="pwd" state={{ 'var': m_pwd, 'func': setPwd }}></FormInput>
                    <FormInput placeholder="Confirm Password" type="password" name="pwdConfirm" state={{ 'var': m_confirmPwd, 'func': setConfirmPwd }}></FormInput>

                    <button
                        className="text-white bg-themeColor pt-2 pb-2 pl-5 pr-5 rounded-md hover:scale-[1.02] hover:opacity-80 transition-all"
                        onClick={async (e) => {
                            e.preventDefault();
                            let fd = new FormData();
                            let json = {
                                'username': m_userName,
                                'email': m_email,
                                'password': m_pwd,
                                'passwordConfirm': m_confirmPwd,
                                'avatar': m_avatar,
                            };

                            try {
                                const record = await pb.collection('users').create(json);
                            } catch (e) {
                                console.log(e);
                            }

                        }}>Submit</button>
                </div>
            </form>
        </Main >
    );
}