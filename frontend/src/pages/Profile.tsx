import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { fetchedUserApi } from "../apis/fetchedUserApi";
import { useNavigate } from "react-router";

const Profile = () => {
    const navigate = useNavigate();

    const { data, isPending } = useQuery({
        queryKey: ["user"],
        queryFn: fetchedUserApi,
    });

    useEffect(() => {
        if (!isPending && !data) {
            navigate("/login");
        }
    }, [data, isPending, navigate]);

    if (isPending) {
        return (
            <div className="flex h-screen flex-col items-center justify-center">
                <div className="h-7 w-7 animate-spin rounded-full border-2" />
                <span className="mt-3 text-sm font-medium">
                    Loading rider details...
                </span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

                <div className="flex flex-col items-center">
                    <div className="h-20 w-20 rounded-full bg-black text-white flex items-center justify-center text-2xl font-bold">
                        {data?.name?.charAt(0)}
                    </div>

                    <h2 className="mt-4 text-xl font-semibold">{data?.name}</h2>
                    <p className="text-gray-500 text-sm">{data?.email}</p>

                    <span
                        className={`mt-2 text-xs px-3 py-1 rounded-full ${data?.isVerified
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                            }`}
                    >
                        {data?.isVerified ? "Verified" : "Not Verified"}
                    </span>
                </div>

                <div className="border-t my-6"></div>

                <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                        <span className="text-gray-500">User ID</span>
                        <span className="font-medium">{data?._id}</span>
                    </div>

                    <div className="flex justify-between">
                        <span className="text-gray-500">Joined</span>
                        <span className="font-medium">
                            {new Date(data?.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;