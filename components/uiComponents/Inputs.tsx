"use client"
import React, { useState } from 'react';
import { ReactGetSetState } from "@/types";
import { FaUser } from "@react-icons/all-files/fa/FaUser";

/**
 * A standardized input component for forms.
 * @param props 
 * @prop {string} placeholder - The placeholder text for the input.
 * @prop {string} type - The type of input (e.g. "text", "email", "password").
 * @prop {string} name - The name of the input field.
 * @prop {ReactGetSetState<string>} state - The state object containing the current value of the input.
 * @returns 
 */
export const FormInput = (props: { placeholder: string, type?: string, name: string, state: ReactGetSetState<string> }) => {
    const inputStyles = "w-80 p-3 rounded-md border-2 border-gray focus:border-themeColor focus:outline-none";
    const [labelColor, setLabelColor] = useState<"text-themeColor font-semibold" | "text-gray-400 font-medium">("text-gray-400 font-medium");
    return (
        <div>
            <div className={`text-gray ${labelColor} text-sm pl-2 pb-0.5 `}>
                <p>{props.placeholder}</p>
            </div>
            <input
                placeholder={props.placeholder}
                type={props.type}
                name={props.name}
                className={inputStyles}
                onChange={(e) => {
                    props.state.setState(e.target.value);
                }}

                onFocusCapture={() => { setLabelColor("text-themeColor font-semibold") }}
                onBlur={(e) => { setLabelColor("text-gray-400 font-medium") }}
            ></input>
        </div>
    );
}

/**
 * A standardized input for user avatars (Profile Picture).
 * @param props 
 * @prop {function} setAvatar - A React state-setting function to set the avatar file object.
 * @returns 
 */
export const AvatarInput = (props: { setAvatar: (f: Blob) => void }) => {
    const avatarDivRef = React.createRef<HTMLDivElement>();
    const fileInputRef = React.createRef<HTMLInputElement>();

    const [m_avatarURL, setAvatarURL] = useState<string>();
    const [m_avatarUsrIconDisplay, setAvatarUsrIconDisplay] = useState<"hidden" | "">();

    return (
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
                        props.setAvatar(fileObj);
                        setAvatarURL(URL.createObjectURL(fileObj));
                        setAvatarUsrIconDisplay("hidden");
                    }
                }}></input>
            <FaUser className={`w-full h-full p-10 text-white ${m_avatarUsrIconDisplay}`} />
        </div>
    );
}