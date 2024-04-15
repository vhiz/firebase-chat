import { MdEmojiEmotions } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { FaImage, FaCamera, FaMicrophoneLines } from "react-icons/fa6";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import useChatStore from "../store/useChatStrore";
import useUserStore from "../store/useUserStrore";
import toast from "react-hot-toast";
import upload from "../lib/upload";

export default function MessageInput({ img, setImg }) {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } =
    useChatStore();
  const { currentUser } = useUserStore();

  function handleImgChange(e) {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    } else {
      toast.error("You have to chose an image");
    }
  }

  function handleEmoji(e) {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  }

  async function handleSend(e) {
    e.preventDefault();
    setLoading(true);
    try {
      let imgUrl = null;

      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text: text,
          new: true,
          ...(imgUrl && { img: imgUrl }),
          createdAt: new Date(),
        }),
      });

      const userIds = [currentUser.id, user.id];
      userIds.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatSnapShot = await getDoc(userChatsRef);
        if (userChatSnapShot.exists()) {
          const userChatData = userChatSnapShot.data();
          const chatIndex = userChatData.chats.findIndex(
            (c) => c.chatId === chatId
          );
          userChatData.chats[chatIndex].lastMessage = text;
          userChatData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatData.chats[chatIndex].updatedAt = Date.now();
          await updateDoc(userChatsRef, {
            chats: userChatData.chats,
          });
        }
      });
      setText("");
      setImg({
        file: null,
        url: "",
      });
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      className="p-3 flex w-full items-center lg:justify-between gap-2 border-t border-gray-500 mt-auto"
      onSubmit={handleSend}
    >
      <div className="flex flex-wrap lg:flex-nowrap">
        <div className="tooltip" data-tip="upload image">
          <label
            htmlFor="imageUpload"
            className="btn btn-ghost btn-sm lg:btn lg:btn-ghost"
          >
            <FaImage />
            <input
              type="file"
              accept="image/*"
              multiple={false}
              name=""
              id="imageUpload"
              className="hidden"
              onChange={handleImgChange}
            />
          </label>
        </div>
        <div className="btn btn-ghost btn-sm lg:btn lg:btn-ghost">
          <FaCamera />
        </div>
        <div className="btn btn-ghost btn-sm lg:btn lg:btn-ghost">
          <FaMicrophoneLines />
        </div>
      </div>
      <label className="input input-bordered w-[80%] lg:w-full flex items-center gap-2">
        <input
          type="text"
          onChange={(e) => setText(e.target.value)}
          className="grow"
          value={text}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
          placeholder={
            isCurrentUserBlocked || isReceiverBlocked
              ? "Cant send message"
              : "Type a message"
          }
          required
        />
      </label>
      <div className="relative hidden  xl:flex">
        <div
          className="btn btn-ghost btn-sm lg:btn lg:btn-ghost"
          onClick={() => setOpen((prev) => !prev)}
        >
          <MdEmojiEmotions />
        </div>
        <div className="absolute bottom-12 left-0">
          <EmojiPicker open={open} onEmojiClick={handleEmoji} />
        </div>
      </div>
      <button
        disabled={loading || isCurrentUserBlocked || isReceiverBlocked}
        className="btn btn-info btn-sm lg:btn lg:btn-info"
      >
        <IoIosSend />
      </button>
    </form>
  );
}
