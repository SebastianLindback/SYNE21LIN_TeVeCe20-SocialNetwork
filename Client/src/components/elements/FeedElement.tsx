import moment from 'moment'
import React from 'react'
import { FaRegCommentAlt } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import SubscribeButton from '../buttons/SubscribeButton'
import { Post } from '../../models/Post'

interface props {
    post : Post,
    buttons? : JSX.Element[]
}

export default function FeedElement({post} : props) {
    const navigate = useNavigate();
    return (
    <div className="row text-white UserInformation mx-auto d-flex flex-row col-12" key={post.id}>
        <div className="col-md-4 col-sm-12">
            <img
                className="row mr-3 mx-auto rounded-circle"
                src={`https://i.pravatar.cc/75?=${post.senderId}`}
                alt={`profile of ${post.senderName}}`}
                onClick={() => navigate(`/user/1/${post.senderId}`)}
            />
            <div className="row d-flex flex-column">
            <h3 className="mx-auto text-center py-2"><Link className="text-white " to={`/user/1/${post.senderId}`}>{post.senderName}</Link></h3>
            <h4 className="mx-auto ">{<FaRegCommentAlt/>}</h4>
            <h3 className="mx-auto"><Link className="text-white" to={`/user/1/${post.receiverId}`}>{post.receiverName}</Link></h3>
            </div>
            
        
        </div>
        <div className="col-md-8  col-sm-12">
        
        <div className="row d-flex flex-column justify-content-center text-center h-50">
            <p>{post.message}</p>
            <span className="text-muted">{moment( post.createdDate).format("YYYY-MM-DD HH:MM")}</span>
            
            
        </div>
        <div className="row d-flex flex-row justify-content-center m-0">
            <SubscribeButton fromUser="1" toUser={post.senderId!.toString()}/>
            <button id="MessageButton" onClick={() => navigate(`/conversation/1/${post.senderId}`)} className="btn btn-primary m-4">Message</button>
        </div>
        </div>
    </div>
    )
}
