import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { IconHourglassEmpty } from "@tabler/icons-react";
import "./App.css";

dayjs.extend(utc);

function App() {
  const [count, setCount] = useState<number>(0);
  const getTarget = (hour: number) => {
    if (dayjs().hour() >= hour) {
      return dayjs().add(1, "day").hour(6).minute(0).second(0).millisecond(0);
    } else {
      return dayjs().hour(6).minute(0).second(0).millisecond(0);
    }
  };
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCount(getTarget(6).valueOf() - dayjs().valueOf());
    }, 10);
    return () => {
      clearInterval(intervalId);
    };
  }, [count]);

  return (
    <div className="App">
      <header className="App-header">
        <IconHourglassEmpty
          size={100} // set custom `width` and `height`
          stroke={1} // set `stroke-width`
          className="App-logo"
        />
        <p>{getTarget(6).format("YYYY/M/D(ddd) H:mm:ss")}まであと</p>
        <h2>{dayjs(count).utc().format("HH:mm:ss.SSS")}</h2>
      </header>
    </div>
  );
}

export default App;
