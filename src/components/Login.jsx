import { useState } from "react";
import LoginForm from "./LoginForm";
import { FaUserPlus } from "react-icons/fa";
import { MdOutlineAccountCircle } from "react-icons/md";
import RegisterForm from "./RegisterForm";
export default function Login() {
  const [login, setLogin] = useState("login");
  return (
    <div className="w-full flex-col flex h-full">
      <div role="tablist" className="tabs tabs-lifted h-[10vh] w-full">
        <a
          role="tab"
          href="#login"
          className={`tab h-full ${
            login === "login"
              ? "[--tab-bg:transparent] [--tab-border-color:transparent] "
              : "bg-base-100 text-primary"
          }`}
          onClick={() => setLogin("login")}
        >
          <MdOutlineAccountCircle className="text-2xl" />
        </a>
        <a
          role="tab"
          href="#register"
          className={`tab h-full ${
            login === "register"
              ? "[--tab-bg:transparent] [--tab-border-color:transparent] "
              : "bg-base-100 text-primary"
          }`}
          onClick={() => setLogin("register")}
        >
          <FaUserPlus className="text-2xl" />
        </a>
      </div>
      <div className="flex carousel w-full h-full">
        <LoginForm />
        <RegisterForm />
      </div>
    </div>
  );
}
