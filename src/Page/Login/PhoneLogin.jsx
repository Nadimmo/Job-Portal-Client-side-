import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../AuthProvider/AuthProvider";

function PhoneLogin() {
    const { phoneSignIn } = useContext(AuthContext);
    const [phone, setPhone] = useState("");
    const [otp, setOtp] = useState("");
    const [confirmationResult, setConfirmationResult] = useState(null);

    const handleSendOtp = () => {
        phoneSignIn(phone)
            .then((result) => {
                setConfirmationResult(result);
                Swal.fire("OTP sent!", "Check your phone.", "success");
            })
            .catch((err) => {
                console.error(err);
                Swal.fire("Error", err.message, "error");
            });
    };

    const handleVerifyOtp = () => {
        confirmationResult
            .confirm(otp)
            .then((result) => {
                Swal.fire("Success", "Phone login successful!", "success");
            })
            .catch((err) => {
                console.error(err);
                Swal.fire("Error", "Invalid OTP", "error");
            });
    };

    return (
        <div className="bg-white rounded shadow mt-4">
            <input
                type="tel"
                placeholder="+8801XXXXXXXXX (Your phone number)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded-lg text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent border p-2 w-full mb-3"
            />
            <button onClick={handleSendOtp} className="bg-blue-500 text-white px-4 py-2 rounded w-full cursor-pointer">
                Send OTP
            </button>

            {confirmationResult && (
                <>
                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        className="border p-2 w-full mt-4 mb-3"
                    />
                    <button onClick={handleVerifyOtp} className="bg-blue-500 text-white px-4 py-2 rounded w-full cursor-pointer">
                        Verify OTP
                    </button>
                </>
            )}

            {/* Required reCAPTCHA container */}
            <div id="recaptcha-container" />
        </div>
    );
}

export default PhoneLogin;
