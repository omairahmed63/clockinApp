import React, { useContext, useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import AppContext from "../../AppContext";

const ClockOut: React.FC = ({ clockin, todayShift, handleClockOut }) => {
  const context = useContext(AppContext);
  const [disabled, setDisabled] = useState<boolean>(true);
  const handleClockOutPress = () => {
    // Implement clock-out logic here
    handleClockOut(todayShift);
    setDisabled(true);
  };

  useEffect(() => {
    if (clockin !== null) {
      setDisabled(false);
    }
  }, [clockin]);

  return (
    <View>
      <Button
        title="Clock Out"
        disabled={disabled}
        onPress={handleClockOutPress}
      />
    </View>
  );
};

export default ClockOut;
