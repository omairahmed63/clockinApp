import React, { useContext, useEffect, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import AppContext from "../../AppContext";

const ClockIn: React.FC = ({ coords, todayShift, handleClockIn }) => {
  const context = useContext(AppContext);
  const [disabled, setDisabled] = useState<boolean>(true);

  //   console.log(context.location.longitude + "==" + coords.longitude);
  //   console.log("========================");
  //   console.log(context.location.latitude + "==" + coords.latitude);
  const handleClockInPress = () => {
    // console.log(context.shifts[todayShift]);
    setDisabled(true);
    handleClockIn(todayShift);
  };

  useEffect(() => {
    if (
      context.location.longitude !== coords.longitude &&
      context.location.latitude !== coords.altitude
    ) {
      if (context.shifts[todayShift].checkInTime == "") {
        setDisabled(false);
      }
    }
  }, [coords]);

  return (
    <View>
      <Button
        title="Clock In"
        disabled={disabled}
        onPress={handleClockInPress}
      />
    </View>
  );
};

export default ClockIn;
