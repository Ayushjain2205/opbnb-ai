import React, { useState, useRef, useEffect, useContext } from "react";
import AIMessage from "../Messages/AIMessage";
import UserMessage from "../Messages/UserMessage";
import {
  GenerateNFT,
  DisplayNFT,
  SmartContract,
  Graph,
  WalletHealth,
  TokenList,
  Gas,
  TokenTransfers,
  TransactionReceipt,
  TranscationsChart,
  EventCharts,
  MyContracts,
  MyCustomComponent,
} from "../Templates";
import Loader from "../Functional/Loader";
import { ModeContext } from "../../contexts/ModeContext";

const ChatScreen = ({ messages, setMessages, inputValue, setInputValue }) => {
  const { mode } = useContext(ModeContext);

  const [loading, setLoading] = useState(false);
  const [devMessageIndex, setdevMessageIndex] = useState(0);
  const [analyticsMessageIndex, setAnalyticsMessageIndex] = useState(0);

  const devMessage = [
    {
      text: "Hey, sure. Here is the visualisation you requested! Click on the chart to view the details.",
      ChildComponent: TranscationsChart,
    },
    {
      text: "Here is the breakup of all the events that were called.",
      ChildComponent: EventCharts,
    },
    {
      text: "Here are your deployed smart contracts, characterised by Token type BEP20, ERC721, ERC1155.",
      ChildComponent: MyContracts,
    },
    {
      text: "Here are your deployed smart contracts characterised smart contract category along with event breakdown!",
      ChildComponent: MyCustomComponent,
    },
  ];

  const analyticsMessage = [
    {
      text: "Let's check your wallet health!",
      ChildComponent: WalletHealth,
    },
    {
      text: "Here are the token transfers",
      ChildComponent: TokenList,
    },
    {
      text: "Here is the transaction receipt",
      ChildComponent: TokenTransfers,
    },
    {
      text: "Here is the gas card",
      ChildComponent: Gas,
    },
    {
      text: "Here is the transaction receipt",
      ChildComponent: TransactionReceipt,
    },
  ];

  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const svgFillColor = inputValue
    ? mode === "light"
      ? "#F3BA2F"
      : "#35363B"
    : "#E7E9EB";

  const devMode = () => {
    // Check to avoid index out of bound
    if (devMessageIndex < devMessage.length) {
      setLoading(true);

      setTimeout(() => {
        // Update the messages
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "ai",
            text: devMessage[devMessageIndex].text,
            showResource: false,
            showPrompt: false,
            ChildComponent: devMessage[devMessageIndex].ChildComponent,
          },
        ]);

        // Increment the message index for the next interaction
        setdevMessageIndex((prevIndex) => prevIndex + 1);

        // Deactivate the loader
        setLoading(false);
      }, 2000);
    } else {
      // Optionally, reset the minting process or handle completion logic here
      console.log("Minting process complete!");
    }
  };

  const analyticsMode = () => {
    // Check to avoid index out of bounds
    if (analyticsMessageIndex < analyticsMessage.length) {
      setLoading(true);

      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            sender: "ai",
            text: analyticsMessage[analyticsMessageIndex].text,
            showResource: false,
            showPrompt: false,
            ChildComponent:
              analyticsMessage[analyticsMessageIndex].ChildComponent,
          },
        ]);

        // Increment the message index for the next interaction
        setAnalyticsMessageIndex((prevIndex) => prevIndex + 1);

        // Deactivate the loader
        setLoading(false);
      }, 2000); // Adjust delay as needed
    } else {
      // Handle completion logic for analytics mode
      console.log("Analytics review complete!");
    }
  };

  const walletHealth = () => {
    // Activate the loader
    setLoading(true);

    // Use setTimeout to introduce a delay
    setTimeout(() => {
      // Update the messages
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "ai",
          text: "Let's check your wallet health!",
          showResource: false,
          showPrompt: false,
          ChildComponent: WalletHealth,
        },
      ]);

      // Deactivate the loader
      setLoading(false);
    }, 4000); // 4000ms = 4 seconds
  };

  const checkGas = () => {
    // Activate the loader
    setLoading(true);

    // Use setTimeout to introduce a delay
    setTimeout(() => {
      // Update the messages
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "ai",
          text: "The gas fees on the Network is currently high!",
          showResource: false,
          showPrompt: false,
          ChildComponent: Gas,
        },
      ]);

      // Deactivate the loader
      setLoading(false);
    }, 4000); // 4000ms = 4 seconds
  };

  const showTokens = () => {
    // Activate the loader
    setLoading(true);

    // Use setTimeout to introduce a delay
    setTimeout(() => {
      // Update the messages
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "ai",
          text: "The tokens held by the specified account are:",
          showResource: false,
          showPrompt: false,
          ChildComponent: TokenList,
        },
      ]);

      // Deactivate the loader
      setLoading(false);
    }, 4000); // 4000ms = 4 seconds
  };

  const showTransfers = () => {
    // Activate the loader
    setLoading(true);

    // Use setTimeout to introduce a delay
    setTimeout(() => {
      // Update the messages
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "ai",
          text: "The transaction history for the specified address is as follows, feel free to filter by the given parameters",
          showResource: false,
          showPrompt: false,
          ChildComponent: TokenTransfers,
        },
      ]);

      // Deactivate the loader
      setLoading(false);
    }, 4000); // 4000ms = 4 seconds
  };

  const showTransaction = () => {
    // Activate the loader
    setLoading(true);

    // Use setTimeout to introduce a delay
    setTimeout(() => {
      // Update the messages
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "ai",
          text: "This is the transaction breakdown for the specified transcation hash:",
          showResource: false,
          showPrompt: false,
          ChildComponent: TransactionReceipt,
        },
      ]);

      // Deactivate the loader
      setLoading(false);
    }, 4000); // 4000ms = 4 seconds
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text: inputValue },
      ]);

      // devMode();
      // analyticsMode();
      // walletHealth();
      // checkGas();
      // showTokens();
      // showTransfers();
      showTransaction();
      setInputValue("");
    }
  };

  return (
    <div className="flex flex-col flex-1 h-full px-[16px]">
      <div className="flex-1 overflow-y-scroll">
        {messages.map((message, index) => {
          if (message.sender === "user") {
            return <UserMessage key={index} message={message.text} />;
          } else if (message.sender === "ai") {
            return (
              <AIMessage
                key={index}
                message={message.text}
                showResource={message.showResource}
                showPrompt={message.showPrompt}
                ChildComponent={message.ChildComponent}
                relatedPrompts={message.relatedPrompts}
                resources={message.resources}
              />
            );
          } else {
            return null;
          }
        })}
        {loading && (
          <div className="flex justify-center items-center p-4">
            <Loader />
          </div>
        )}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="flex-none">
        <div className="flex flex-row items-center pr-[12px] rounded-[2px] border-[3px] border-[#E7E9EB] bg-transparent w-full h-[64px]">
          <input
            className="bg-transparent w-full p-[18px] focus:outline-none"
            type="text"
            placeholder="Send a prompt"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          <svg
            width="36"
            height="36"
            viewBox="0 0 36 36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleSendMessage}
          >
            <path
              d="M0 4.5C0 3.30653 0.474106 2.16193 1.31802 1.31802C2.16193 0.474106 3.30653 0 4.5 0L31.5 0C32.6935 0 33.8381 0.474106 34.682 1.31802C35.5259 2.16193 36 3.30653 36 4.5V31.5C36 32.6935 35.5259 33.8381 34.682 34.682C33.8381 35.5259 32.6935 36 31.5 36H4.5C3.30653 36 2.16193 35.5259 1.31802 34.682C0.474106 33.8381 0 32.6935 0 31.5V4.5ZM12.375 27C12.3749 27.2169 12.4376 27.4291 12.5553 27.6112C12.6731 27.7933 12.841 27.9375 13.0387 28.0264C13.2365 28.1153 13.4558 28.1452 13.6702 28.1124C13.8845 28.0796 14.0848 27.9855 14.247 27.8415L24.372 18.8415C24.491 18.7359 24.5862 18.6064 24.6514 18.4613C24.7166 18.3163 24.7503 18.159 24.7503 18C24.7503 17.841 24.7166 17.6837 24.6514 17.5387C24.5862 17.3936 24.491 17.2641 24.372 17.1585L14.247 8.1585C14.0848 8.01451 13.8845 7.92045 13.6702 7.88764C13.4558 7.85484 13.2365 7.88469 13.0387 7.9736C12.841 8.06251 12.6731 8.2067 12.5553 8.38879C12.4376 8.57089 12.3749 8.78314 12.375 9V27Z"
              fill={svgFillColor}
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChatScreen;
