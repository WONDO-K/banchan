import React, { useState, ChangeEvent, FormEvent } from "react";
import { ChatBoxProps } from "../../Type";

const ChatBox: React.FC<ChatBoxProps> = ({ onSendMessage, messages }) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 h-full">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">ChatBox</h1>
      </div>
      <div className="mb-4 h-[500px] overflow-y-auto border border-gray-200 p-4 rounded">
        {messages.map((message) => (
          <div key={message.id} className="mb-2 p-2 bg-gray-100 rounded">
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded mr-2"
            placeholder="Type a message"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatBox;
