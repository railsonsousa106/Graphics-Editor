import { Rect as KonvaRect } from "react-konva";
import { strokeTypeValues } from "../../constants";

export class Rect {
  constructor(info) {
    this.id = info.id;
    this.type = info.type;
    this.points = info.points;
    this.x = info.points[0];
    this.y = info.points[1];
    if (info.points[2] && info.points[3])
      this.modifyPoints({ x: info.points[2], y: info.points[3] });
    else {
      this.width = 0;
      this.height = 0;
    }
    this.color = info.color;
    this.fill = info.fill;
    this.strokeWidth = info.strokeWidth;
    this.strokeType = info.strokeType;
  }
  modifyPoints(position) {
    this.points = this.points.slice(0, 2).concat([position.x, position.y]);
    if (this.points[2] >= this.points[0]) {
      this.width = this.points[2] - this.points[0];
    } else {
      this.width = this.points[0] - this.points[2];
      this.x = this.points[2];
    }
    if (this.points[3] >= this.points[1]) {
      this.height = this.points[3] - this.points[1];
    } else {
      this.height = this.points[1] - this.points[3];
      this.y = this.points[3];
    }
  }
  render() {
    return (
      <KonvaRect
        key={this.id}
        x={this.x}
        y={this.y}
        width={this.width}
        height={this.height}
        stroke={this.color}
        fill={this.fill}
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
