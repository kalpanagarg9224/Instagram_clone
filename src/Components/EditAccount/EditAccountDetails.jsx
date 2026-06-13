import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useToast, useDisclosure } from "@chakra-ui/react";

import {
  getUserProfileAction,
  updateUserAction,
} from "../../Redux/User/Action";

import { uploadToCloudinary } from "../../Config/UploadToCloudinary";
import ChangeProfilePhotoModal from "./ChangeProfilePhotoModal";

const EditAccount = () => {
  const { user } = useSelector((store) => store);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const token = localStorage.getItem("token");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [imageFile, setImageFile] = useState(null);

  const userId = user?.reqUser?.id;

  const initialValues = {
    name: "",
    username: "",
    email: "",
    bio: "",
    mobile: "",
    countryCode: "+91",
    gender: "",
    website: "",
    private: false,
  };

  useEffect(() => {
  dispatch(getUserProfileAction(token));
}, [dispatch, token]);

  const formik = useFormik({
    initialValues,
    enableReinitialize: true,

    onSubmit: async (values) => {
      await dispatch(
        updateUserAction({
          jwt: token,
          data: { ...values, id: userId },
        })
      );

      toast({
        title: "Profile updated ✨",
        status: "success",
        duration: 1500,
        isClosable: true,
      });

      navigate(`/${formik.values.username}`);
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  if (user.reqUser) {
    const updated = {};
    Object.keys(initialValues).forEach((key) => {
      updated[key] = user.reqUser[key] ?? initialValues[key];
    });
    formik.setValues(updated);
  }
}, [user.reqUser]);

  async function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    const url = await uploadToCloudinary(file);
    setImageFile(url);

    dispatch(
      updateUserAction({
        jwt: token,
        data: { image: url, id: userId },
      })
    );

    onClose();
  }

  const avatar =
    imageFile ||
    user.reqUser?.image ||
    "https://cdn-icons-png.flaticon.com/512/4140/4140048.png";

  return (
    <div className="min-h-screen relative overflow-hidden text-white px-4 py-10">

      {/* 🌈 BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-[500px] h-[500px] bg-pink-500/25 rounded-full blur-3xl animate-pulse top-[-120px] left-[-120px]" />
        <div className="absolute w-[400px] h-[400px] bg-blue-500/25 rounded-full blur-3xl animate-pulse bottom-[-120px] right-[-120px]" />
        <div className="absolute w-[300px] h-[300px] bg-purple-500/20 rounded-full blur-2xl animate-bounce top-[40%] left-[40%]" />
      </div>

      <div className="absolute inset-0 bg-black/60 -z-10" />

      <div className="max-w-5xl mx-auto space-y-6 relative">

        {/* HEADER */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <p className="text-gray-300 text-sm mt-1">
            Update your personal information
          </p>
        </div>

        {/* PROFILE CARD */}
        <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white/10 backdrop-blur-xl p-6 flex items-center gap-6">

          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-purple-500/10 to-blue-500/10" />

          <div className="relative group cursor-pointer" onClick={onOpen}>
            <img
              src={avatar}
              className="w-24 h-24 rounded-full object-cover border-4 border-pink-500"
              alt=""
            />
            <div className="absolute inset-0 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-xs">
              Change
            </div>
          </div>

          <div className="relative">
            <h2 className="text-xl font-semibold">
              {formik.values.username || "username"}
            </h2>
            <p className="text-gray-300 text-sm">{formik.values.email}</p>
            <p
              className="text-pink-400 text-xs mt-1 cursor-pointer"
              onClick={onOpen}
            >
              Edit Profile Picture
            </p>
          </div>
        </div>

        {/* FORM GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <Field label="Name">
            <input {...inputClass} {...formik.getFieldProps("name")} />
          </Field>

          <Field label="Username">
            <input {...inputClass} {...formik.getFieldProps("username")} />
          </Field>

          <Field label="Email">
            <input {...inputClass} {...formik.getFieldProps("email")} />
          </Field>

          <Field label="Website">
            <input {...inputClass} {...formik.getFieldProps("website")} />
          </Field>

          <Field label="Bio">
            <textarea rows={3} {...inputClass} {...formik.getFieldProps("bio")} />
          </Field>

          <Field label="Gender">
            <select {...inputClass} {...formik.getFieldProps("gender")}>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </Field>

        </div>

        {/* PHONE */}
        <div className="rounded-[24px] p-5 bg-white/10 border border-white/10 backdrop-blur-xl">
          <p className="text-xs text-gray-300 mb-3">Phone Number</p>

          <div className="flex gap-3">
            <select className={inputClass.className} {...formik.getFieldProps("countryCode")}>
              <option value="+91">+91 India</option>
              <option value="+1">+1 USA</option>
              <option value="+44">+44 UK</option>
            </select>

            <input
              className={inputClass.className}
              placeholder="Mobile number"
              {...formik.getFieldProps("mobile")}
            />
          </div>
        </div>

        {/* PRIVATE */}
        <div className="flex items-center gap-3 rounded-[24px] bg-white/10 border border-white/10 p-5 backdrop-blur-xl">
          <input
            type="checkbox"
            checked={formik.values.private}
            onChange={(e) =>
              formik.setFieldValue("private", e.target.checked)
            }
          />
          <span className="text-gray-200">Private Account</span>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex gap-3">

          {/* DISCARD */}
          <button
            onClick={() => navigate(-1)}
            className="w-1/2 py-4 rounded-[24px] font-semibold
            bg-white/10 border border-white/10 text-gray-200
            hover:bg-white/20 transition"
          >
            Discard
          </button>

          {/* SAVE */}
          <button
            onClick={formik.handleSubmit}
            className="w-1/2 py-4 rounded-[24px] font-bold text-white
            bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
            shadow-lg shadow-pink-500/30 hover:scale-[1.02] transition"
          >
            Save
          </button>

        </div>

      </div>

      <ChangeProfilePhotoModal
        handleProfileImageChange={handleImageChange}
        isOpen={isOpen}
        onClose={onClose}
        onOpen={onOpen}
      />
    </div>
  );
};

export default EditAccount;

/* ---------------- FIELD ---------------- */
const Field = ({ label, children }) => (
  <div className="relative overflow-hidden rounded-[24px] p-4 bg-white/10 border border-white/10 backdrop-blur-xl">

    <div className="absolute inset-0 bg-black/30" />

    <div className="relative">
      <p className="text-xs text-gray-300 mb-2">{label}</p>
      {children}
    </div>
  </div>
);

/* ---------------- INPUT ---------------- */
const inputClass = {
  className:
    "w-full bg-black/60 border border-white/10 rounded-xl p-3 outline-none text-white placeholder:text-gray-400",
};