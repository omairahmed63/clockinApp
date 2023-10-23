import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";
import ShiftWorkerList from "./app/components/ShiftWorkerList";
import { useEffect, useState } from "react";
import AppContext from "./AppContext";

const shifts = [
  {
    shiftId: 1,
    workerId: "001",
    workerName: "Adam",
    shiftStartTime: "4:00 PM",
    shiftEndTime: "9:00 PM",
    shiftDate: "2023-10-22",
    restaurant: "Restaurant A",
    restaurantLocation: "First Ave",
    restaurantLat: "",
    restaurantLong: "",
    restaurantHours: "4:00 PM - 09:00PM",
    checkInTime: "3:30 PM",
    checkOutTime: "9:00 PM",
  },
  {
    shiftId: 2,
    workerId: "001",
    workerName: "Adam",
    shiftStartTime: "4:00 PM",
    shiftDate: "2023-10-23",
    shiftEndTime: "09:00 PM",
    restaurant: "Restaurant A",
    restaurantLocation: "Fifth Ave",
    restaurantLat: "",
    restaurantLong: "",
    restaurantHours: "4:00 PM - 09:00PM",
    checkInTime: "",
    checkOutTime: "",
  },
  {
    shiftId: 3,
    workerId: "001",
    workerName: "Adam",
    shiftStartTime: "4:00 PM",
    shiftDate: "2023-10-24",
    shiftEndTime: "09:00 PM",
    restaurant: "Restaurant A",
    restaurantLocation: "Third Ave",
    restaurantLat: "",
    restaurantLong: "",
    restaurantHours: "4:00 PM - 09:00PM",
    checkInTime: "",
    checkOutTime: "",
  },
];

const initalProps = {
  location: {
    latitude: 0,
    longitude: 0,
  },
  todaysShift: 0,
  shifts: shifts,
};

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // Define a function to get the location
      const getLocation = async () => {
        try {
          const updatedLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
          });
          initalProps.location.latitude = updatedLocation.coords.latitude;
          initalProps.location.longitude = updatedLocation.coords.longitude;
        } catch (error) {
          setErrorMsg("Error getting location: " + error);
        }
      };
      // Initially, get the location
      getLocation();

      const locationSubscriber = Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.BestForNavigation,
          timeInterval: 1000, // Update interval in milliseconds
          distanceInterval: 1, // Minimum distance (in meters) between location updates
        },
        (newLocation) => {
          // Handle the new location data
          setLocation(newLocation);
          console.log("initalProps", initalProps);
        }
      );

      return () => {
        locationSubscriber.remove();
      };
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    // <View style={styles.container}>
    //   <Text>Open up App.tsx to start working on the Verfico app!</Text>
    //   <StatusBar style="auto" />
    // </View>
    <AppContext.Provider value={initalProps}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.appTitle}>Verfico app</Text>
          {location != null && (
            <ShiftWorkerList
              currrentlocation={location}
              shifts={initalProps.shifts}
            />
          )}
        </View>
        <View style={styles.divider}></View>
        <Text style={{}}>{text}</Text>
      </ScrollView>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1, // Set the height to control the thickness of the divider
    backgroundColor: "gray", // Choose the color you want for the divider
    marginVertical: 10, // Adjust the margin as needed
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 50,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
