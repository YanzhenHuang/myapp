"use client"

import { Main } from "@/components/Frames";
import React, { useState } from "react";
import PocketBase, { ClientResponseError } from 'pocketbase';
import { u_p_server } from "@/utils/u_paths";
import { AvatarInput, FormInput } from "@/components/uiComponents/Inputs";
import { UserRegisterModel } from "@/types";

const pb = new PocketBase(u_p_server.BASE_URL);

interface ErrData {
    code: string;
    message: string;
}

export default function Home() {
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

    const Register = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        // Summarize user upload data
        let json = {
            'username': m_userName,
            'email': m_email,
            'password': m_pwd,
            'passwordConfirm': m_confirmPwd,
            'avatar': m_avatar,
        } as UserRegisterModel;

        // Register User
        try {
            const record = await pb.collection('users').create<UserRegisterModel>(json).then(() => {
                window.location.href = "/allPosts/1"
            });
        } catch (e: any) {
            let dataArr = Object.values(e.data.data) as ErrData[];
            let dataArrKey = Object.keys(e.data.data);
            let errMessages = e.message + "\n";

            dataArr.map((data, index) => {
                let indexNum = (index + 1).toString() + " ";
                errMessages += indexNum + ". " + dataArrKey[index] + ": " + data.message + "\n";
            });
            alert(errMessages);
        }
    }

    return (
        <Main>
            <form>
                <div className="flex flex-col bg-white gap-5 p-32 items-center">
                    {/* User Avatar Input*/}
                    <AvatarInput setAvatar={setAvatar} />

                    {/* Input Informations */}
                    <FormInput
                        placeholder="User Name"
                        type="text"
                        name="username"
                        state={{ 'state': m_userName, 'setState': setUserName }}>
                    </FormInput>

                    <FormInput
                        placeholder="Email"
                        type="email"
                        name="email"
                        state={{ 'state': m_email, 'setState': setEmail }}>
                    </FormInput>

                    <FormInput
                        placeholder="Set Password"
                        type="password"
                        name="password"
                        state={{ 'state': m_pwd, 'setState': setPwd }}>
                    </FormInput>

                    <FormInput
                        placeholder="Confirm Password"
                        type="password"
                        name="passwordConfirm"
                        state={{ 'state': m_confirmPwd, 'setState': setConfirmPwd }}>
                    </FormInput>

                    {/* Submit Button */}
                    <button
                        className="text-white bg-themeColor pt-2 pb-2 pl-5 pr-5 rounded-md hover:scale-[1.02] hover:opacity-80 transition-all"
                        onClick={async (e) => { Register(e) }}>
                        Submit
                    </button>

                </div>
            </form>
        </Main >
    );
}