import React, { useEffect } from 'react';
import ProfileUserDetails from "../../Components/ProfileComponents/ProfileUserDetails";
import ReqUserPostPart from '../../Components/ProfileComponents/ReqUserPostPart';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { isFollowing, isReqUser } from '../../Config/Logic';
import {
    findUserByUserNameAction,
    getUserProfileAction
} from '../../Redux/User/Action';

const Profile = () => {

    const dispatch = useDispatch();

    const token = localStorage.getItem("token");

    const { username } = useParams();

    const user = useSelector(store => store.user);

const post = useSelector(store => store.post);

    const isRequser = isReqUser(
        user.reqUser?.id,
        user.findByUsername?.id
    );

    const isFollowed = isFollowing(
        user.reqUser,
        user.findByUsername
    );

    useEffect(() => {

        dispatch(getUserProfileAction(token));

        dispatch(
            findUserByUserNameAction({
                jwt: token,
                username
            })
        );

    }, [username]);

    return (
        <div className='px-20'>

            <div>
                <ProfileUserDetails
                    user={
                        isRequser
                            ? user.reqUser
                            : user.findByUsername
                    }
                    isFollowing={isFollowed}
                    isRequser={isRequser}
                    postCount={post.userPost?.length || 0}
                />
            </div>

            <div>
                <ReqUserPostPart
                    user={
                        isRequser
                            ? user.reqUser
                            : user.findByUsername
                    }
                />
            </div>

        </div>
    );
};

export default Profile;
