import { BrowserRouter, Route, Routes } from "react-router-dom"
import UserLayout from "./components/Layout/UserLayout"
import HomePage from "./pages/HomePage"
import { Toaster } from "sonner"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import ProfilePage from "./pages/ProfilePage"
import CollectionPage from "./pages/CollectionPage"
import ProductDetails from "./components/Products/ProductDetails"
import CheckOut from "./components/Cart/CheckOut"
import OrderConfirmationPage from "./pages/OrderConfirmationPage"
import OrderDetailsPage from "./pages/OrderDetailsPage"
import MyOrdersPage from "./pages/MyOrdersPage"
function App() {
  return (
    <BrowserRouter future={{ v7_startTransition: true , v7_relativeSplatPath  : true}}>
    <Toaster position="top-right" />
      <Routes>
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/collections/:collection" element={<CollectionPage />} />
            <Route path="/product/:id" element={<ProductDetails />} /> 
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage /> } />
            <Route path="/order/:id" element={<OrderDetailsPage /> } />
            <Route path="/my-orders" element={<MyOrdersPage /> } />
          </Route>
        <Route>{/* Admin Routes */}</Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
