import { useQuery } from '@tanstack/react-query';
import React from 'react'
import Agent from '../../actions/Agent';
import { Link } from 'react-router-dom';
import DeleteUserButton from '../buttons/DeleteUserButton';
import { UsersResponse } from '../../models/UsersResponse';
import { AxiosError } from 'axios';
import ErrorPage from '../../pages/shared/ErrorPage';
import UserElement from '../elements/UserElement';
import LoadingPage from '../../pages/shared/LoadingPage';

export default function DeleteUsers() {
    const queryKey = ["wallData"];
    const { data, isLoading, error } = useQuery<UsersResponse, AxiosError>({
      queryKey: queryKey,
      retry : () => false,
      queryFn: () => Agent.Users.All().then((response) => response),
    });
    
    if (isLoading) return <div className="container"><LoadingPage/></div>

    if (error) return <ErrorPage error={error}/>

  return (<>
    {data && (
        <div className="row">
          {data?.users.map((user) => (
              <UserElement key={data.users.indexOf(user)} user={user} buttons={[
                <DeleteUserButton userId={user.id.toString()}/>
              ]}/>
          ))}
          
          </div>)}
          </>
          
  )
}
