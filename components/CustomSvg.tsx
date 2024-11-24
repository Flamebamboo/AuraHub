import Svg, { Path } from "react-native-svg";

type Props = {
  height: number;
  width: number;
  fillColor?: string;
  style: any;
  variant: string;
};

export const CustomSvg = (props: Props) => {
  if (props.variant == "hubsIcon") {
    return (
      <Svg {...props} viewBox="0 -0.5 32 32" shape-rendering="crispEdges">
        <Path
          stroke="#ffffff"
          d="M6 0h4M5 1h1M10 1h1M5 2h1M10 2h1M5 3h1M10 3h1M5 4h1M10 4h1M6 5h4M4 7h8M14 7h12M3 8h1M12 8h1M15 8h12M3 9h1M12 9h1M25 9h2M3 10h1M12 10h1M25 10h2M4 11h8M25 11h2M1 12h1M25 12h2M1 13h2M10 13h4M25 13h2M1 14h2M9 14h6M25 14h2M1 15h2M8 15h3M13 15h3M25 15h2M1 16h2M7 16h3M14 16h3M25 16h2M1 17h2M6 17h3M15 17h3M25 17h2M1 18h2M5 18h3M16 18h3M25 18h2M1 19h1M4 19h3M17 19h3M25 19h2M3 20h3M18 20h3M25 20h2M2 21h3M19 21h3M25 21h2M1 22h3M20 22h3M25 22h3M2 23h3M19 23h3M26 23h3M4 24h2M18 24h2M28 24h2M4 25h2M8 25h8M18 25h2M23 25h2M29 25h2M4 26h2M8 26h8M18 26h2M23 26h3M29 26h2M4 27h2M8 27h2M14 27h2M18 27h2M24 27h3M28 27h2M4 28h2M8 28h2M14 28h2M18 28h2M25 28h5M4 29h2M8 29h2M14 29h2M18 29h2M27 29h2M4 30h6M14 30h6M4 31h6M14 31h6"
        />
        <Path
          stroke={props.fillColor}
          d="M6 1h4M6 2h4M6 3h4M6 4h4M4 8h8M4 9h8M4 10h8M11 15h2M10 16h4M9 17h6M8 18h8M7 19h10M6 20h12M5 21h14M4 22h16M5 23h14M6 24h12M6 25h2M16 25h2M6 26h2M16 26h2M6 27h2M16 27h2M6 28h2M16 28h2M6 29h2M16 29h2"
        />
      </Svg>
    );
  } else if (props.variant == "homeIcon") {
    return (
      <Svg {...props} viewBox="0 -0.5 32 32" shape-rendering="crispEdges">
        <Path
          stroke="#ffffff"
          d="M14 3h4M13 4h6M12 5h3M17 5h3M11 6h3M18 6h3M10 7h3M19 7h3M9 8h3M20 8h3M8 9h3M21 9h3M7 10h3M22 10h3M6 11h3M23 11h3M5 12h3M24 12h3M4 13h3M25 13h3M3 14h3M26 14h3M2 15h3M27 15h3M1 16h3M28 16h3M1 17h2M29 17h2M1 18h5M26 18h5M2 19h5M25 19h5M5 20h2M25 20h2M5 21h2M25 21h2M5 22h2M13 22h6M25 22h2M5 23h2M12 23h8M25 23h2M5 24h2M12 24h2M18 24h2M25 24h2M5 25h2M12 25h2M18 25h2M25 25h2M5 26h2M12 26h2M18 26h2M25 26h2M5 27h2M12 27h2M18 27h2M25 27h2M5 28h2M12 28h2M18 28h2M25 28h2M5 29h2M12 29h2M18 29h2M25 29h2M5 30h9M18 30h9M5 31h9M18 31h9"
        />
        <Path
          //transparent fill white solid fill when focused
          stroke={props.fillColor}
          d="M15 5h2M14 6h4M13 7h6M12 8h8M11 9h10M10 10h12M9 11h14M8 12h16M7 13h18M6 14h20M5 15h22M4 16h24M3 17h26M6 18h20M7 19h18M7 20h18M7 21h18M7 22h6M19 22h6M7 23h5M20 23h5M7 24h5M20 24h5M7 25h5M20 25h5M7 26h5M20 26h5M7 27h5M20 27h5M7 28h5M20 28h5M7 29h5M20 29h5"
        />
      </Svg>
    );
  } else if (props.variant == "profileIcon") {
    return (
      <Svg {...props} viewBox="0 -0.5 32 32" shape-rendering="crispEdges">
        <Path
          stroke="#ffffff"
          d="M12 3h8M11 4h10M10 5h3M19 5h3M9 6h3M20 6h3M9 7h2M21 7h2M9 8h2M21 8h2M8 9h2M21 9h3M8 10h2M22 10h2M8 11h2M22 11h2M8 12h2M22 12h2M9 13h2M21 13h2M9 14h3M20 14h3M10 15h3M19 15h3M11 16h10M12 17h8M9 19h14M7 20h18M6 21h4M22 21h4M5 22h3M24 22h3M5 23h2M24 23h3M4 24h2M25 24h3M4 25h2M25 25h3M4 26h2M26 26h2M4 27h2M26 27h2M4 28h2M26 28h2M4 29h2M26 29h2M4 30h24M4 31h24"
        />
        <Path
          stroke={props.fillColor}
          d="M13 5h6M12 6h8M11 7h10M11 8h10M10 9h11M10 10h12M10 11h12M10 12h12M11 13h10M12 14h8M13 15h6M10 21h12M8 22h16M7 23h17M6 24h19M6 25h19M6 26h20M6 27h20M6 28h20M6 29h20"
        />
      </Svg>
    );
  }
};
