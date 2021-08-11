import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShapes,
  faMousePointer,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { faSquare, faCircle } from "@fortawesome/free-regular-svg-icons";
import {
  ShowChart as ShowChartIcon,
  Remove as RemoveIcon,
} from "@material-ui/icons";
// Theme
export const THEME_SET = "THEME_SET";
export const THEMES = {
  DEFAULT: "DEFAULT",
  DARK: "DARK",
  LIGHT: "LIGHT",
  BLUE: "BLUE",
  GREEN: "GREEN",
  INDIGO: "INDIGO",
};

export const MODES = {
  PEN: {
    name: "PEN",
    label: "Pen",
    icon: <ShowChartIcon />,
  },
  LINE: {
    name: "LINE",
    label: "Line",
    icon: <RemoveIcon />,
  },
  RECT: {
    name: "RECT",
    label: "Rectangle",
    icon: <FontAwesomeIcon icon={faSquare} />,
  },
  CIRCLE: {
    name: "CIRCLE",
    label: "Circle",
    icon: <FontAwesomeIcon icon={faCircle} />,
  },
};

export const TOOLS = {
  SELECT: {
    name: "SELECT",
    label: "Select",
    icon: <FontAwesomeIcon icon={faMousePointer} />,
  },
  PEN: {
    name: "PEN",
    label: "Pen",
    modes: [MODES.PEN, MODES.LINE],
    icon: <FontAwesomeIcon icon={faPen} />,
  },
  SHAPE: {
    name: "SHAPE",
    label: "Shape",
    modes: [MODES.RECT, MODES.CIRCLE],
    icon: <FontAwesomeIcon icon={faShapes} />,
  },
};

export const strokeTypeValues = (type, width) => {
  if (type === "LINEAR") return null;
  if (type === "DOT") return [1, 2 * width];
  if (type === "DASH") return [6 * width, 3 * width];
  if (type === "DASHDOT") return [6 * width, 3 * width, 1, 3 * width];
};
