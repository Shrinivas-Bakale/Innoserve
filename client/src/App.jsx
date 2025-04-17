import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import './App.css'
import Layout from './Components/Layout'
import Login from './pages/Onboarding/Login'
import Signup from './pages/Onboarding/Signup'
import Example from './pages/firebase/Example';
import UserAuthentication from './pages/firebase/UserAuthentication'
import ServicePage from './pages/ServicePage/ServicePage'
import CategoryPage from './pages/ServicePage/CategoryPage'
import PersistLogin from './Auth/PersistLogin'
import Category from './pages/ServicePage/Category'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import PaymentSummary from './pages/PaymentSummary'
import AddServices from './pages/AddServices'
import DiwaliLights from './pages/ServicePage/DiwaliLights'
import HomePainiting from './pages/ServicePage/HomePainiting'
import WallPanels from './pages/ServicePage/WallPanels'
import WaterPurifier from './pages/ServicePage/WaterPurifier'
import SmartLock from './pages/ServicePage/SmartLock'
import SpaAyurveda from './pages/ServicePage/SpaAyurveda'
import HairStudio from './pages/ServicePage/HairStudio'
import ACRepair from './pages/ServicePage/ACRepair'
import AboutUs from './pages/AboutUs';
import OrdersPage from './pages/OrdersPage'
import ProtectedRoute from './pages/ProtectedRoute';




function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='userauthentication' element={<UserAuthentication />} /> */}
        <Route path='example' element={<Example />} />
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
        <Route path="/" element={<Layout />} >
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/service" element={<ServicePage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route exact path="/category" element={<CategoryPage />} />
          <Route exact path="/category1" element={<Category />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/payment" element={<PaymentSummary />} /> <Route
            exact
            path="/addservices"
            element={<ProtectedRoute element={AddServices} />}
          />
          <Route exact path="/homepainting" element={<HomePainiting />} />
          <Route exact path="/diwalilights" element={<DiwaliLights />} />
          <Route exact path="/wallpanels" element={<WallPanels />} />
          <Route exact path="/waterpurifier" element={<WaterPurifier />} />
          <Route exact path="/smartlock" element={<SmartLock />} />
          <Route exact path="/spaayurveda" element={<SpaAyurveda />} />
          <Route exact path="/hairstudio" element={<HairStudio />} />
          <Route exact path="/acrepair" element={<ACRepair />} />
          <Route exact path="/orders" element={<OrdersPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
