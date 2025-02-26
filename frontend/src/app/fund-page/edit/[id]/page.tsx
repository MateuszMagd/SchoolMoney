'use client'

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { FundExtendedInfo } from "@/data/interfacesUser";

const EditFundPage = () => {
    const { id } = useParams();
    const router = useRouter();
    const [fund, setFund] = useState<FundExtendedInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchFund = async () => {
            try {
                //const data = await getFundById(id);
                //setFund(data);
            } catch (err) {
                setError("Failed to load fund details.");
            } finally {
                setLoading(false);
            }
        };

        if (id) fetchFund();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (fund) {
            setFund({ ...fund, [e.target.name]: e.target.value });
        }
    };

    const handleSave = async () => {
        if (!fund) return;
        try {
            //await updateFund(id, fund);
            alert("Fund updated successfully!");
            router.push("/funds");
        } catch (err) {
            setError("Failed to update fund.");
        }
    };

    if (loading) return <p className="text-center text-gray-600">Loading...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
            <h1 className="text-2xl font-bold mb-6 text-center">Edit Fund</h1>
            {fund && (
                <div className="space-y-4">
                    <label className="block">
                        <span className="text-gray-700">Fund Name:</span>
                        <input
                            type="text"
                            name="name"
                            value={fund.name}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Start Date:</span>
                        <input
                            type="date"
                            name="startDate"
                            value={fund.startDate}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">End Date:</span>
                        <input
                            type="date"
                            name="endDate"
                            value={fund.endDate}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Goal:</span>
                        <input
                            type="number"
                            name="goal"
                            value={fund.goal}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md"
                        />
                    </label>
                    <label className="block">
                        <span className="text-gray-700">Description:</span>
                        <textarea
                            name="description"
                            value={fund.description}
                            onChange={handleChange}
                            className="w-full p-2 border rounded-md h-24"
                        ></textarea>
                    </label>
                    <div className="flex justify-between mt-4">
                        <button onClick={() => router.push("/funds")} className="bg-gray-400 text-white px-4 py-2 rounded-md">Cancel</button>
                        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-md">Save Changes</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EditFundPage;