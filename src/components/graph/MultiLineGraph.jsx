import './Graph.css';
import { Line } from "react-chartjs-2";

function MultiLineGraph() {
    const lineChartData = {
        labels: ["October", "November", "December"],
        datasets: [
            {
                data: [8137119, 9431691, 10266674],
                label: "Infected",
                borderColor: "#DE4557",
                fill: true,
                lineTension: 0.5
            },
            {
                data: [1216410, 1371390, 1477380],
                label: "Deaths",
                borderColor: "#ff3333",
                fill: true,
                lineTension: 0.5
            },
            {
                data: [1615610, 1235390, 1777380],
                label: "Deaths",
                borderColor: "#ff3333",
                fill: true,
                lineTension: 0.5
            },
            {
                data: [1519410, 1478390, 18361750],
                label: "Deaths",
                borderColor: "#ff3333",
                fill: true,
                lineTension: 0.5
            }
        ]
    };

    return (
        <Line
            type="line"
            width={160}
            height={60}
            options={{
                title: {
                    display: true,
                    text: "COVID-19 Cases of Last 6 Months",
                    fontSize: 20
                },
                legend: {
                    display: true,
                    position: "top"
                }
            }}
            className='line-graph'
            data={lineChartData}
        />
    );
};

export default MultiLineGraph;