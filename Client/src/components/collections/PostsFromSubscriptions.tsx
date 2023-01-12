import React from 'react'
import SubscribeButton from '../buttons/SubscribeButton'
import LoadingPage from '../../pages/shared/LoadingPage';
import ErrorPage from '../../pages/shared/ErrorPage';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { PostsResponse } from '../../models/PostsResponse';
import { AxiosError } from 'axios';
import Agent from '../../actions/Agent';
import moment from 'moment';
import PostElement from '../elements/PostElement';
import FeedElement from '../elements/FeedElement';
import MessageButton from '../buttons/MessageButton';
import { GetSubscription } from '../../actions/useSubscription';

export default function PostsFromSubscriptions() {
    const navigate = useNavigate()

    const {currentSubscriptions} = GetSubscription("1");
    var ids = currentSubscriptions?.subscriptions.map(x => x.subscribedToId);  
  
    const { data, isLoading, error} = useQuery<PostsResponse, AxiosError>({
        queryKey: ["posts-from-subscriptions"],
        retry: () => false,
        enabled: ids?.length! > 0  ? true : false,
        queryFn: () => Agent.Posts.FromUsers(ids!)
    });

    if (isLoading) return <div className="container"><LoadingPage/></div>

    if (error) return (<div className="container"><ErrorPage error={error}/></div>)

    return (<>{data && data.posts.map(post => 
        <FeedElement key={data.posts.indexOf(post)} post={post} buttons={[
            <SubscribeButton fromUser="1" toUser={`${post.receiverId}`}/>,
            <MessageButton fromUser="1" toUser={`${post.receiverId}`}/>]} 
        />
        )
        }</>)
}
