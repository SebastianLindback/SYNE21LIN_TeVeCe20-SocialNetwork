import { useQuery } from '@tanstack/react-query';
import React from 'react'
import Agent from '../../actions/Agent';
import { Link } from 'react-router-dom';
import DeleteUserButton from '../buttons/DeleteUserButton';
import { UsersResponse } from '../../models/UsersResponse';
import { AxiosError } from 'axios';
import ErrorPage from '../../pages/shared/ErrorPage';

export default function DeleteUsers() {
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
          {data?.users.map((x) => (
              <div className="UserInformation mx-auto"  key={data.users.indexOf(x)}>
                <h4>
                  <Link to={`/user/${x.id}`}>
                    <img
                      className="mr-3 rounded-circle"
                      src={require("../../photos/profile.png")}
                      alt={`profile of ${x.name}}`}
                    />
                  </Link>
                  {x.name}
                  <div>
                    <DeleteUserButton userId={x.id.toString()}/>
                  </div>
                  <br />
                </h4>
              </div>
          ))}
          </div>)}
          </>
          
  )
}
