import Bar from "./Bar";
import './Diagram.css';

const Diagram = (props) => {
    const maxMonthCost = Math.max(...props.dataSet.map(dataSet => dataSet.value));

    return (
        <div className="diagram">
            {props.dataSet.map((dataSet, index) => (
                <div key={dataSet.label} className="diagram-bar-container">
                    <Bar
                        key={dataSet.label}
                        value={dataSet.value}
                        maxValue={maxMonthCost}
                        label={dataSet.label}
                    />
                    <div className="bar-cost">${dataSet.value}</div>
                </div>
            ))}
        </div>
    );
};

export default Diagram;