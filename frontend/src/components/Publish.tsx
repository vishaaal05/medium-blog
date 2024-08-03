import React, { useState } from "react";
import axios from "axios";
import Appbar from "./Appbar";
import { BACKEND_URL } from "../config";

const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handlePublish = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("You need to be signed in to publish a blog.");
            return;
        }

        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title,
                content
            }, {
                headers: {
                    Authorization: localStorage.getItem('token')
                }
            });

            if (response.status === 200) {
                alert("Your blog is live now");
            }
        } catch (error) {
            console.error("Error publishing blog:", error);
            alert("Failed to publish your blog. Please try again.");
        }
    };

    return (
        <div>
            <div>
                <Appbar />
            </div>
            <div className="w-4/5 mx-auto">
                <label htmlFor="title" className="block mb-2 font-bold text-xl mt-4">Title</label>
                <input 
                    type="text" 
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} // Update title state
                    className="w-4/5 border border-black rounded-md bg-gray-50 p-2" 
                    placeholder="Write your title here" 
                />
                <label htmlFor="message" className="block mb-2 mt-4 font-bold text-xl">Content</label>
                <textarea 
                    id="message" 
                    rows="4" 
                    value={content}
                    onChange={(e) => setContent(e.target.value)} // Update content state
                    className="block p-2.5 w-full text-sm bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                    placeholder="Write your thoughts here..."
                ></textarea>
                <button 
                    type="button" 
                    onClick={handlePublish} // Attach the click handler
                    className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 my-3 me-3 mb-1 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                    Publish
                </button>
            </div>
        </div>
    );
};

export default Publish;
