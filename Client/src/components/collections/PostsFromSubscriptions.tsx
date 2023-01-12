import React from 'react'
import SubscribeButton from '../buttons/SubscribeButton'
import LoadingPage from '../../pages/shared/LoadingPage';
import ErrorPage from '../../pages/shared/ErrorPage';
import { useQuery } from '@tanstack/react-query';
import { PostsResponse } from '../../models/PostsResponse';
import { AxiosError } from 'axios';
import Agent from '../../actions/Agent';
import FeedElement from '../elements/FeedElement';
import MessageButton from '../buttons/MessageButton';
import { GetSubscription } from '../../actions/useSubscription';
import { GetPostsFromUsers } from '../../actions/usePosts';

export default function PostsFromSubscriptions() {
    const currentUserID = "1";
    const {currentSubscriptions} = GetSubscription(currentUserID);
    var currentSubscriptionsIDs = currentSubscriptions?.subscriptions.map(x => x.subscribedToId);

    const { data, isLoading, error} = GetPostsFromUsers(currentSubscriptionsIDs!);

    if (isLoading) return <div className="container"><LoadingPage/></div>

    if (error) return (<div className="container"><ErrorPage error={error}/></div>)
    return (
    <div className="container mx-auto col-12" style={{maxWidth:"800px"}}>

        {data?.posts?.length! > 0 ? data?.posts.map(post => 
        <FeedElement key={data.posts.indexOf(post)} post={post} buttons={[
            <SubscribeButton fromUser="1" toUser={`${post.receiverId}`}/>,
            <MessageButton fromUser="1" toUser={`${post.receiverId}`}/>]} 
        />)
        :
        <span className='row col-6 mx-auto py-5 text-white text-center'>No posts found. Go and follow some users!</span>
        }
    </div>)
}
