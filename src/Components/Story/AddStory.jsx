import React, { useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { uploadToCloudinary } from "../../Config/UploadToCloudinary";

const AddStory = ({ onAddStory, currentUser, hasStory = false }) => {
  const fileInputRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    if (loading) return;
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    try {
      const imageUrl = await uploadToCloudinary(file);

      await onAddStory(imageUrl);

    } catch (error) {
      console.log("cloudinary upload error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center cursor-pointer select-none">

      {/* AVATAR WITH STORY RING */}
      <div onClick={handleClick} className="relative">

        {/* STORY RING (only if story exists OR loading state) */}
        <div
          className={`
            absolute -inset-1 rounded-full
            ${hasStory
              ? "bg-gradient-to-tr from-pink-500 via-purple-500 to-yellow-400"
              : "bg-transparent"
            }
          `}
        />

        {/* INNER CUT */}
        <div className="absolute inset-0 rounded-full bg-black" />

        {/* IMAGE */}
        <img
          className="relative h-16 w-16 rounded-full object-cover border-2 border-black"
          src={
            currentUser?.image ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt=""
        />

        {/* PLUS ICON */}
        <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 border border-white">
          {loading ? (
            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <FiPlus className="text-white text-xs" />
          )}
        </div>

      </div>

      <p className="text-sm mt-1 text-gray-300">
        {loading ? "Uploading..." : "Add Story"}
      </p>

      <input
        type="file"
        accept="image/*"
        hidden
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default AddStory;