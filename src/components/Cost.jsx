import { useState } from "react";
import useAxiosSecure from "../Hook/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const Cost = () => {
    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true);
    const { data: costs = [], refetch } = useQuery({
        queryKey: ["cost"],
        queryFn: async () => {
            const res = await axiosSecure.get("/cost", {});
            if (res.data) {
                setLoading(false);
            }
            return res.data;
        },
    });

    const showSuccessAlert = () => {
        Swal.fire({
            icon: "success",
            title: "Success...",
            text: "Publish success",
        });
    };
    const handleDeleteNoticce = (cost) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/cost/${cost?._id}`).then((res) => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            title: "Deleted!",
                            text: "Your file has been deleted.",
                            icon: "success",
                        });
                    }
                });
            }
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { title, date, cost } = e.target.elements;

        const costTitle = title.value;
        const costDate = date.value;
        const costDetails = cost.value;

        const postDate = new Date().toLocaleDateString();

        const formData = {
            costTitle: costTitle,
            costDate: costDate,
            postDate: postDate,
            costDetails: costDetails,
        };

        axiosSecure.post("/cost", formData).then(() => {
            refetch();
            showSuccessAlert();
        });
    };
    if (loading === true) {
        return <>
            <h2>Loading</h2>
        </>;
    }
    return (
        <div className="">
            <div className="card bg-gradient-to-b from-blue-400 to-blue-600">
                <div className="text-2xl pt-3 pb-2 text-white font-bold">
                    Add a cost
                </div>
                <div className="text-white">
                    <h4>Total Publish cost : {costs?.length}</h4>
                </div>
                <hr className="border-b-1 border-purple-400" />
                <form className="p-4" onSubmit={handleSubmit}>
                    <div className="flex justify-between gap-4">
                        <input
                            type="text"
                            name="title"
                            className="input input-bordered w-1/2 mb-2"
                            placeholder="Title"
                        />
                        <input
                            type="date"
                            name="date"
                            className="input input-bordered w-1/2 mb-2"
                        />
                    </div>

                    <textarea
                        type="text"
                        name="cost"
                        rows="5"
                        cols="50"
                        className="  w-full   mb-2 textarea textarea-bordered"
                        placeholder="cost "
                    />

                    <br />
                    <div className="flex justify-end gap-4">

                        <button type="submit" className="btn">
                            Add cost
                        </button>
                    </div>
                </form>
            </div>
            <div className="card w-full glass">
                <div className="overflow-x-auto">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>no</th>
                                <th>title</th>
                                <th>cost Date </th>
                                <th>Create Date </th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {costs?.map((cost, index) => (
                                <tr key={cost?._id}>
                                    {" "}
                                    <td>{index + 1}</td>
                                    <Link
                                        className="text-blue-800 "
                                        to={`/cost/${cost?._id}`}
                                    >
                                        <p>
                                            <td className="text-blue-500">{cost?.costTitle}</td>
                                        </p>
                                    </Link>
                                    <td>{cost.postDate}</td>
                                    <td>{cost.costDate}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDeleteNoticce(cost)}
                                            className="btn btn-sm btn-error"
                                        >
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Cost;