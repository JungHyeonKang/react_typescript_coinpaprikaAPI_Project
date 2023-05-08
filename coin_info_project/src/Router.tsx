import path from "path";
import {createBrowserRouter} from "react-router-dom"
import App from "./App";
import Coins from "./components/Coins";
import Coin from "./components/Coin";
import Price from "./components/Price";
import Chart from "./components/Chart";

const route = createBrowserRouter([
    {
        path:"/",
        element:<App />,
        children:[
            {
                path:"",
                element:<Coins />
            },
            {
                path:`/:coinId`,
                element:<Coin />,
                children:[
                   {
                    path:"chart",
                    element:<Chart />
                   },
                   {
                    path:"price",
                    element:<Price />
                   }
                ]
            },
        ]
    }
]);

export default route;