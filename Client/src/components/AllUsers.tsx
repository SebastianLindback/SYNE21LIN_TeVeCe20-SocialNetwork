import { useQuery } from '@tanstack/react-query';
import React from 'react'
import Agent from '../actions/Agent';
import { Link } from 'react-router-dom';
import DeleteUserButton from './buttons/DeleteUserButton';

export default function AllUsers() {
    const queryKey = ["wallData"];
    const { data } = useQuery({
    queryKey: queryKey,
    queryFn: () => Agent.Users.All().then((response) => response),
  });

  return (<>
    {data && (
        <div className="row">
          {data?.users.map((x) => (
              <div className="UserInformation mx-auto"  key={data.users.indexOf(x)}>
                <h4>
                  <Link to={`/user/${x.id}`}>
                    <img
                      className="mr-3 rounded-circle"
                      src={require("../photos/profile.png")}
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
