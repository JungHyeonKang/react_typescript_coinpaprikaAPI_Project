import path from "path";
import {createBrowserRouter} from "react-router-dom"
import App from "./App";
import Coins from "./components/Coins";

const route = createBrowserRouter([
    {
        path:"/",
        element:<App />,
        children:[
            {
                path:"",
                element:<Coins />
            }
        ]
    }
]);

export default route;