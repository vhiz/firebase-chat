import { FaUserFriends } from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { useState } from "react";
import useChatStore from "../store/useChatStrore";

export default function Mobile() {
  const [active, setActive] = useState("list");
  const { chatId } = useChatStore();

  return (
    <div role="tablist" className="tabs tabs-lifted h-[20vh] lg:hidden">
      <button
        className={`tab duration-300 ${
          active === "list"
            ? "tab-active [--tab-bg:transparent] [--tab-border-color:transparent]"
            : "bg-base-100"
        } h-full`}
      >
        <a
          role="tab"
          href="#list"
          onClick={() => setActive("list")}
          className="w-full h-full flex items-center justify-center"
        >
          <FaUserFriends className="text-2xl" />
        </a>
      </button>
      <button
        className={`tab duration-300 ${
          active === "chat"
            ? "tab-active [--tab-bg:transparent] [--tab-border-color:transparent]"
            : "bg-base-100"
        } h-full`}
        disabled={!chatId}
      >
        <a
          onClick={() => setActive("chat")}
          role="tab"
          href="#chat"
          className="w-full h-full flex items-center justify-center"
        >
          <IoIosChatboxes className="text-2xl" />
        </a>
      </button>
      <button
        className={`tab duration-300 ${
          active === "details"
            ? "tab-active [--tab-bg:transparent] [--tab-border-color:transparent]"
            : "bg-base-100"
        } h-full`}
        disabled={!chatId}
      >
        <a
          role="tab"
          href="#details"
          onClick={() => setActive("details")}
          className="w-full h-full flex items-center justify-center"
        >
          <FaUser className="text-2xl" />
        </a>
      </button>
    </div>
  );
}
