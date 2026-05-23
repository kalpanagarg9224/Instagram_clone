import React, { useRef } from 'react';
import { FiPlus } from 'react-icons/fi';
import { uploadToCloudinary } from '../../Config/UploadToCloudinary';

const AddStory = ({ onAddStory, currentUser }) => {

    const fileInputRef = useRef();

    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {

    const file = e.target.files[0];

    if (!file) return;

    try {

        const imageUrl = await uploadToCloudinary(file);

        onAddStory(imageUrl);

    } catch (error) {

        console.log("cloudinary upload error", error);

    }

};

    return (
        <div className='flex flex-col items-center cursor-pointer'>

            <div
                onClick={handleClick}
                className='relative'
            >

                <img
                    className='h-16 w-16 rounded-full object-cover border-2 border-gray-300'
                    src={
                        currentUser?.image ||
                        "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt=""
                />

                <div className='absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border border-white'>

                    <FiPlus className='text-white text-xs'/>

                </div>

            </div>

            <p className='text-sm mt-1'>
                Add Story
            </p>

            <input
                type="file"
                accept="image/*"
                hidden
                ref={fileInputRef}
                onChange={handleFileChange}
            />

        </div>
    )
}

export default AddStory;