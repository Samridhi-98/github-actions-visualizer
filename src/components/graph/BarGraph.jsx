import './Graph.css';
import { Bar } from "react-chartjs-2";

function BarGraph() {
    const barChartData = {
        labels: ["October", "November", "December"],
        datasets: [
            {
                data: [8137119, 9431691, 10266674],
                label: "Infected People",
                borderColor: "#3333ff",
                backgroundColor: "#D8A937",
                fill: true
            },
            {
                data: [1216410, 1371390, 1477380],
                label: "Deaths People",
                borderColor: "#ff3333",
                backgroundColor: "#DE4557",
                fill: true
            }
        ]
    };

    const barChart = (
        <Bar
            type="bar"
            height={100}
            options={{
                title: {
                    display: true,
                    text: "COVID-19 Cases of Last 3 Months",
                    fontSize: 15
                },
                legend: {
                    display: true,
                    position: "top"
                }
            }}
            className='bar-graph'
            data={barChartData}
        />
    );
    return barChart;
};

export default BarGraph;