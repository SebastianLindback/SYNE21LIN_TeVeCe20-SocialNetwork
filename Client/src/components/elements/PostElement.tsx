import moment from 'moment'
import React from 'react'
import { Post } from '../../models/Post'

interface props {
    post: Post
}

export default function PostElement({post} : props) {
  return (
    <li key={post.id} className="media bg-white text-dark p-4 mb-4 border rounded">   
        
        <img
            className="mr-3 rounded-circle"
            src={`https://i.pravatar.cc/75?=${post.senderId}`}
            alt={post.message}
        />

        <div className="media-body">
            <p className="mt-0 mb-1 lead font-weight-bold">{post.senderName}</p>
            <p className="mt-0 mb-1">{post.message}</p>
            <samp className="text-muted">{moment(post.createdDate).format("YYYY-MM-DD : HH:MM")}</samp>
        </div>
    </li>)
}
