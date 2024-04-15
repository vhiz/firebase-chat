import { CiSearch } from "react-icons/ci";
import { IoPersonAdd } from "react-icons/io5";
import useUserStore from "../store/useUserStrore";
import { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import useChatStore from "../store/useChatStrore";
import toast from "react-hot-toast";

export default function ChatList() {
  const { currentUser } = useUserStore();
  const [chats, setChats] = useState([]);
  const [search, setSearch] = useState("");
  const { changeChat } = useChatStore();
  useEffect(() => {
    const unSub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items?.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();
          return { ...item, user };
        });
        const chatData = await Promise.all(promises);

        setChats(
          chatData.sort((a, b) => {
            b.updatedAt - a.updatedAt;
          })
        );
      }
    );
    return () => {
      unSub();
    };
  }, [currentUser]);

  async function handleSelected(chat) {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });
    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );
    userChats[chatIndex].isSeen = true;
    const userChatRef = doc(db, "userchats", currentUser.id);
    try {
      await updateDoc(userChatRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  }

  const filtered = chats.filter((c) =>
    c.user.username.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div className="flex-1 overflow-y-scroll overflow-x-hidden scrollbar-none">
      <div className="flex items-center gap-3 p-3 w-full">
        <label className="input input-bordered flex w-full items-center gap-2">
          <CiSearch className="w-4 h-4 opacity-70" />
          <input
            type="text"
            className="grow"
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <div className="tooltip tooltip-bottom" data-tip={"Add User"}>
          <button
            className="btn btn-ghost"
            onClick={() => {
              document.getElementById("addUser").showModal();
            }}
          >
            <IoPersonAdd />
          </button>
        </div>
      </div>
      {filtered?.map((chat, i) => (
        <a
        href="#chat"
          key={i}
          role="button"
          className="flex btn btn-ghost items-center justify-start gap-3 mb-3 p-3 h-[10vh] mx-2 w-full"
          onClick={() => handleSelected(chat)}
        >
          <img
            src={
              currentUser?.blocked?.includes(chat?.user?.id) ||
              chat?.user?.blocked?.includes(currentUser?.id)
                ? "https://icon2.cleanpng.com/20180614/vjy/kisspng-computer-icons-no-symbol-not-allowed-5b22beacea93c2.4991724115290036929608.jpg"
                : chat.user.img
            }
            alt=""
            className="h-12 w-12 rounded-full object-cover"
          />
          <div className="flex items-center justify-between w-[80%] lg:w-[75%]">
            <div className="flex flex-col items-start">
              <span className="text-lg font-semibold">
                {chat.user.username}
              </span>
              <span className="text-sm font-light">{chat.lastMessage}</span>
            </div>
            {!chat?.isSeen && (
              <div className="badge badge-info badge-sm">new</div>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}
