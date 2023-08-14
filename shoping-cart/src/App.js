
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import Home from './components/home';
import Cart from './components/cart';
import Login from './components/Login';
import Signup from './components/signup';
import store from './store/store';
import Navbar from './components/navbar';
function App() {
  return (
    <div>
    
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/cart' element={<Cart/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/signup' element={<Signup/>}></Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
