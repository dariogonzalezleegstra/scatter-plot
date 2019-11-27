import React, {Fragment} from 'react';

const Buttons = ({dataSets, plotOrRemoveDataSet}) => <Fragment>
    <div>
        Choose the DataSet that you want to plot/remove
    </div>
    <div>
        {dataSets && dataSets.map((dataSet, i) => <button key={i} onClick={() => plotOrRemoveDataSet(i)}>
            DataSet {i}
        </button>)}
    </div>
</Fragment>

export default Buttons;