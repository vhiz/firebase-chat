import AddUser from "./AddUser";
import ChatList from "./ChatList";
import UserInfo from "./UserInfo";

export default function List() {
  return (
    <div id="list" className="carousel-item w-full lg:flex-1 flex flex-col">
      <UserInfo />
      <AddUser />
      <ChatList />
    </div>
  );
}
