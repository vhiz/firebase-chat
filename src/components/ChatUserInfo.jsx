import { FaPhone, FaVideo, FaCircleInfo } from "react-icons/fa6";
import useChatStore from "../store/useChatStrore";
export default function ChatUserInfo() {
  const { user } = useChatStore();

  return (
    <div className="p-3 flex items-center justify-between border-b border-gray-500">
      <div className=" flex items-center gap-4">
        <img
          src={
            user?.img ||
            "https://icon2.cleanpng.com/20180614/vjy/kisspng-computer-icons-no-symbol-not-allowed-5b22beacea93c2.4991724115290036929608.jpg"
          }
          alt=""
          className="w-10 h-10 lg:w-14 lg:h-14 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <span className="lg:text-lg font-semibold">{user?.username}</span>
          <p className="text-xs lg:text-sm font-light text-gray-300">
            {user?.desc}
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <button className="btn btn-ghost btn-sm lg:btn lg:btn-ghost">
          <FaPhone />
        </button>
        <button className="btn btn-ghost btn-sm lg:btn lg:btn-ghost">
          <FaVideo />
        </button>
        <button className="btn btn-ghost btn-sm lg:btn lg:btn-ghost">
          <FaCircleInfo />
        </button>
      </div>
    </div>
  );
}
