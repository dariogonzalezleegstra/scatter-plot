import React, {Fragment} from 'react';
import axios from 'axios';

import ScatterPlot from './ScatterPlot/ScatterPlot';

const DATASETS_QUANTITY = 3;

class Landing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataSets: [[]]
        }
    }

    componentDidMount() {
        this.getDataSets(DATASETS_QUANTITY);
    }

    getDataSets = async (quantity) => {
        const dataSets = await axios.get(`/api/generateDataSet/${DATASETS_QUANTITY}`);
        this.setState({dataSets: dataSets.data});
    }

    render() {
        const {dataSets} = this.state;
        return (
            <Fragment>
                <ScatterPlot dataSets={dataSets}/>
            </Fragment>
        );
    }
}

export default Landing;