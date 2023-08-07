import React, { useState, useEffect } from "react";
import MapView, { Marker, Callout } from 'react-native-maps';
import {
  StyleSheet,
  View,
  Dimensions,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as Location from "expo-location";
import Ionicons from "react-native-vector-icons/Ionicons";
export default function MapScreen({ navigation }) {
  const tabBarHeight = useBottomTabBarHeight();
  const insets = useSafeAreaInsets();
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentRegion, setCurrentRegion] = useState({
    latitude: 34.0211573,
    longitude:34.0211573,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const initialMarkers = [
    {
      coordinate: { latitude: 34.0211573, longitude: -118.43184127750077 },
      title: "Marker 1",
      description: "This is marker 1",
      image: require("../../assets/snapchat/personalBitmoji.png")
    },
    {
      coordinate: { latitude:34.03100046677114, longitude:-118.43184127750077 },
      title: "Brothers Cousins",
      description: "Taskdfjlkasdjflkajsdlk;fjasd;lkf",
    },
  ];
  const [markers, setMarkers] = useState(initialMarkers);
  // const addMarker = (coordinate) => {
  //   setMarkers([...markers, { coordinate }]);
  // };

  const [addingMarker, setAddingMarker] = useState(false);

  const addMarker = (coordinate) => {
    setMarkers([...markers, { coordinate }]);
    setAddingMarker(false); // Reset the addingMarker state
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
        latitude: 34.0211573, //location of snap hq
        longitude: -118.4503864,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);
  let text = "Waiting...";
  text = JSON.stringify(location);
  return (
    <View style={[styles.container, { marginBottom: tabBarHeight }]}>
       {/* <View>
        <TouchableOpacity
        style={styles.cameraOptions}
        source={require("../../assets/map_bar.png")} // idk how to make this show
        />
      </View> */}
      <MapView
        style={styles.map}
        region={currentRegion}
        showsUserLocation={true}
        showsMyLocationButton={true}
        onPress={(event) => {
          if (addingMarker) {
            addMarker(event.nativeEvent.coordinate);
          }
        }}
      >
    {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={marker.coordinate}
          title={marker.title}
          description={marker.description}
        >
       
          <Image
            source={require("../../assets/apple.png")}
            style={{ width: 48, height: 48 }}
            resizeMode="contain"
          />
           <Image
            source={marker.image}
            style={{ width: 48, height: 48 }}
            resizeMode="contain"
          />
        </Marker>
      ))}
      </MapView>

      <View style={styles.cameraOptions}>
          <TouchableOpacity // code for button to add new markers!
            style={[styles.userLocation, styles.shadow]}
            onPress={() => {
              console.log("bottom");
              setAddingMarker(!addingMarker)
             
            }}
          >
            <Ionicons name="ios-add-outline" size={15} color="black" />
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
    </View>
  );
}
const styles = StyleSheet.create({
  cameraOptions: {
    // backgroundColor: 'white',
    position: "absolute",
    right: 12,
    paddingTop: 8,
    height: 250,
    width: 40,
    padding: 5,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
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