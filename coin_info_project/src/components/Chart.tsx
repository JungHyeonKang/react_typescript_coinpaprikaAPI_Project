import { useQuery } from "@tanstack/react-query";
import { useOutletContext } from "react-router-dom";
import { fetchCoinHistroy } from "../api";
import ApexCharts from "react-apexcharts";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";
import { useState } from "react";


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

const SmallButton = styled.button<{isActive : boolean}>`
  font-size: 14px;
  padding: 5px 10px;
  border: none;
  border-radius: 3px;
  background-color: #fff;
  color: #333;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  };
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
`;

const RedButton = styled(SmallButton)`
  background-color: #ff5555;
  color: #fff;
  &:hover {
    background-color: #ff8888;
  };
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
`;


function Chart(){
    const {coinId}=useOutletContext<ChartProps>()
    const {isLoading,data : historyData} = useQuery<IHistorycalData[]>(["coinHistory",coinId],()=>fetchCoinHistroy(coinId))
    const [isLine , setIsLine]=useState(true)
    const isDark=useRecoilValue(isDarkAtom)
    const changeChartModeToLine = () =>{setIsLine(true)}
    const changeChartModeToCandle = () =>{setIsLine(false)}

    return <div>
      <SmallButton onClick={changeChartModeToLine} isActive={isLine}>Line</SmallButton>
      <RedButton onClick={changeChartModeToCandle} isActive={!isLine}>Candlestick</RedButton>
    { isLoading ? "Chart Loading" 
    : isLine ?
    <ApexCharts type="line"
    series={[
       {        
           name : "Price",  
           data : historyData?.map(price => price.close) ?? [],
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
           mode :isDark? "dark" : 'light' 
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
           categories:historyData?.map(date=>date.time_close) ?? []
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
   }} />
     :<ApexCharts 
      type="candlestick"
      series={
        [{
        data : historyData?.map((price) => {
          return  {
              x : price.time_open,
              y : [price.open,price.close,price.high,price.low]
            }
        }) 
        }
      ] as any
    }
    
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
            categories:historyData?.map(date=>date.time_close) ?? []
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