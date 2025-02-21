
import ChatInterface from "@/components/chatInterface";
import RouterButton from "@/components/routerButton";

const ChatPage = () => {
    return (
        <div  className="flex flex-col justify-center items-center space-y-6 p-10">
            <ChatInterface />

            <RouterButton page="/" buttonString = "Wroc do głownej"/>
        </div>
    );
}

export default ChatPage;