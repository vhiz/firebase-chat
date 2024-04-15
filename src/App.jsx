import { useEffect } from "react";
import "./app.css";
import Chat from "./components/Chat";
import Details from "./components/Details";
import List from "./components/List";
import Login from "./components/Login";
import Mobile from "./components/Mobile";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import useUserStore from "./store/useUserStrore";
import { ThreeDots } from "react-loader-spinner";
import useChatStore from "./store/useChatStrore";
import NoChat from "./components/NoChat";
export default function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);
  return (
    <div className="flex flex-col  w-screen h-screen lg:h-[95vh] xl:h-[90vh] lg:w-[100vw] xl:w-[90vw] bg-base-100/75 xl:rounded-xl backdrop-blur-sm saturate-150 border border-white/[0.125]">
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <ThreeDots
            visible={true}
            height="80%"
            width="80%"
            color="#A1604B"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
          />
        </div>
      ) : !currentUser ? (
        <Login />
      ) : (
        <>
          <Mobile />
          <div className="w-full flex carousel h-full">
            <List />
            {chatId ? (
              <>
                <Chat />
                <Details />
              </>
            ) : (
              <NoChat />
            )}
          </div>
        </>
      )}
      <Toaster />
    </div>
  );
}
