import { useEffect, useRef, useState } from "react";
import Message from "./Message";
import useUserStore from "../store/useUserStrore";

export default function MessageContainer({ chat, img, setImg }) {
  const endRef = useRef();
  const { currentUser } = useUserStore();
  const [click, setClick] = useState(false);
  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chat.messages]);
  useEffect(() => {
    if (img?.url) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [img?.url]);
  return (
    <div className="flex-1 p-3 overflow-y-scroll scrollbar-none">
      {chat?.messages?.map((message, i) => (
        <Message
          key={i}
          message={message}
          own={message.senderId === currentUser.id}
        />
      ))}

      <div
        className={`chat chat-end ${
          click ? "animate-bounceIn" : "animate-bounceOut"
        }`}
      >
        <div className="chat-bubble bg-blue-400 relative">
          <img
            src={img.url}
            className="w-full max-h-52 lg:max-h-72 object-cover mb-3 rounded-md"
            alt=""
          />
          <div
            className="btn btn-xs absolute top-5 right-5 rounded-full"
            onClick={() => {
              setClick(false);
              setTimeout(() => {
                setImg({ file: null, url: "" });
              }, 1000);
            }}
          >
            X
          </div>
        </div>
      </div>

      <div ref={endRef}></div>
    </div>
  );
}
