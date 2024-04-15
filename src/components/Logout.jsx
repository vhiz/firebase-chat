import { auth } from "../lib/firebase";
import useChatStore from "../store/useChatStrore";

export default function Logout() {
  const { resetChat } = useChatStore();
  return (
    <div className="p-2 w-full mt-auto mb-2">
      <button
        onClick={() => {
          auth.signOut();
          resetChat();
        }}
        className="btn w-full bg-red-500 hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );
}
