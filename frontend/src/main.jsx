import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import {
    Route,
    RouterProvider,
    createRoutesFromElements,
} from 'react-router';
import { createBrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js'

import PrivateRoutes from './components/PrivateRoutes.jsx'

import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';

import Profile from './pages/Users/Profile.jsx';
import Home from './pages/Home.jsx';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App />}>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>

            <Route path='' element={<PrivateRoutes />} >
                <Route path='/profile' element={<Profile />}/>   
            </Route>
        </Route>
    )
);

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
