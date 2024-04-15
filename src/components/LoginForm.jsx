import { MdEmail } from "react-icons/md";
import { FaKey } from "react-icons/fa";
import toast from "react-hot-toast";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../lib/firebase";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);


  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    try {
      setLoading(true);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login Successful");
    } catch (error) {
      console.log(error);
      toast.error(error.code);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      id="login"
      className="carousel-item w-full h-full flex items-center justify-center"
    >
      <form
        action=""
        className="bg-base-100 p-5 rounded-md w-[85%] lg:w-[40%] flex flex-col items-center gap-y-3 justify-center"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-semibold">Welcome Back</h2>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <MdEmail className="w-4 h-4 opacity-70" />
          <input
            type="email"
            className="grow"
            placeholder="Email"
            required
            name="email"
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
          />
        </label>
        <button disabled={loading} className="btn w-full btn-info">Login</button>
      </form>
    </div>
  );
}
