"use client"

import { Main } from "@/components/Frames";
import React, { useState } from "react";
import PocketBase, { ClientResponseError, RecordAuthResponse, RecordModel } from 'pocketbase';
import { u_p_server } from "@/utils/u_paths";
import { FormInput } from "@/components/uiComponents/Inputs";
import { useRouter } from 'next/navigation';
import { getCookie, setCookie, deleteCookie } from 'cookies-next'
import { pb } from '@/utils/u_pocketbase'

// const pb = new PocketBase(u_p_server.BASE_URL);

interface ErrData {
    code: string;
    message: string;
}

const Signin = async (identity: string, pwd: string): Promise<RecordAuthResponse<RecordModel>> => {
    const authData = await pb.collection('users').authWithPassword(identity, pwd);
    return authData;
}

export default function Home() {
    // User Name
    const [m_identity, setIdentity] = useState<string>("");

    // Password
    const [m_pwd, setPwd] = useState<string>("");

    const router = useRouter();

    return (
        <Main title={"Sign In"}>
            {pb.authStore.isValid}
            <div className="absolute top-32 flex flex-col bg-white gap-5 p-24 items-center rounded-xl hover:cursor-pointer hover:scale-[1.02] transition-all shadow-lg">

                {/* Input Informations */}
                <FormInput
                    placeholder="User Name or Email"
                    type="text"
                    name="identity"
                    state={{ 'state': m_identity, 'setState': setIdentity }}>
                </FormInput>

                <FormInput
                    placeholder="Password"
                    type="password"
                    name="password"
                    state={{ 'state': m_pwd, 'setState': setPwd }}>
                </FormInput>


                {/* Submit Button */}
                <button
                    className="text-white bg-themeColor pt-2 pb-2 pl-5 pr-5 mt-5 font-bold rounded-md hover:scale-[1.02] hover:opacity-80 transition-all"
                    onClick={async (e) => {
                        try {
                            await Signin(m_identity, m_pwd).then(() => {
                                let model = pb.authStore.model;
                                let token = pb.authStore.token;

                                setCookie('PB_AUTH_ID', model?.id);
                                setCookie('PB_AUTH_TOKEN', token);

                            });
                        } catch (err: any) {
                            let msg = `Erro: ${err.message}. \n Check your user name / email and password.`
                            window.alert(msg);
                        }
                    }}>
                    Submit
                </button>

                <button
                    className="text-white bg-themeColor pt-2 pb-2 pl-5 pr-5 mt-5 font-bold rounded-md hover:scale-[1.02] hover:opacity-80 transition-all"
                    onClick={(e) => {
                        pb.authStore.clear();
                        deleteCookie('PB_AUTH_ID');
                        deleteCookie('PB_AUTH_TOKEN');
                    }}>
                    Clear
                </button>

            </div>

        </Main >
    );
}