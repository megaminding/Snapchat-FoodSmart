import React, { useState, useEffect } from "react";
import {
  Modal,
  Pressable,
  TouchableOpacity,
  Text,
  View,
  Button,
  StyleSheet,
} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { useNavigation } from "@react-navigation/core";

const CHATBOT_USER_OBJ = {
  _id: 1,
  name: "Team SnatChap",
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
        _id: 1,
        text: "Interested in human food resources? Fill out this quick questionaire!",
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
      {
        _id: 2,
        text: button(),
        createdAt: new Date(),
        user: CHATBOT_USER_OBJ,
      },
    ]);
  }, []);

  const button = () => {
    return (
      <View>
        <Button
          title="Take this quick survey"
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
            <Text style={styles.modalText}>
              Have you ever experienced food insecurity?
            </Text>
            <Text style={styles.modalText}>
              Are you interested in learning more about food resources in your
              area?
            </Text>
            <Button
              style={styles.submitButton}
              title="Submit"
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("Map");
              }}
            />
          </View>
        </View>
      </Modal>
      <GiftedChat messages={messages} />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
