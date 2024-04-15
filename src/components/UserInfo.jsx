import { MdEdit, MdMoreHoriz } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";
import useUserStore from "../store/useUserStrore";
export default function UserInfo() {
  const { currentUser } = useUserStore();
  return (
    <div className="flex p-3 items-center justify-between">
      <div className="flex items-center gap-x-3">
        <img
          src={currentUser.img}
          alt=""
          className=" w-12 h-12 object-cover border-2 border-gray-500 rounded-full"
        />
        <h2 className="text-lg">{currentUser.username}</h2>
      </div>
      <div className="flex">
        <button className="btn btn-ghost">
          <MdMoreHoriz />
        </button>
        <button className="btn btn-ghost">
          <FaVideo />
        </button>
        <button className="btn btn-ghost">
          <MdEdit />
        </button>
      </div>
    </div>
  );
}
