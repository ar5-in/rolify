import Button from "./Button.jsx";
import {useState} from "react";

export default function ({ onClick }) {
    const [showCredentials, setShowCredentials] = useState(false);
    const handleButtonClick = (data) => {
        onClick(data);
        setShowCredentials(false);
    }
    return <>
        <div className={`fixed bottom-0 right-0 z-20`}>
            <button className={`m-5 p-5 bg-white shadow-xl rounded-full`} onClick={() => setShowCredentials(value=>!value)}>Use Demo Credentials</button>
            {showCredentials && <div className={`absolute bottom-full right-0 mx-5 p-5 bg-white shadow-xl w-[80dvw] md:max-w-80`}>
                <div className={`flex flex-col gap-5`}>
                    <Button onClick={() => handleButtonClick({email:'recruiter@rolify.ar5.in', password:'demo-recruiter'})} label={`Login as a Recruiter`} />
                    <Button onClick={() => handleButtonClick({email:'johndoe@rolify.ar5.in', password:'demo-candidate'})} label={`Login as a Candidate`} />
                </div>
                <p className={`text-sm mt-5`}>
                    Note: You can create a new account with your email address to test notifications.
                </p>
            </div>}
        </div>
    </>
}
