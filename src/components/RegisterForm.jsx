import { FaKey } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import { LuImagePlus } from "react-icons/lu";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { TiMessageTyping } from "react-icons/ti";
import { auth, db } from "../lib/firebase";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import upload from "../lib/upload";
export default function RegisterForm() {
  const [img, setImg] = useState({
    file: null,
    url: "",
  });
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  function handleImgChange(e) {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      toast.error("You have to chose an image");
    }
  }

  function handleChange(e) {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", inputs.username));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        return toast.error("Select another username");
      }
      const res = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      let imgUrl;
      if (img.url) {
        imgUrl = await upload(img.file);
      }
      await setDoc(doc(db, "users", res.user.uid), {
        username: inputs.username,
        email: inputs.email,
        id: res.user.uid,
        blocked: [],
        img: img.url
          ? imgUrl
          : `https://avatar.iran.liara.run/username?username=${inputs.username}`,
      });
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.code);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div
      className="carousel-item w-full h-full flex items-center justify-center"
      id="register"
    >
      <form
        action=""
        className="bg-base-100 p-5 rounded-md w-[90%] lg:w-[40%] flex flex-col items-center gap-y-3 justify-center"
        onSubmit={handleRegister}
      >
        <h2 className="text-xl font-semibold">Create an Account</h2>

        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaUser className="w-4 h-4 opacity-70" />
          <input
            type="text"
            className="grow"
            placeholder="Username"
            name="username"
            required
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <MdEmail className="w-4 h-4 opacity-70" />
          <input
            type="email"
            className="grow"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            required
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <FaKey className="w-4 h-4 opacity-70" />
          <input
            type="password"
            className="grow"
            placeholder="Password"
            name="password"
            required
            minLength={6}
            onChange={handleChange}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <TiMessageTyping className="w-4 h-4 opacity-70" />
          <input
            type="password"
            className="grow"
            placeholder="Description (optional)"
            name="desc"
            onChange={handleChange}
          />
        </label>
        <label
          htmlFor="file"
          className="cursor-pointer self-start flex gap-x-5 items-center"
        >
          <img
            src={
              img.url
                ? img.url
                : inputs.username
                ? `https://avatar.iran.liara.run/username?username=${inputs.username}`
                : "https://avatar.iran.liara.run/public"
            }
            alt=""
            className="w-14 h-14 rounded-md bg-red-100 object-cover"
          />
          <input
            type="file"
            name=""
            id="file"
            accept="image/*"
            multiple={false}
            className="hidden"
            onChange={handleImgChange}
          />
          <div className="tooltip" data-tip="Choose an image">
            <LuImagePlus className="text-2xl" />
          </div>
        </label>
        <button disabled={loading} className="btn w-full btn-info">
          Register
        </button>
      </form>
    </div>
  );
}
