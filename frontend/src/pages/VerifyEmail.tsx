import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { axiosInstance } from "../config/axiosInstance";
import toast from "react-hot-toast";
import axios from "axios";

const VerifyEmail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            if (!id) return;

            try {
                const res = await axiosInstance.patch("/api/v1/auth/verify/email", {
                    token: id,
                });

                if (res.status === 200) {
                    toast.success(res.data.msg);
                    navigate("/login");
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    toast.error(error.response?.data?.msg || "Verification failed");
                }
            }
        };

        verifyEmail();
    }, [id, navigate]);

    return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-lg font-medium">Verifying your email...</p>
        </div>
    );
};

export default VerifyEmail;