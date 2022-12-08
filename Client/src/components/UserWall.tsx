import Agent from '../actions/Agent';
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom';
import Post from './Post';


const Wall = () => {
    const { userId } = useParams<{ userId: string }>();
   
    const { isLoading, error, data } = useQuery({
        queryKey: ['UserWallData'],
        queryFn: () =>{
            return Agent.Posts.User(userId).then(response => response)
        }
    });

    if (isLoading) return (
        <div className="row rounded">
            <div className="col-sm bg-light text-dark p-4 mb-4 rounded">
                Loading...;
            </div>
        </div>
    );

    if (error) return (
        <div className="row rounded">
            <div className="col-sm bg-light text-dark p-4 mb-4 rounded">
                An error has occurred: ' + error;
            </div>
        </div>
    );

    return (
        <>
            <Post/>
            <div className="row bg-light text-dark rounded">
                <div className="col-sm rounded">
                    <div className="float-left p-4">
                        <h3 className='display-3'>Wall</h3>
                    </div>
                    <div className="float-right p-4">
                        <button type="button" className="btn btn-primary m-4">
                            Posts <span className="badge badge-light">{data?.posts.length}</span>
                        </button>
                        <button type="button" className="btn btn-success m-4">
                            Follow
                        </button>
                    </div>
                    <div className="clearfix"></div>
                    <ul className="list-unstyled  p-3 mb-2">
                        {data && data.posts.map((post) => (
                            <li className="media bg-white text-dark p-4 mb-4 border rounded" key={post.id}>
                                <img className="mr-3 rounded-circle" src={`https://i.pravatar.cc/75?=${post.userId}`} alt="{post.message}" />
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