import { Line } from "react-konva";
import { strokeTypeValues } from "../../constants";

export class Pen {
  constructor(info) {
    this.id = info.id;
    this.type = info.type;
    this.points = info.points;
    this.color = info.color;
    this.strokeWidth = info.strokeWidth;
    this.strokeType = info.strokeType;
  }
  modifyPoints(position) {
    this.points = this.points.concat([position.x, position.y]);
  }
  render() {
    return (
      <Line
        key={this.id}
        points={this.points}
        stroke={this.color}
        strokeWidth={this.strokeWidth}
        dash={strokeTypeValues(this.strokeType, this.strokeWidth)}
        tension={0}
        lineCap="round"
        lineJoin="round"
        globalCompositeOperation="source-over"
      />
    );
  }
}
