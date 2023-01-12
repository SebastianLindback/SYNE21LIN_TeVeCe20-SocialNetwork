import React from 'react'
import SubscribeButton from '../buttons/SubscribeButton'
import LoadingPage from '../../pages/shared/LoadingPage';
import ErrorPage from '../../pages/shared/ErrorPage';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PostsResponse } from '../../models/PostsResponse';
import { AxiosError } from 'axios';
import Agent from '../../actions/Agent';
import moment from 'moment';
import PostElement from '../elements/PostElement';

export default function PostsToUser() {
    const { fromUserId, toUserId } = useParams<{ fromUserId: string, toUserId: string  }>();

    const { isLoading, error, data } = useQuery<PostsResponse, AxiosError>({
        queryKey: ["UserWallData"],
        queryFn: () => Agent.Posts.ToUser(toUserId!)
    });

    if (isLoading) return <div className="container"><LoadingPage/></div>

    if (error) return (<div className="container"><ErrorPage error={error}/></div>)

    return (
    <div className="row bg-light text-dark rounded">
        <div className="col-sm rounded">
            <div className="float-left p-4">
            <h3 className="display-3">Wall</h3>
            </div>
            <div className="float-right p-4">
            <SubscribeButton fromUser={fromUserId!} toUser={toUserId!}/>
            </div>
            <div className="clearfix"></div>
            <ul className="list-unstyled  p-3 mb-2">
            {data &&
                data.posts?.map((post) => (<PostElement key={data.posts.indexOf(post)}  post={post}/>))}
            </ul>
        </div>
        </div>
    )
}
