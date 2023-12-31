import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import { collection, getDocs } from "firebase/firestore";
import db from "../../firebase";

import Header from "../components/Header";
import { CHATBOTS } from "./ConversationScreen";

export default function ChatScreen({ navigation }) {
  const [chats, setChats] = useState([]);
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();

  function getChatbots() {
    // add the chatbots to an array
    let chatbotsTemp = [];
    for (const botId in CHATBOTS) {
      chatbotsTemp.push({ isChatbot: true, chatId: botId });
      // console.log("adding bot", bot);
    }

    //add them to our list of chats
    setChats((otherChats) => [...otherChats, ...chatbotsTemp]);
  }

  async function getUserChats() {
    // get all of the "user chats" from firebase
    const querySnapshot = await getDocs(collection(db, "Chats"));

    // add the user chats to an array
    let userChatsTemp = [];
    querySnapshot.forEach((userChat) => {
      userChatsTemp.push({ isChatbot: false, chatId: userChat.id });
    });

    //add them to our list of chats
    setChats((otherChats) => [...otherChats, ...userChatsTemp]);
  }

  useEffect(() => {
    // if we already have our chats loaded, don't get them again
    if (chats.length < 1) {
      getChatbots();
      getUserChats();
    }
  }, []);

  return (
    <View
      style={[
        styles.container,
        {
          // Paddings to handle safe area
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
          marginBottom: tabBarHeight,
        },
      ]}
    >
      <Header title="Chat" />
      <View>
        {chats?.map((chat) => {
          return (
            <TouchableOpacity
              style={styles.userButton}
              onPress={() => {
                navigation.navigate("Conversation", {
                  isChatbot: chat.isChatbot,
                  chatId: chat.chatId,
                });
              }}
              key={chat.chatId}
            >
              <Ionicons
                style={styles.userIcon}
                name="ios-person-outline"
                size={36}
                color="lightgrey"
              />

              {/* This could be updated to get an actual name */}
              <Text style={styles.userName}> {chat.chatId} </Text>

              <Ionicons
                style={styles.userCamera}
                name="ios-camera-outline"
                size={24}
                color="lightgrey"
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  userButton: {
    padding: 25,
    display: "flex",
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  userIcon: {
    position: "absolute",
    left: 5,
    top: 5,
  },
  userName: {
    position: "absolute",
    left: 50,
    top: 14,
    fontSize: 18,
  },
  userCamera: {
    position: "absolute",
    right: 15,
    top: 10,
  },
});
