import styles from '@/styles/modules/Charts.module.scss';
import { Line, Bar } from "react-chartjs-2";

export const ViewChart = ({ chartData }: any) => {

    const values = Object.values(chartData)
    const labels = Object.keys(chartData)

    const data = {
        labels: labels,
        datasets: [
            {
                data: values,
                fill: true,
                backgroundColor: '#104EAA10',
                borderColor: '#104EAA',
            }
        ],
        borderWidth: 1,
    }
    const options = {
        responsive: true,
        aspectRatio: 6/2,
        layout: {
            padding: 15
        },
        plugins: {
            title: {
              display: true,
              text: "Profile views",
              color: "#0085FF",
            },
            legend: {
              display: false,
           },
        },
        scales: {
          y : {
              title: {
                  display: true,
                  text: "Views",
                  color: "#0085FF"
              },
              ticks: {
                  color: "#FFFFFF",
              },
              grid: {
                  color: "#282E4290"
              },
          },
          x: {
            title: {
                display: true,
                text: "Dates",
                color: "#0085FF"
            },
              ticks: {
                  color: "#FFFFFF"
              },
              grid: {
                color: "#282E4290"
            },
          }
    }}

    return (
        <div className={styles.viewchart}>
        <Line
          data={data}
          options={options}
        />
      </div>
    )
}

/*
// backgrounds
$bg: #0a0d16;
$secondarybg: #0F121D;
$navbarbg: #11151f;
$hoverbg: #1D2530;

$orange: #CC6B25;
$primaryblue: #0085FF;
$secondaryblue: #104EAA;

*/
