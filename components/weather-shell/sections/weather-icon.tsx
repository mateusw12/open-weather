import {
  WiCloud,
  WiDayCloudy,
  WiDaySunny,
  WiFog,
  WiRain,
  WiShowers,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";

export function renderWeatherIcon(main: string, size = 24) {
  const key = main.toLowerCase();

  if (key.includes("thunderstorm")) {
    return <WiThunderstorm size={size} />;
  }

  if (key.includes("snow")) {
    return <WiSnow size={size} />;
  }

  if (key.includes("mist") || key.includes("haze") || key.includes("fog") || key.includes("smoke")) {
    return <WiFog size={size} />;
  }

  if (key.includes("rain")) {
    return <WiRain size={size} />;
  }

  if (key.includes("drizzle") || key.includes("shower")) {
    return <WiShowers size={size} />;
  }

  if (key.includes("cloud")) {
    return key.includes("few") ? <WiDayCloudy size={size} /> : <WiCloud size={size} />;
  }

  return <WiDaySunny size={size} />;
}
