import { useState, useEffect } from "react";

export default function Pmessage() {
  const suggestions = [
    "Generate Parent Feedback",
    "Create Meeting Summary",
    "Write Professional Reply",
    "Highlight Student Progress",
    "Generate Follow-up Questions",
    "Create Weekly Report",
    "Summarize Conversation",
    "Suggest Next Action"
  ];

  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [aiSuggestion, setAiSuggestion] = useState(
    suggestions[0]
  );

  const [conversations, setConversations] = useState(() => {
    const saved = localStorage.getItem("school_messages");

    if (saved) {
      return JSON.parse(saved);
    }

    return [
      {
        id: 1,
        name: "Sarah Smith",
        unread: true,
        messages: [
          {
            id: 1,
            text: "Good morning Mrs. Smith!",
            sender: "me",
          },
          {
            id: 2,
            text: "Good morning Mr. Fox.",
            sender: "other",
          },
        ],
      },
    ];
  });

  const [selectedChat, setSelectedChat] =
    useState(0);

  useEffect(() => {
    localStorage.setItem(
      "school_messages",
      JSON.stringify(conversations)
    );
  }, [conversations]);

  const messages =
    conversations[selectedChat]?.messages || [];

  useEffect(() => {
    setAiSuggestion(
      suggestions[
        Math.floor(
          Math.random() * suggestions.length
        )
      ]
    );
  }, [messages.length]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const updated = [...conversations];

    updated[selectedChat].messages.push({
      id: Date.now(),
      text: message,
      sender: "me",
    });

    setConversations(updated);
    setMessage("");
  };

  const createNewMessage = () => {
    const name = prompt("Enter Contact Name");

    if (!name) return;

    const updated = [
      ...conversations,
      {
        id: Date.now(),
        name,
        unread: true,
        messages: [],
      },
    ];

    setConversations(updated);
    setSelectedChat(updated.length - 1);
  };

  const markAllAsRead = () => {
    setConversations(
      conversations.map((c) => ({
        ...c,
        unread: false,
      }))
    );
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">

      {/* Top Header */}
      <div className="flex justify-between items-center p-5 bg-white border-b">

        <h1 className="text-3xl font-bold">
          Messages
        </h1>

        <div className="flex gap-3">

          <button
            onClick={markAllAsRead}
            className="px-5 py-2 rounded-xl bg-gray-200 font-medium"
          >
            Mark All as Read
          </button>

          <button
            onClick={createNewMessage}
            className="px-5 py-2 rounded-xl bg-indigo-600 text-white"
          >
            New Message
          </button>

        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <div className="w-80 bg-white border-r flex flex-col">

          <div className="p-4">
           <input
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
  placeholder="Search messages..."
  className="w-full border rounded-xl p-3"
/>
          </div>

          <div className="overflow-auto">

            {conversations.map(
              (chat, index) => (
                <div
                  key={chat.id}
                  onClick={() =>
                    setSelectedChat(index)
                  }
                  className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                    selectedChat === index
                      ? "bg-indigo-50"
                      : ""
                  }`}
                >
                  <div className="flex justify-between">

                    <h3 className="font-semibold">
                      {chat.name}
                    </h3>

                    {chat.unread && (
                      <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        New
                      </span>
                    )}

                  </div>

                  <p className="text-sm text-gray-500 truncate">
                    {
                      chat.messages[
                        chat.messages.length - 1
                      ]?.text
                    }
                  </p>
                </div>
              )
            )}

          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">

          <div className="bg-white p-4 border-b">

           
<div className="bg-white p-4 border-b flex justify-between items-center">
  <h2 className="font-bold text-lg">
    {conversations[selectedChat]?.name}
  </h2>

  <div className="flex gap-2">
    <button
      className="px-3 py-2 bg-green-500 text-white rounded-lg"
      onClick={() => alert("Audio Call")}
    >
      📞
    </button>

    <button
      className="px-3 py-2 bg-blue-500 text-white rounded-lg"
      onClick={() => alert("Video Call")}
    >
      🎥
    </button>
  </div>
</div>
          </div>

          <div className="flex-1 overflow-auto p-6 space-y-4">

            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === "me"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-md px-4 py-3 rounded-2xl ${
                    msg.sender === "me"
                      ? "bg-indigo-600 text-white"
                      : "bg-white shadow"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

          </div>

          <div className="bg-white border-t p-4 flex gap-3">

            <input
              value={message}
              onChange={(e) =>
                setMessage(e.target.value)
              }
              onKeyDown={(e) =>
                e.key === "Enter" &&
                sendMessage()
              }
              placeholder="Type a message..."
              className="flex-1 border rounded-full px-4 py-3"
            />

            <button
              onClick={sendMessage}
              className="bg-indigo-600 text-white px-6 rounded-full"
            >
              Send
            </button>

          </div>

        </div>
      </div>

      {/* AI Assistant */}
      <div className="fixed bottom-6 right-6">

        <div className="bg-white shadow-xl rounded-xl p-3 mb-2 max-w-xs text-sm">
          💡 {aiSuggestion}
        </div>

        <button className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full shadow-xl">
          ✨ AI Assistant
        </button>

      </div>
    </div>
  );
}
