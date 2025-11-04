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
import AdminLayout from "./components/Admin/AdminLayout"
import AdminHomePage from "./pages/AdminHomePage"
import UserManagementPage from "./pages/UserManagementPage"
import ProductManagement from "./components/Admin/ProductManagement"
import EditProductsPage from "./components/Admin/EditProductsPage"
import OrderManagement from "./components/Admin/OrderManagement"

import { Provider } from "react-redux"
import store from "./redux/store"
import ProtectedRoute from "./components/Common/ProtectedRoute"

function App() {
  return (
    <Provider store={store}>
    <BrowserRouter future={{ v7_startTransition: true , v7_relativeSplatPath  : true}}>
    <Toaster position="top-right" />
      <Routes>
      {/* User Routes */}
          <Route path="/" element={<UserLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/collections/:collection" element={<CollectionPage />} />
            <Route path="/product/:id" element={<ProductDetails />} /> 
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/checkout" element={<CheckOut />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage /> } />
            <Route path="/order/:id" element={<OrderDetailsPage /> } />
            <Route path="/my-orders" element={<MyOrdersPage /> } />
          </Route>
          {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute role="admin">

          <AdminLayout />
          </ProtectedRoute>

          }>
            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManagementPage/>} />
            <Route path="products" element={<ProductManagement/>} />
            <Route path="products/:id/edit" element={<EditProductsPage/>} />
            <Route path="orders" element={<OrderManagement/>} />
        </Route>
      </Routes>
    </BrowserRouter>
    </Provider>
  )
}

export default App
