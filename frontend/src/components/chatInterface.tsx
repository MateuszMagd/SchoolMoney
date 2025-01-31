import { MessageCircle } from 'lucide-react';
const ChatInterface = () => {
    return (
        <div className='flex flex-row rounded-lg'>
            {/* Users */}
            <div className='flex flex-col bg-blue-600 bottom-2 rounded-lg px-16 py-2'>
                <label className='flex'>Chat <MessageCircle /> </label>
            </div>
            {/* Chat itself */}
            <div className='flex flex-col bg-white rounded-lg p-2'>
                <div> Janusz Kowalski </div>
            </div>
        </div>
    );
}

export default ChatInterface;