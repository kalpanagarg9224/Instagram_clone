import React from 'react';
import "./SearchComponents.css";
import SearchUserCard from './SearchUserCard';
import { useDispatch, useSelector } from 'react-redux';
import { searchUserAction } from "../../Redux/User/Action";

const SearchComponents = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const { user } = useSelector(store => store);

  const handleSearch = (e) => {
    const value = e.target.value;

    if (!value.trim()) return; // ❗ prevents 400 error

    dispatch(searchUserAction({ jwt: token, query: value }));
  };

  // ✅ SAFE NORMALIZATION (IMPORTANT FIX)
  const raw = user?.searchUser;

  const safeUsers = Array.isArray(raw)
    ? raw
    : raw?.content
    ? raw.content
    : raw?.users
    ? raw.users
    : [];

  return (
    <div className='searchContainer'>
      <div className='px-3 pb-5'>
        <h1 className='text-xl pb-5'>Search</h1>

        <input
          onChange={handleSearch}
          className='searchInput'
          type='text'
          placeholder='Search...'
        />
      </div>

      <hr />

      <div className='px-3 pt-5'>
        {safeUsers.length > 0 ? (
          safeUsers.map((item) => (
            <SearchUserCard key={item.id || item.username} user={item} />
          ))
        ) : (
          <p className="text-gray-400 text-black text-sm">No users found</p>
        )}
      </div>
    </div>
  );
};

export default SearchComponents;