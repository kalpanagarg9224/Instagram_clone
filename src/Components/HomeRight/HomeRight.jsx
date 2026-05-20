import React, { useEffect } from 'react'
import SuggestionCard from './SuggestionCard'
import { useDispatch, useSelector } from 'react-redux';
import { getPopularUser } from '../../Redux/User/Action';
import defaultImage from "../../Images/userAvatar.png";

const HomeRight = () => {
    const dispatch = useDispatch();
    const token = localStorage.getItem("token");
    const { user } = useSelector(store => store);
    useEffect(() => {
        if(token){
            dispatch(getPopularUser(token));
        }
    }, []);
    // console.log("POPULAR USERS => ", user.popularUsers);
    return (
        <div>
            <div>
                <div className='flex justify-between item-center'>
                    <div className='flex item-center'>
                        <div>
                            <img
                                className='w-12 h-12 rounded-full' src={user.reqUser?.image || defaultImage} alt=''/>
                        </div>
                        <div className='ml-3'>
                            <p className='text-sm font-semibold'>{user.reqUser?.name}</p>
                            <p className='text-sm font-semibold opacity-70'>{user.reqUser?.username}</p>
                        </div>
                    </div>
                    <div>
                        <p className='text-blue-700 font-semibold'>
                            Switch
                        </p>
                    </div>
                </div>

                <div className='space-y-5 mt-10'>{
                        Array.isArray(user.popularUsers) &&
                        user.popularUsers.map((item, index) => (

                            <SuggestionCard
                                key={item.id || index}
                                user={item}
                            />
                        ))
                    }
                </div>

            </div>

        </div>
    )
}

export default HomeRight;


// import React from 'react'
// import SuggestionCard from './SuggestionCard'
// import { useDispatch, useSelector } from 'react-redux';


// const HomeRight = () => {
//     const {user, post} = useSelector(store => store);
//   return (
//     <div className=''>
//       <div>
//         <div className='flex justify-between item-center'>
//           <div className='flex item-center'>
//             <div>
//               <img className='w-12 h-12 rounded-full' src="https://cdn.pixabay.com/photo/2023/04/05/21/09/bird-7902319_1280.jpg" alt=''/>
//             </div>
//             <div className='ml-3'>
//               <p>FullName</p>
//               <p className='opacity-70%'>username</p>
//             </div>
//           </div>
//           <div>
//             <p className='text-blue-700 font-semibold'>Switch</p>
//           </div>
//         </div>
//         <div className='space-y-5 mt-10'>
//             {user.popularUsers.map((item, index)=><SuggestionCard key={index}/>)}
//           </div>
//       </div>
//     </div>
//   )
// }

// export default HomeRight