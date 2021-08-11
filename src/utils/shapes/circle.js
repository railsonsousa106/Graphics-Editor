import { Ellipse as KonvaEllipse } from "react-konva";
import { strokeTypeValues } from "../../constants";

export class Circle {
  constructor(info) {
    this.id = info.id;
    this.type = info.type;
    this.x = info.points[0];
    this.y = info.points[1];
    this.points = info.points;
    if (info.points[2] && info.points[3])
      this.modifyPoints({ x: info.points[2], y: info.points[3] });
    else this.radius = 0;
    this.color = info.color;
    this.fill = info.fill;
    this.strokeWidth = info.strokeWidth;
    this.strokeType = info.strokeType;
  }
  modifyPoints(position) {
    this.points = this.points.slice(0, 2).concat([position.x, position.y]);
    this.x = (this.points[0] + this.points[2]) / 2;
    this.y = (this.points[1] + this.points[3]) / 2;
    this.radiusX = Math.abs(this.points[0] - this.x);
    this.radiusY = Math.abs(this.points[1] - this.y);
  }
  render() {
    return (
      <KonvaEllipse
        key={this.id}
        x={this.x}
        y={this.y}
        radiusX={this.radiusX}
        radiusY={this.radiusY}
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
