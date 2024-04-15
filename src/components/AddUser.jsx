import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import toast from "react-hot-toast";
import { IoPersonAdd, IoSearchSharp } from "react-icons/io5";
import { db } from "../lib/firebase";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import useUserStore from "../store/useUserStrore";

export default function AddUser() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [adding, setAdding] = useState(false);
  const { currentUser } = useUserStore();

  async function handleSearch(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");
    setLoading(true);
    setUser(null);
    try {
      const userRef = collection(db, "users");
      const users = query(userRef, where("username", "==", username));
      const querySnapShot = await getDocs(users);
      if (!querySnapShot.empty) {
        if (querySnapShot.docs[0].data().id === currentUser.id) return;
        setUser(querySnapShot.docs[0].data());
      } else {
        toast.error("no user found");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");
    setAdding(true);

    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });
      onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
        const data = res.data().chats;
        const userExit = data.find((f) => f.receiverId === user.id);
        if (userExit) {
          // toast.error("you have already added this user");
          return;
        } else {
          await updateDoc(doc(userChatsRef, user?.id), {
            chats: arrayUnion({
              chatId: newChatRef.id,
              lastMessage: "",
              receiverId: currentUser.id,
              updatedAt: Date.now(),
            }),
          });
          await updateDoc(doc(userChatsRef, currentUser?.id), {
            chats: arrayUnion({
              chatId: newChatRef.id,
              lastMessage: "",
              receiverId: user?.id,
              updatedAt: Date.now(),
            }),
          });
        }
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setAdding(false);
    }
  }
  return (
    <dialog id="addUser" className="modal">
      <div className="modal-box flex flex-col items-center">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>
        <form
          onSubmit={handleSearch}
          className="flex items-center gap-4 w-full justify-between mt-4"
        >
          <input
            type="text"
            name="username"
            placeholder="Type here"
            className="input input-bordered w-full"
          />
          <button disabled={loading} className="btn btn-primary">
            <IoSearchSharp />
          </button>
        </form>
        {loading ? (
          <div className=" flex w-full items-center justify-center mt-4">
            <TailSpin
              visible={true}
              height="80"
              width="80"
              color="blue"
              ariaLabel="tail-spin-loading"
              radius="1"
            />
          </div>
        ) : (
          user && (
            <form
              method="dialog"
              className=" flex w-full items-center justify-between mt-4"
              onSubmit={handleAdd}
            >
              <div className="flex items-center gap-2">
                <img
                  src={user.img}
                  alt=""
                  className="w-14 h-14 rounded-full object-cover"
                />
                <span>{user.username}</span>
              </div>
              <button disabled={adding} className="btn btn-success">
                <IoPersonAdd />
              </button>
            </form>
          )
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
