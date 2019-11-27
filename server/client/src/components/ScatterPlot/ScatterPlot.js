import React, { Fragment } from "react"
import { scaleLinear, max, axisLeft, axisBottom } from "d3"
import Buttons from './Buttons';
import RenderCircles from './RenderCircles';
import TrendLine from './TrendLine';
import Axis from './Axis';

const COLORS = {
  0: "blue",
  1: "darkgreen",
  2: "red",
  3: "cyan",
  4: "orange",
  5: "gold",
  6: "purple",
  7: "grey",
  8: "black",
  9: "yellow",
  10: "green"
}


export default class ScatterPlot extends React.Component {
  constructor(props) {
    super(props);
    this.margin = { top: 20, right: 15, bottom: 60, left: 60 };
    this.state = {
      dataSet: [[]],
      dataSets: this.props.dataSets,
      lines: {}, //{index, data}
      width: 800 - this.margin.left - this.margin.right,
      height: 600 - this.margin.top - this.margin.bottom,
      axisSetted: false
    }

    this.plotOrRemoveDataSet = this.plotOrRemoveDataSet.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.dataSets !== prevProps.dataSets) {
      this.setState({dataSets: this.props.dataSets});
    }
  }

  plotOrRemoveDataSet(index) {
    const {lines, dataSets} = this.state;
    if (!lines[index]) {
      lines[index] = dataSets[index];
    } else {
      delete lines[index];
    }
    this.setState({dataSet: dataSets[index]});
  }

  getX(line) {
    const {width} = this.state;
    return scaleLinear()
    .domain([
      0,
      max(line, function(d) {
        return d[0]
      })
    ])
    .range([0, width])
  }

  getY(line) {
    const {height} = this.state;
    return scaleLinear()
      .domain([
        0,
        max(line, function(d) {
          return d[1]
        })
      ])
      .range([height, 0])
  }

  render() {
    const dataSets = this.props.dataSets
    const {lines, width, height} = this.state;


    return (
      <div>
        <h2> Scatter Plot </h2>
        <svg
          width={width + this.margin.right + this.margin.left}
          height={height + this.margin.top + this.margin.bottom}
          className="chart"
        >
          <g
            transform={"translate(" + this.margin.left + "," + this.margin.top + ")"}
            width={width}
            height={height}
            className="main"
          >
            
            {lines && Object.values(lines).map((line, i) => <Fragment key={i}>
                <RenderCircles dataSet={line} scale={{X: this.getX(line), Y: this.getY(line)}} index={i} COLORS={COLORS} />
                <TrendLine dataSet={line} scale={{X: this.getX(line), Y: this.getY(line)}} index={i} COLORS={COLORS}/>
                <Axis
                  axis="x"
                  transform={"translate(0," + height + ")"}
                  scale={axisBottom().scale(this.getX(dataSets[0]))}
                />
                <Axis
                  axis="y"
                  transform="translate(0,0)"
                  scale={axisLeft().scale(this.getY(dataSets[0]))}
                />
              </Fragment>
            )}
          </g>
        </svg>
        <hr/>
        <Buttons dataSets={dataSets} plotOrRemoveDataSet={this.plotOrRemoveDataSet} />
      </div>
    )
  }
}