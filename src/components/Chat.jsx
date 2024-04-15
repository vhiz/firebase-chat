import { useEffect, useState } from "react";
import ChatUserInfo from "./ChatUserInfo";
import MessageContainer from "./MessageContainer";
import MessageInput from "./MessageInput";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import useChatStore from "../store/useChatStrore";

export default function Chat() {
  const { chatId, chat, setChat } = useChatStore();
  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);
  return (
    <div
      id="chat"
      className="carousel-item w-full lg:flex-[2] border-x border-gray-600 h-full flex flex-col"
    >
      <ChatUserInfo />
      <MessageContainer chat={chat} img={img} setImg={setImg} />
      <MessageInput img={img} setImg={setImg} />
    </div>
  );
}
