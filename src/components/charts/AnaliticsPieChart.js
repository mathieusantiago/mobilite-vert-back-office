import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const AnaliticsPieChart = (props) =>{
const data = {
    labels: props?.anayticsBrowser?.map((e)=>{return e[0]}),
    datasets: [
        {
            label: '# of Votes',
            data: props?.anayticsBrowser?.map((e)=>{return e[1]}),
            backgroundColor: [
                '#de425b',
                '#f78555',
                '#ffc469',
                '#ffff9d',
                '#c9ffa4',
                '#88ffbc',
                '#00fadd',
            
            ],
            borderColor: [
                'rgb(#212529)',

            ],
            borderWidth: 1,
        },
    ],
    };
    return (
        <Pie data={data} />
    )
}
export default AnaliticsPieChart