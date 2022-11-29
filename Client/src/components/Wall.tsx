import React, { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import Agent from '../actions/agent';
import { PostsResponse } from "../models/PostsResponse";
import { Post } from "../models/Post";
const Wall = () => {
    const [message, setMessage] = useState('');
    const [updated, setUpdated] = useState(message);
    const [postResponse, setPosts] = useState<PostsResponse>();

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setMessage(event.target.value);
    };

    const handleClick = () => {
        let post: Post = {
            id: 0,
            message: message,
            createdDate: new Date(),
            userId: 1
        };

        Agent.Posts.post(post).then((response) => {
            setMessage('');
            fetchPosts();
        });
    };

    const fetchPosts = async () => {
        Agent.Posts.list().then((response) => {
            console.log(response);
            setPosts(response);
        });
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    return (
        <>        
        <div className="row rounded">
            <div className="col-sm bg-light text-dark p-4 mb-4 rounded">
                <h2 className="display-2">Message</h2>

                <div className="form-group ">
                    <label>Send a message to the users wall</label>
                    <textarea className="form-control form-control-lg"
                        id="message"
                        name="message"
                        onChange={handleInputChange}
                        value={message}>
                    </textarea>
                </div>
                <button type="submit" className="btn btn-primary " onClick={handleClick}>Send</button>

            </div>
        </div>

            <div className="row bg-light text-dark rounded">
                <div className="col-sm rounded">
                <div className="float-left p-4">
                    <h3 className='display-3'>Wall</h3>
                    </div>
                    <div className="float-right p-4">
                    <button type="button" className="btn btn-primary m-4">
                        Posts <span className="badge badge-light">{postResponse?.posts.length}</span>
                    </button>
                    <button type="button" className="btn btn-success m-4">
                        Follow
                    </button>
                    </div>
                    <div className="clearfix"></div>
                    <ul className="list-unstyled  p-3 mb-2">
                        {postResponse && postResponse.posts.map((post) => (
                            <li className="media bg-white text-dark p-4 mb-4 border rounded" key={post.id}>
                                <img className="mr-3 rounded-circle" src={`https://i.pravatar.cc/75?=${post.id}`} alt="{post.message}" />
                                <div className="media-body">
                                    <p className="mt-0 mb-1 lead">{post.message}</p>
                                    <samp>{post.createdDate.toLocaleString()}</samp>
                                </div>
                            </li>

                        )
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Wall;