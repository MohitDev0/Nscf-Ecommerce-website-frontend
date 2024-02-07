import axios from 'axios';
import React, { useEffect, useState } from 'react'
import CommentCard from './CommentCard';
import "./Comment.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "react-hot-toast";

const Comments = () => {
    const url = process.env.REACT_APP_BASE_URL;
    const [comments, setComments] = useState([]);
    const [commentIndex, setCommentIndex] = useState(0);
    const [showEditCommentCard, SetshowEditCommentCard] = useState(false);
    const [specificUserComments, setSpecificUserComments] = useState();
    const [ActiveCommentEditForm, SetActiveCommentEditForm] = useState({
        active: false,
        number: null
    });
    const token = localStorage.getItem("jwt");
    useEffect(() => {
        const getComments = async () => {
            const res = await axios.get(url + "comment/");
            setComments(res.data);
        }
        getComments();
    }, [url])
    setTimeout(() => {
        const interval = setCommentIndex((i) => i < comments.length - 1 ? i + 1 : 0);
        return () => clearInterval(interval);
    }, 5000);

    const openComments = async () => {
        await axios.get(url + "user/find/user", {
            headers: {
                Authorization: token
            }
        }).then(async (res) => {
            await axios.get(url + "comment/" + res.data._id)
                .then((getAllUserComments) => {
                    setSpecificUserComments(getAllUserComments.data);
                }).catch((err) => {
                    toast.error("Something wrong happen");
                })
        }).catch(() => {
            toast.error("Something wrong happen");
        })
        SetshowEditCommentCard(true);
    }

    const editComment = async (values, commentDetails) => {
        values.preventDefault();
        await axios.put(url + "comment/update/" + commentDetails._id, { userId: commentDetails.userId, name: values.target.comment_title.value, commentDisc: values.target.commentDesc.value })
            .then((res) => {
                toast.success("Comment update Successfully");
            })
            .catch((err) => {
                toast.error("Error occur Try again later");
            })
        SetshowEditCommentCard(false);
        SetActiveCommentEditForm({ active: false, number: null })
    }

    const DeleteComment = async (e, commentId) => {
        e.stopPropagation();
        await axios.delete(url + "comment/delete/" + commentId)
            .then((res) => {
                toast.success("Comment delete Successfully");
            })
            .catch((err) => {
                toast.error("Error occur Try again later");
            })
        SetshowEditCommentCard(false);
        SetActiveCommentEditForm({ active: false, number: null })
    }
    return (
        <div className='comments text-center left-0 right-0 m-auto flex justify-center text-white items-center  py-[13%]'>
            <div className='editComment'>
                <span onClick={() => {
                    openComments();
                }}><EditIcon /></span>
            </div>
            {showEditCommentCard && <div className='editCommentCard'>
                <div className='edit_comment_card_container'>
                    {specificUserComments.map((com, index) => {
                        return (
                            <div className='show_comment_wrapper' key={index}>
                                <div className='close_icon' onClick={() => {
                                    SetshowEditCommentCard(false);
                                    SetActiveCommentEditForm({ active: false, number: null })
                                }}>X</div>
                                <div className='editCom_Card' onClick={() => SetActiveCommentEditForm({ active: true, number: index })}>
                                    <span className='commentDeleteIcon' onClick={(e) => {
                                        DeleteComment(e, com._id);
                                    }}><DeleteIcon /></span>
                                    <h1 className='editCom_card_name'>{com.name}</h1>
                                    <p className='editCom_card_desc'>{com.commentDisc}</p>
                                </div>
                                {ActiveCommentEditForm.active && ActiveCommentEditForm.number === index &&
                                    <div className='Edit_comment_form_container'>
                                        <form className='comment_edit_form' onSubmit={(val) => editComment(val, com)}>
                                            <label>Name:</label>
                                            <input type='text' defaultValue={com.name} name="comment_title"></input>
                                            <label>Comment:</label>
                                            <textarea defaultValue={com.commentDisc} name="commentDesc"></textarea>
                                            <button className='comment_edit_submit' type='submit'>Edit</button>
                                        </form>
                                    </div>
                                }
                            </div>
                        );
                    })}
                </div>
            </div>}
            <div className='m-4'>
                <h1 className='font-serif'>Our Clients Testimonials</h1>
                {comments.map((c, index) => commentIndex === index && <CommentCard comment={c.comment} user={c.user} key={index} />
                )}
            </div>

        </div>
    )
}

export default Comments