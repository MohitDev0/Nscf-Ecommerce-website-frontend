import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from "react-hot-toast";
import "./addcomment.css";

const AddComment = () => {
    const url = process.env.REACT_APP_BASE_URL;
    const [userDetails, setUserDetails] = useState();
    const token = localStorage.getItem("jwt");

    useEffect(() => {
        const getuser = async () => {
            await axios.get(url + "user/find/user", {
                headers: {
                    Authorization: token
                }
            }).then((res) => {
                setUserDetails(res.data);
            }).catch(() => {
                toast.error("Something wrong happen");
            })
        }
        getuser();
    }, [url, token])


    const Submitform = async (data) => {
        data.preventDefault();
        const username = data.target.name.value;
        const commentText = data.target.Addcomment.value;

        const commentData = {
            userId: userDetails,
            name: username,
            commentDisc: commentText
        }

        await axios.post(url + "comment/add", commentData)
            .then((res) => {
                toast.success("Thanks for Commenting");
            })
            .catch((err) => {
                toast.error("Something went wrong Try again later");
            })
    }
    return (
        <div>
            <h1 className=' text-center text-green-700  text-5xl mb-3'>Feedback</h1>
            <form className='add_comment flex flex-col m-auto left-0 right-0 items-center' onSubmit={(data) => Submitform(data)}>
                <label htmlFor='name' className='addCommentTitle'><span className='text-lg'>Name :</span>
                    <input name="name" className='addCommentName border-current m-4 p-2' type="text" id='name' placeholder='Enter your name here' autoComplete="off"></input>
                </label>
                <textarea className='addCommentdesc border-current p-2 resize-none' placeholder='Add comment ...' name="Addcomment" id="Addcomment" cols="6" rows="5" autoComplete="off"></textarea>
                <button type='submit' className='border bg-pink-700 text-white rounded p-2 w-20 m-4'>Submit</button>
            </form>
        </div>
    )
}

export default AddComment;