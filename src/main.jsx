import React from 'react'
import ReactDOM from 'react-dom/client'

import {
    createHashRouter,
    RouterProvider
} from "react-router-dom";

import GameSelect from './pages/GameSelect.jsx';
import AddGame from './pages/AddGame.jsx';
import MultiplyGame from './pages/MultiplyGame.jsx';

import "./main.css"

// yuck, cant use browserRouter with gh pages
const router = createHashRouter([
    {
        path: "/",
        element: <GameSelect />
    },
    {
        path: "/add",
        element: <AddGame />
    },
    {
        path: "/multiply",
        element: <MultiplyGame />
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
)
