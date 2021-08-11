import { Line as KonvaLine } from "react-konva";
import { strokeTypeValues } from "../../constants";

export class Line {
  constructor(info) {
    this.id = info.id;
    this.type = info.type;
    this.points = info.points;
    this.color = info.color;
    this.strokeWidth = info.strokeWidth;
    this.strokeType = info.strokeType;
  }
  modifyPoints(position) {
    this.points = this.points.slice(0, 2).concat([position.x, position.y]);
  }
  render() {
    return (
      <KonvaLine
        key={this.id}
        points={this.points}
        stroke={this.color}
        strokeWidth={this.strokeWidth}
        tension={0}
        lineCap="round"
        lineJoin="round"
        dash={strokeTypeValues(this.strokeType, this.strokeWidth)}
        globalCompositeOperation="source-over"
      />
    );
  }
}
