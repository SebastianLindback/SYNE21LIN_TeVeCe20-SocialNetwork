import { useQuery } from '@tanstack/react-query';
import React from 'react'
import Agent from '../../actions/Agent';
import { Link } from 'react-router-dom';
import SubscribeButton from '../buttons/SubscribeButton';
import { UsersResponse } from '../../models/UsersResponse';
import { AxiosError } from 'axios';
import ErrorPage from '../../pages/shared/ErrorPage';

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
          {data?.users.map((x) => (
              <div className="UserInformation mx-auto"  key={data.users.indexOf(x)}>
                <h4>
                  <Link to={`/user/1/${x.id}`}>
                    <img
                      className="mr-3 rounded-circle"
                      src={require("../../photos/profile.png")}
                      alt={`profile of ${x.name}}`}
                    />
                  </Link>
                  <Link to={`/user/1/${x.id}`} className={"text-white"}>{x.name}</Link>
                  <div>
                    {/* Hårdkodad länk */}
                    <Link to={`/conversation/1/${x.id}`}>
                      <button id="MessageButton" className="btn btn-primary m-4">Message</button>
                    </Link>
                    <SubscribeButton fromUser="1" toUser={x.id.toString()}/>
                  </div>
                  <br />
                </h4>
              </div>
          ))}
          </div>)}
          </>
          
  )
}
