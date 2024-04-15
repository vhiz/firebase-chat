import { IoIosArrowUp, IoMdArrowRoundDown } from "react-icons/io";
import Logout from "./Logout";
import useChatStore from "../store/useChatStrore";
import useUserStore from "../store/useUserStrore";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import toast from "react-hot-toast";

export default function Details() {
  const { user, isCurrentUserBlocked, isReceiverBlocked, changeBlocked, chat } =
    useChatStore();

  const { currentUser } = useUserStore();

  async function handleBlock() {
    if (!user) return;
    const userDocRef = doc(db, "users", currentUser.id);
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlocked();
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  return (
    <div
      id="details"
      className="lg:flex-1 flex flex-col carousel-item w-full h-full"
    >
      <div className="flex flex-col items-center p-3 gap-y-2 border-b border-gray-600">
        <img
          src={
            user?.img ||
            "https://icon2.cleanpng.com/20180614/vjy/kisspng-computer-icons-no-symbol-not-allowed-5b22beacea93c2.4991724115290036929608.jpg"
          }
          alt=""
          className="lg:w-20 lg:h-20 w-14 h-14 rounded-full object-cover border-2 border-gray-300"
        />
        <h2 className="text-lg font-semibold">{user?.username}</h2>
        <p className="text-sm font-light text-center">{user?.desc}</p>
      </div>
      <div className="flex flex-col overflow-y-scroll scrollbar-none">
        <div className="flex flex-col p-2">
          <div className="flex items-center justify-between">
            <h2>Chat Settings</h2>
            <button className="btn btn-ghost rounded-full">
              <IoIosArrowUp />
            </button>
          </div>
        </div>
        <div className="flex flex-col p-2">
          <div className="flex items-center justify-between">
            <h2>Chat Settings</h2>
            <button className="btn btn-ghost rounded-full">
              <IoIosArrowUp />
            </button>
          </div>
        </div>
        <div className="flex flex-col p-2">
          <div className="flex items-center justify-between">
            <h2>Privacy & Help</h2>
            <button className="btn btn-ghost rounded-full">
              <IoIosArrowUp />
            </button>
          </div>
        </div>
        <div className="flex flex-col p-2">
          <div className="flex items-center justify-between">
            <h2>Shared Photos</h2>
            <button className="btn btn-ghost rounded-full">
              <IoIosArrowUp className="rotate-180 duration-300" />
            </button>
          </div>
          <div className="flex flex-col gap-y-2 overflow-y-scroll scrollbar-none h-[25vh]">
            {chat?.messages
              ?.filter((c) => c.img)
              ?.map((img, i) => (
                <div
                  key={i}
                  className="flex w-full justify-between items-center"
                >
                  <div className="flex gap-2 items-center">
                    <img
                      src={img?.img}
                      alt=""
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <span>Photo_20033233</span>
                  </div>
                  <a
                    href={img.img}
                    download
                    target="_blank"
                    className="btn btn-ghost"
                  >
                    <IoMdArrowRoundDown />
                  </a>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col p-2">
          <div className="flex items-center justify-between">
            <h2>Shared Photos</h2>
            <button className="btn btn-ghost rounded-full">
              <IoIosArrowUp className="duration-300" />
            </button>
          </div>
        </div>
        <div className="p-3 w-full">
          <button
            onClick={handleBlock}
            className="btn btn-error w-full text-white"
          >
            {isCurrentUserBlocked
              ? "You are blocked"
              : isReceiverBlocked
              ? "User Blocked"
              : "Block User"}
          </button>
        </div>
      </div>
      <Logout />
    </div>
  );
}
