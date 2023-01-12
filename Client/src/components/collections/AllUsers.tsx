import { useQuery } from '@tanstack/react-query';
import React from 'react'
import Agent from '../../actions/Agent';
import { Link } from 'react-router-dom';
import SubscribeButton from '../buttons/SubscribeButton';
import { UsersResponse } from '../../models/UsersResponse';
import { AxiosError } from 'axios';
import ErrorPage from '../../pages/shared/ErrorPage';
import UserElement from '../elements/UserElement';
import MessageButton from '../buttons/MessageButton';

export default function AllUsers() {
    const queryKey = ["wallData"];
    const { data, error } = useQuery<UsersResponse, AxiosError>({
    queryKey: queryKey,
    retry : () => false,
    queryFn: () => Agent.Users.All().then((response) => response),
  });

  if (error) return <ErrorPage error={error}/>

  return (<>
    {data && (
        <div className="row">
          {data?.users.map((user) => (
            <UserElement key={data.users.indexOf(user)}  user={user} buttons={[
              <SubscribeButton fromUser="1" toUser={`${user.id}`}/>,
              <MessageButton fromUser="1" toUser={`${user.id}`}/>
            ]}/>
          ))}
        </div>)}
          </>
          
  )
}