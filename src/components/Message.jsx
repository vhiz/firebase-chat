import useChatStore from "../store/useChatStrore";
import moment from "moment";

export default function Message({ own, message }) {
  const { user } = useChatStore();

  return (
    <div
      className={`chat ${
        own ? "chat-end" : `chat-start ${message.new ? "animate-shakeX" : ""}`
      } mt-3 `}
    >
      {!own && (
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={
                user?.img ||
                "https://icon2.cleanpng.com/20180614/vjy/kisspng-computer-icons-no-symbol-not-allowed-5b22beacea93c2.4991724115290036929608.jpg"
              }
            />
          </div>
        </div>
      )}
      <div className={`chat-bubble ${own ? "bg-blue-600" : ""}`}>
        {message?.img && (
          <img
            src={message.img}
            className="w-full max-h-52 lg:max-h-72 object-cover mb-3 rounded-md"
            alt=""
          />
        )}
        {message.text}
      </div>
      <time className="chat-footer opacity-50 text-xs">
        {moment(message.createdAt.toDate()).fromNow()}
      </time>
    </div>
  );
}
