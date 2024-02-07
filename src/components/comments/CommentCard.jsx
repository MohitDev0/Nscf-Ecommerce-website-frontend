import React from 'react'

const CommentCard = ({ comment, user }) => {
  return (
    <div className='comment'>
      {user &&
        <div className='commentUserImg flex justify-center m-6'>
          <img className='w-16 h-16 border-2 rounded-full ' src={user?.profilePicture ? user.profilePicture : "images/blankProfile.jpg"} alt="" />
        </div>
      }
      <p className='comment text-2xl mb-6'>{comment.commentDisc}</p>
      <h1 className='commentUser capitalize'>{comment.name ? comment.name : user.username}</h1>
      <h3>Customer</h3>
    </div>
  )
}

export default CommentCard