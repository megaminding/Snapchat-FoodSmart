import React, { useState, useEffect } from "react";
import {
  Modal,
  Pressable,
  TouchableOpacity,
  Text,
  View,
  Button,
  StyleSheet,
  Image,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { useNavigation } from "@react-navigation/core";

const CHATBOT_USER_OBJ = {
  _id: 1,
  name: "Team SnapChat",
  avatar: "https://loremflickr.com/140/140",
};

export default function Questionaire() {
  const [messages, setMessages] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    setMessages([
      {
        _id: 2,
        text: button(),
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
      {
        _id: 1,
        text: "Join our new FoodSmart community on Maps!",
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  }, []);

  const button = () => {
    return (
      <View>
        <Button
          title="Click here"
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModal}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Map");
              }}
            >
              <Image
                style={styles.image}
                source={require("../../assets/Survey.png")}
              />
            </Pressable>
            {/* <Button
              style={styles.submitButton}
              title="Submit"
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Map");
              }}
            /> */}
          </View>
        </View>
      </Modal>
      <GiftedChat messages={messages} />
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 400,
    height: 450,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
