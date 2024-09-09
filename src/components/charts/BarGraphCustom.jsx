import { Bar } from "react-chartjs-2";

import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend
} from "chart.js"

ChartJS.register(BarElement,
	CategoryScale,
	LinearScale,
	Tooltip,
	Legend)



const BarGraphCustom = ({dataObj}) => {
	const data = {
		labels: ["mon", "Tue", "Wed"],
		datasets: [
			{
				label: "",
				data: [100,200,300],
				backgroundColor: "#0094ff"
			}
		]
	}

	const options = {
		indexAxis: "y",
		scales: {
			x: {
				ticks: {
					color: "#ffffff" // Change x-axis label color (red in this case)
				}
			},
			y: {
				ticks: {
					color: "#ffffff" // Change y-axis label color (green in this case)
				}
			}
		}
	}
	return ( 
		<div>
			<Bar data={dataObj} options={options}></Bar>
		</div>
	 );
}
 
export default BarGraphCustom;