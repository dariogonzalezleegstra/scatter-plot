import React from 'react';

class RenderCircles extends React.Component {
    render() {
      let renderCircles = this.props.dataSet.map((coords, i) => (
        <circle
          cx={this.props.scale.X(coords[0])}
          cy={this.props.scale.Y(coords[1])}
          r="8"
          style={{ fill: this.props.COLORS[this.props.index] }}
          key={i}
        />
      ))
      return <g>{renderCircles}</g>
    }
}

export default RenderCircles;