import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, Platform } from "react-native";
import { getChat } from "../utils/hooks/getChatGPT";

const CHATBOT_USER_OBJ = {
  _id: 2,
  name: "FoodSmart AI",
  avatar: require("../../assets/winston.png"),
};

const prompt = [
  {
    role: "system",
    content:
      "You are FoodSmart AI, a chatbot designed for Snapchat to assist its users with knowledge and tips regarding food security. All your reponses will be directed towards the user.",
  },
];

export default function FoodSmartAI() {
  const [messages, setMessages] = useState([]);
  const [messagesGPT, setMessagesGPT] = useState([]);

  async function fetchInitialMessage() {
    const response = await getChat(prompt);
    const message = response.choices[0].message;
    const content = response.choices[0].message.content;
    setMessagesGPT(messagesGPT.concat(message));
    setMessages([
      {
        _id: 1,
        text: content,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  }

  useEffect(() => {
    fetchInitialMessage();
  }, []);

  const addNewMessage = (newMessages) => {
    setMessages((previousMessages) => {
      return GiftedChat.append(previousMessages, newMessages);
    });
  };

  const addBotMessage = (text) => {
    addNewMessage([
      {
        _id: Math.round(Math.random() * 1000000),
        text: text,
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  };

  const respondToUser = async (userMessages) => {
    const userMessageText = userMessages[0].text;
    const messageObj = {
      role: "user",
      content: userMessageText,
    };
    const messageHistory = messagesGPT.concat(messageObj);

    setMessagesGPT(messageHistory);
    let response = await getChat(messageHistory);
    const messageResponse = response.choices[0].message;
    const content = messageResponse.content;
    setMessagesGPT(messageHistory.concat(messageResponse));
    addBotMessage(content);
  };

  const onSend = useCallback((messages = []) => {
    addNewMessage(messages);
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => {
        onSend(messages);
        setTimeout(() => respondToUser(messages), 1000);
      }}
      user={{
        _id: 1,
        name: "User (WINSTON)",
      }}
      renderUsernameOnMessage={true}
    />
  );
}
