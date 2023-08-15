import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Location from "expo-location";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function MapScreen({ navigation }) {
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [selectedCoordinates, setCoords] = useState(null);
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 34.0211573,
    longitude: -118.4503864,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const targetCoordinates = {
    //natural history museum coordinates
    latitude: 34.0171,
    longitude: -118.2887,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  const handleGoToCoordinates = () => {
    setCurrentRegion(targetCoordinates);
  };

  const bottomSheetModalRef = useRef(null);

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
  }

  const snapPoints = useMemo(() => ["20%", "40%"], []);
  const resourcesSnapPoints = useMemo(() => ["20%", "30%"], []);

  const initialMarkers = [
    {
      coordinate: { latitude: 34.0171, longitude: -118.2887 },
      title: "Natural History Museum",
      description: "Free admission with EBT",
      image: require("../../assets/naturalhistorymuseum.png"),
    },
    {
      coordinate: { latitude: 33.99171, longitude: -118.30913 },
      title: "South Western & W 56th",
      description: "Community Fridge: 5525 S Western Ave, Los Angeles",
      image: require("../../assets/communityFridges.png"),
    },
    {
      coordinate: { latitude: 33.93801, longitude: -118.29245 },
      title: "West Athens",
      description: "Community Fridge: 1010 West 108th Street, Los Angeles ",
      image: require("../../assets/communityFridges.png"),
    },
    {
      coordinate: { latitude: 34.03238, longitude: -118.34691 },
      title: "West Adams",
      description: "Community Fridge: 4874 West Adams Blvd, Los Angeles",
      image: require("../../assets/communityFridges.png"),
    },
    // {
    //   coordinate: { latitude: 34.00468, longitude: -118.48666 },
    //   title: "Main Street Garden",
    //   description: "Community Garden: 2318 Main St. Santa Monica",
    //   image: require("../../assets/communityGarden.png"),
    // },
    {
      coordinate: { latitude: 34.00619, longitude: -118.46507 },
      title: "Marine St Garden",
      description: "Community Garden: 1406 Marine St. Santa Monica",
      image: require("../../assets/communityGarden.png"),
    },
    {
      coordinate: { latitude: 34.0309, longitude: -118.47435 },
      title: "Broadway Garden",
      description: "Community Garden: 2415 Broadway Santa Monica",
      image: require("../../assets/communityGarden.png"),
    },
    {
      coordinate: {
        latitude: 34.0169414443277,
        longitude: -118.47074704853551,
      },
      title: "Santa Monica College",
      description:
        "Food Bank: 1900 Pico Blvd, Santa Monica, CA 90405, United States Los Angeles ",
      image: require("../../assets/foodBank.png"),
    },
    {
      coordinate: {
        latitude: 34.01412822085597,
        longitude: -118.47179435899254,
      },
      title: "Church on Pearl Pantry",
      description:
        "Food Bank: 1520 Pearl Street, Santa Monica, CA 90405, United States",
      image: require("../../assets/foodBank.png"),
    },
    {
      coordinate: {
        latitude: 34.037195529699446,
        longitude: -118.44354044668881,
      },
      title: "Mar Vista Farmers Market",
      description: "Farmer’s Market: Offers up to $15 Market Match per visit",
      image: require("../../assets/farmersMarket.png"),
    },
    {
      coordinate: { latitude: 34.0210427532774, longitude: -118.4677135177408 },
      title: "Pico Farmers Market",
      description: "Farmers Market: Offers up to $15 Market Match per visit",
      image: require("../../assets/farmersMarket.png"),
    },
    {
      coordinate: {
        latitude: 34.04573565102079,
        longitude: -118.4506757042469,
      },
      title: "West LA Farmers Market",
      description: "Farmer’s Market: Accepts CalFresh",
      image: require("../../assets/farmersMarket.png"),
    },
  ];

  const plusImage = require("../../assets/carrotAdd.png");

  const cancelImage = require("../../assets/close-outline.svg");

  const [markers, setMarkers] = useState(initialMarkers);

  const [addingMarker, setAddingMarker] = useState(false);
  const [textInputValue, setTextInputValue] = useState("");

  //updating new user inputted marker title + description
  const [markerTitle, setMarkerTitle] = useState("");
  const [markerDescription, setMarkerDescription] = useState("");

  //updating new user inputted marker title + description
  const addMarker = (coordinate) => {
    if (markerTitle && markerDescription) {
      setMarkers([
        ...markers,
        { coordinate, title: markerTitle, description: markerDescription },
      ]);
      setMarkerTitle("");
      setMarkerDescription("");
      setAddingMarker(false);
      console.log(setMarkerTitle);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});

      setLocation(location);
      setCurrentRegion({
        latitude: 34.0211573,
        longitude: -118.4503864,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);
  let text = "Waiting...";
  text = JSON.stringify(location);

  const navigateToCoordinates = () => {
    const targetCoordinates = {
      latitude: 34.0171,
      longitude: -118.2887,
    };
  };

  const MarketbottomSheetModalRef = useRef(null);
  function MarkethandlePresentModal() {
    console.log("banana");
    MarketbottomSheetModalRef.current?.present();
  }

  return (
    <View style={[styles.container, { marginBottom: tabBarHeight }]}>
      <BottomSheetModalProvider>
        <MapView
          style={styles.map}
          showsUserLocation={true}
          showsMyLocationButton={true}
          region={currentRegion}
          onPress={(event) => {
            if (addingMarker) {
              setCoords(event.nativeEvent.coordinate);
              handlePresentModal();
            }
          }}
        >
          <BottomSheetModal
            ref={MarketbottomSheetModalRef}
            index={1}
            snapPoints={resourcesSnapPoints}
          >
            <View>
              <Image
                style={{ width: 390, height: 1000 }}
                resizeMode="contain"
                source={require("../../assets/foodresources.png")}
              ></Image>
            </View>
          </BottomSheetModal>
          <BottomSheetModal
            ref={bottomSheetModalRef}
            index={1}
            snapPoints={snapPoints}
            // style={{backgroundColor:"#ECECEE"}}
          >
            <View>
              <Text
                style={{
                  fontFamily: "Avenir Next",
                  fontSize: 16,
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: 24,
                  marginLeft: 30,
                }}
              >
                Add a Title
              </Text>
              <TextInput
                placeholder="Enter title"
                value={markerTitle}
                onChangeText={setMarkerTitle}
                style={{
                  width: 370,
                  height: 60,
                  padding: 20,
                  backgroundColor: "#ECECEE",
                  alignItems: "flex-start",
                  borderRadius: 16,
                  fontFamily: "Avenir Next",
                  fontSize: 16,
                  color: "black",
                  margin: 10,
                  // gap: '10px',
                }}
                // style={styles.input}
              />
              <Text
                style={{
                  fontFamily: "Avenir Next",
                  fontSize: 16,
                  fontStyle: "normal",
                  fontWeight: "700",
                  lineHeight: 24,
                  marginLeft: 30,
                  marginTop: 10,
                }}
              >
                Add a Description
              </Text>
              <TextInput
                placeholder="Enter a description"
                value={markerDescription}
                onChangeText={setMarkerDescription}
                style={{
                  width: 370,
                  height: 60,
                  padding: 20,
                  backgroundColor: "#ECECEE",
                  alignItems: "flex-start",
                  borderRadius: 16,
                  fontFamily: "Avenir Next",
                  fontSize: 16,
                  color: "black",
                  margin: 10,
                  // gap: '10px',
                }}
                // style={styles.input}
              />
              <TouchableOpacity
                title="Submit"
                color="black"
                onPress={() => {
                  addMarker(selectedCoordinates);
                  handlePresentModal();
                }}
              >
                <Image
                  // style={styles.bitmojiImage}
                  style={{ width: 360, height: 35, marginLeft: 10 }}
                  resizeMode="contain"
                  source={require("../../assets/Button.png")}
                />
              </TouchableOpacity>
            </View>
          </BottomSheetModal>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
              onPress={MarkethandlePresentModal}
            >
              {marker.image ? (
                <Image
                  source={marker.image}
                  style={{ width: 25, height: 48 }}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={require("../../assets/unofficialPin.png")}
                  style={{ width: 25, height: 48 }}
                  resizeMode="contain"
                />
              )}
            </Marker>
          ))}
        </MapView>
        <View style={styles.leftIcons}>
          <TouchableOpacity onPress={handleGoToCoordinates}>
            <Image
              source={require("../../assets/ChatFeature.png")}
              style={{ width: 195, height: 200, margin: -10 }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity // code for button to add new markers!
          style={[styles.userLocation, styles.shadow]}
          onPress={() => {
            console.log("bottom");
            setAddingMarker(!addingMarker);
          }}
        >
          <Ionicons
            name={addingMarker ? "ios-close-outline" : "ios-add-outline"}
            size={30}
            color={addingMarker ? "red" : "black"}
          />
        </TouchableOpacity>

        <View style={styles.rightIcons}>
          <View style={styles.first}>
            <TouchableOpacity>
              <Image
                source={require("../../assets/mapRightIcons.png")}
                style={{ width: 50, height: 250 }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity // code for button to add new markers!
            style={[styles.userLocation, styles.shadow]}
            onPress={() => {
              console.log("bottom");
              setAddingMarker(!addingMarker);
            }}
          >
            <Ionicons
              name={addingMarker ? "ios-close-outline" : "ios-add-outline"}
              size={30}
              color={addingMarker ? "red" : "black"}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <Ionicons style={styles.nightModeIcon} size={30} color="white" />
          </TouchableOpacity>
        </View>

        <View style={[styles.mapFooter]}>
          <View style={styles.locationContainer}>
            <TouchableOpacity
              style={[styles.userLocation, styles.shadow]}
              onPress={() => {
                console.log("Go to user location! - top");
                const { latitude, longitude } = location.coords;
                setCurrentRegion({ ...currentRegion, latitude, longitude });
              }}
            >
              <Ionicons name="ios-navigate" size={15} color="black" />
            </TouchableOpacity>
          </View>

          <View style={[styles.bitmojiContainer, styles.shadow]}>
            <View style={styles.myBitmoji}>
              <Image
                style={styles.bitmojiImage}
                source={require("../../assets/snapchat/personalBitmoji.png")}
              />
              <View style={styles.bitmojiTextContainer}>
                <Text style={styles.bitmojiText}>My Bitmoji</Text>
              </View>
            </View>
            <View style={styles.places}>
              <Image
                style={styles.bitmojiImage}
                source={require("../../assets/snapchat/personalBitmoji.png")}
              />
              <View style={styles.bitmojiTextContainer}>
                <Text style={styles.bitmojiText}>Places</Text>
              </View>
            </View>
            <View style={styles.myFriends}>
              <Image
                style={styles.bitmojiImage}
                source={require("../../assets/snapchat/personalBitmoji.png")}
              />
              <View style={styles.bitmojiTextContainer}>
                <Text style={styles.bitmojiText}>Friends</Text>
              </View>
            </View>
          </View>
        </View>
      </BottomSheetModalProvider>
    </View>
  );
}
const styles = StyleSheet.create({
  calloutContainer: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  calloutText: {
    color: "white",
    textAlign: "center",
  },
  input: {
    padding: 20,
    height: 50,
  },
  backgroundImage: {
    flex: 1,
  },
  flipIcon: {
    marginTop: 10,
    transform: [{ rotate: "90deg" }],
  },
  flashIcon: {
    marginTop: 20,
  },
  videoIcon: {
    marginTop: 20,
  },
  musicIcon: {
    marginTop: 20,
  },
  nightModeIcon: {
    marginTop: 20,
  },
  rightIcons: {
    position: "absolute",
    right: 20,
    paddingTop: 30,
    height: 700,
    width: 40,
    padding: 5,
  },
  leftIcons: {
    position: "absolute",
    left: 5,
    paddingTop: 30,
    height: 700,
    width: 40,
    padding: 5,
  },
  first: {
    right: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },

  mapyFooter: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    bottom: 0,
  },
  mapFooter: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
    bottom: 0,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  locationContainer: {
    backgroundColor: "transparent",
    width: "100%",
    paddingBottom: 8,
    alignItems: "center",
  },
  userLocation: {
    backgroundColor: "white",
    borderRadius: 100,
    height: 36,
    width: 36,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  shadow: {
    shadowColor: "rgba(0, 0, 0)",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 3,
    shadowOpacity: 0.5,
    elevation: 4,
  },
  bitmojiContainer: {
    width: "100%",
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  myBitmoji: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
  bitmojiImage: {
    width: 50,
    height: 50,
  },
  bitmojiTextContainer: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 4,
  },
  bitmojiText: {
    fontSize: 10,
    fontWeight: "700",
  },
  places: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
  myFriends: {
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
  },
});
