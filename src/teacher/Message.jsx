import { useState } from "react";

function Message() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Good morning Mrs. Smith!",
      sender: "me",
    },
    {
      id: 2,
      text: "Good morning Ms. Ford.",
      sender: "other",
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages([
      ...messages,
      {
        id: Date.now(),
        text: message,
        sender: "me",
      },
    ]);

    setMessage("");
  };

  return (
    <main className="flex-1 flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white p-4 shadow flex justify-between items-center">
        <input
          type="text"
          placeholder="Search..."
          className="w-80 px-4 py-2 border rounded-full"
        />

        <div className="font-semibold">
          Sarah Johnson
        </div>
      </header>

      {/* Messages Area */}
      <div className="flex flex-1 overflow-hidden">

        {/* Contact List */}
        <section className="w-80 bg-white border-r">
          <div className="p-4 font-bold text-lg">
            Messages
          </div>

          <div>
            <div className="p-4 border-b cursor-pointer hover:bg-gray-50">
              <h4 className="font-semibold">
                Michael Johnson
              </h4>
              <p className="text-sm text-gray-500">
                Can we schedule a meeting...
              </p>
            </div>

            <div className="p-4 border-b cursor-pointer hover:bg-gray-50">
              <h4 className="font-semibold">
                David Martinez
              </h4>
              <p className="text-sm text-gray-500">
                I have a question...
              </p>
            </div>
          </div>
        </section>

        {/* Chat Window */}
        <section className="flex-1 flex flex-col bg-gray-50">
          {/* Chat Header */}
          <div className="bg-white p-4 border-b">
            <h3 className="font-bold">
              Sarah Smith
            </h3>
            <p className="text-sm text-gray-500">
              Parent
            </p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
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
                  className={`px-4 py-3 rounded-xl max-w-md ${
                    msg.sender === "me"
                      ? "bg-purple-600 text-white"
                      : "bg-white shadow"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="bg-white border-t p-4 flex gap-3">
            <input
              type="text"
              value={message}
              placeholder="Type your message..."
              className="flex-1 border rounded-full px-4 py-2"
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && sendMessage()
              }
            />

            <button
              onClick={sendMessage}
              className="bg-purple-600 text-white px-6 py-2 rounded-full"
            >
              Send
            </button>
          </div>
        </section>
      </div>

      {/* AI Assistant Button */}
      <button className="fixed bottom-6 right-6 bg-purple-600 text-white px-6 py-3 rounded-full shadow-lg">
        AI Assistant
      </button>
    </main>
  );
}

export default Message;