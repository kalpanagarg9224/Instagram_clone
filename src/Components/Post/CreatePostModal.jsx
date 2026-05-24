import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalOverlay,
  ModalContent,
} from "@chakra-ui/react";

import { FaPhotoVideo } from "react-icons/fa";
import { GoLocation } from "react-icons/go";

import { useDispatch, useSelector } from "react-redux";
import { createPostAction } from "../../Redux/Post/Action";
import { uploadToCloudinary } from "../../Config/UploadToCloudinary";
import { useNavigate } from "react-router-dom";

const CreatePostModal = ({ onClose, isOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const { user } = useSelector((store) => store);

  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  // ---------------- RESET ----------------
  const resetState = () => {
    setFile(null);
    setCaption("");
    setLocation("");
    setImageUrl("");
  };

  // ---------------- CLOSE ----------------
  const handleClose = () => {
    resetState();
    onClose();
  };

  // ---------------- DRAG ----------------
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => setIsDragOver(false);

  // ---------------- FILE HANDLING ----------------
  const handleFile = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/") && !file.type.startsWith("video/"))
      return;

    setFile(file);

    const url = await uploadToCloudinary(file);
    if (url) setImageUrl(url);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  // ---------------- CREATE POST ----------------
  const handleCreatePost = async () => {
    if (!imageUrl || !caption) return;

    try {
      await dispatch(
        createPostAction({
          jwt: token,
          data: {
            caption,
            location,
            image: imageUrl,
          },
        })
      );

      handleClose();

      // ✅ IMPORTANT: redirect to home after posting
      navigate("/");
    } catch (error) {
      console.log("Error creating post:", error);
    }
  };

  const isValid = imageUrl && caption.length > 0;

  return (
    <Modal size="4xl" isOpen={isOpen} onClose={handleClose} isCentered>
      <ModalOverlay />

      <ModalContent className="!bg-white/10 !backdrop-blur-2xl !border !border-white/10 !text-white rounded-2xl overflow-hidden">

        {/* HEADER */}
        <div className="flex justify-between items-center px-6 py-3 border-b border-white/10">
          <p className="font-semibold text-lg">Create New Post</p>

          <Button
            size="sm"
            onClick={handleCreatePost}
            isDisabled={!isValid}
            className="!bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 !text-white !rounded-xl disabled:opacity-40"
          >
            Share
          </Button>
        </div>

        <ModalBody>
          <div className="flex h-[70vh]">

            {/* LEFT */}
            <div className="w-1/2 p-3">

              {!file ? (
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  className={`h-full rounded-2xl border-2 border-dashed flex flex-col items-center justify-center gap-3 transition ${
                    isDragOver ? "border-pink-400 bg-white/10" : "border-white/20"
                  }`}
                >
                  <FaPhotoVideo className="text-3xl text-gray-300" />

                  <p className="text-gray-300 text-sm">
                    Drag & drop media here
                  </p>

                  <label className="px-4 py-2 bg-white/10 rounded-xl cursor-pointer hover:bg-white/20 transition">
                    Select from device
                    <input
                      type="file"
                      hidden
                      accept="image/*,video/*"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center gap-3">

                  {file.type.startsWith("image") ? (
                    <img
                      src={URL.createObjectURL(file)}
                      className="rounded-2xl max-h-full object-cover"
                    />
                  ) : (
                    <video
                      src={URL.createObjectURL(file)}
                      controls
                      className="rounded-2xl max-h-full"
                    />
                  )}

                  <button
                    onClick={() => {
                      setFile(null);
                      setImageUrl("");
                    }}
                    className="text-sm text-pink-400 hover:text-pink-300"
                  >
                    Choose another moment
                  </button>
                </div>
              )}
            </div>

            {/* RIGHT */}
            <div className="w-1/2 p-4 flex flex-col gap-4">

              {/* USER */}
              <div className="flex items-center gap-3">
                <img
                  className="w-8 h-8 rounded-full"
                  src={user?.reqUser?.image}
                  alt=""
                />
                <p className="font-semibold">
                  {user?.reqUser?.username}
                </p>
              </div>

              {/* CAPTION */}
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption..."
                rows={6}
                className="w-full bg-black/30 border border-white/10 rounded-xl p-3 outline-none resize-none"
              />

              <div className="flex justify-end text-xs text-gray-400">
                {caption.length} / 2200
              </div>

              {/* LOCATION */}
              <div className="flex items-center gap-2 border border-white/10 rounded-xl p-2 bg-black/20">
                <input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Add location"
                  className="bg-transparent outline-none flex-1"
                />
                <GoLocation />
              </div>

              <p className="text-xs text-gray-400">
                Share your moment ✨
              </p>

            </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CreatePostModal;