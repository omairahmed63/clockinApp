import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker";
import ClockIn from "./Clockin";
import ClockOut from "./Clockout";
import AppContext from "../../AppContext";

const ShiftWorkerList: React.FC = ({ currrentlocation, shifts }) => {
  const context = useContext(AppContext);
  const [selectedShift, setSelectedShift] = useState<string | null>(null);
  const [todayShift, setTodayShift] = useState<number | null>(null);
  const [clockin, setClockin] = useState<string | null>(null);
  const [clockOut, setClockout] = useState<string | null>(null);
  // console.log("currrentlocation", currrentlocation.coords);
  // console.log("shifts", shifts);
  console.log("context", context);
  useEffect(() => {
    const todayDate = new Date().toISOString().split("T")[0];
    const todaysShift = shifts.find((shift) => shift.shiftDate === todayDate);
    setTodayShift(todaysShift ? todaysShift.shiftId : null);
    setSelectedShift(todaysShift ? todaysShift.shiftId : null);
    context.todaysShift = todaysShift.shiftId;
  }, []);

  const calculateHoursWorked = (shift: any) => {};

  const labelContent = (shift) => {
    // console.log(" todayShift", todayShift);
    // console.log(" shift.shiftId", shift.shiftId);
    let isCompleted = todayShift <= shift.shiftId ? "Pending" : "Done";
    var date = shift.shiftDate.replace("2023-", "");
    return `${shift.restaurantLocation} at ${shift.shiftStartTime} - ${date} - ${isCompleted}`;
  };

  const getCurrentDateTime = () => {
    const currentDate = new Date();

    // Extract the date and time components
    const date = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString();
    return `${date} ${time}`;
  };

  const handleClockIn = (todayShift) => {
    // clock-in logic here, capture the checkin time and date and count hours until checkout
    const clockinTime = getCurrentDateTime();
    //set the checkin date and time and disaled checkin button
    context.shifts[todayShift].checkInTime = clockinTime;
    setClockin(clockinTime);
    // console.log(context.shifts[todayShift]);
  };

  const handleClockOut = (todayShift) => {
    const clockOutTime = getCurrentDateTime();
    // Implement clock-out logic here
    console.log("todayShift", todayShift);
    context.shifts[todayShift].checkOutTime = clockOutTime;
    setClockout(clockOutTime);
  };

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "stretch",
        width: 350,
      }}
    >
      <Text>Hey Adam, check your shift details:</Text>
      <Picker
        style={{ height: 200 }}
        selectedValue={selectedShift}
        onValueChange={(itemValue) => setSelectedShift(itemValue)}
      >
        {shifts.map((shift) => (
          <Picker.Item
            key={shift.workerId}
            label={labelContent(shift)}
            value={shift.shiftId}
            enabled={todayShift === shift.shiftId}
          />
        ))}
      </Picker>
      <ClockIn
        coords={currrentlocation.coords}
        todayShift={todayShift}
        handleClockIn={handleClockIn}
      />
      <ClockOut
        clockin={clockin}
        todayShift={todayShift}
        handleClockOut={handleClockOut}
      />
      {clockin && (
        <View>
          <View style={styles.divider}></View>
          <Text style={{}}>{`Your shift started at ${clockin}`}</Text>
          {clockOut && (
            <Text style={{}}>{`Your shift ended at ${clockOut}`}</Text>
          )}
        </View>
      )}
    </View>
  );
};

export default ShiftWorkerList;

const styles = StyleSheet.create({
  divider: {
    height: 1, // Set the height to control the thickness of the divider
    backgroundColor: "gray", // Choose the color you want for the divider
    marginVertical: 10, // Adjust the margin as needed
  },
});
