import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistroy } from "../api";
import ApexCharts from "react-apexcharts";


interface ChartProps{
    coinId : string,  
}
interface IHistorycalData{
    time_open: string;
time_close: string
open: number
high: number
low: number
close: number
volume: number
market_cap:number
}

function Chart(){
    const {coinId}=useOutletContext<ChartProps>()
    const {isLoading,data} = useQuery<IHistorycalData[]>(["coinHistory",coinId],()=>fetchCoinHistroy(coinId))
    
    
    return <div>{isLoading ? "Loading chart":<ApexCharts type="line"
     series={[
        {        
            name : "Price",  
            data : data?.map(price => price.close) ?? [],
        }       
    ]}
     options={{
        chart : 
        {
            height:500,
            width : 500,
            toolbar:{
                show:false
            },
            background:"transparent"
        },
        grid:{show:false},
        theme:{
            mode :  "dark" || 'light' 
        },
        stroke:{
            curve : "smooth",
            width : 5
        },
        yaxis:{
            show:false,
        },
        xaxis:{
            axisTicks:{show:false},
            labels:{show:false},
            type:"datetime",
            categories:data?.map(date=>date.time_close) ?? []
        },
        fill:{
            type:"gradient",gradient:{
            gradientToColors:["blue"]
        }},
        colors:["red"],
        tooltip:{
            y:{
                formatter:(value=>`$ ${value.toFixed(3)}`)
            }
        }
    }} />}</div>
 
}
export default Chart;