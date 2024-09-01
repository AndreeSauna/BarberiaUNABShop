// CRUD/client/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import  CartProvider  from "./context/CartContext";  // Importa CartProvider

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import CartPage from "./pages/CartPage";
import TasksPage from "./pages/TasksPage";
import TaskFormPage from "./pages/TaskFormPage";
import ProfilePage from "./pages/ProfilePage";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import AppointmentsPage from './pages/AppointmentsPage';
import AgendamientoPage from "./pages/AgendamientoPage";
import UsersPage from "./pages/UsersPage";
import EditUserPage from './pages/EditUserPage';
import UserFormPage from "./pages/UserFormPage";

import ProtectedRoute from "./ProtectedRoute";
import { TaskProvider } from "./context/TasksContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AgendamientoFormPage from "./pages/AgendamientoFormPage";
import { AgendamientoProvider } from "./context/AgendamientosContext";
import NosotrosPage from "./pages/NosotrosPage";
import { UserProvider } from "./context/UsersContext";

function App() {
  return (
    <AuthProvider>
      <CartProvider>  {/* Asegúrate de envolver tu aplicación con CartProvider */}
        <AgendamientoProvider>
        <TaskProvider>
          {/*<UserProvider>*/}
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <main className="flex-grow container mx-auto px-10">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/product" element={<ProductsPage />} />
                  <Route path="/appointments" element={<AppointmentsPage />} />
                  
                  {/* 
                  <Route path="/agendamientos" element={<AgendamientoPage />} />
                  */}
                  <Route path="/nosotros" element={<NosotrosPage />} />

                  <Route element={<ProtectedRoute />}>
                    <Route path="/tasks" element={<TasksPage />} />
                    <Route path="/add-task" element={<TaskFormPage />} />
                    <Route path="/tasks/:id" element={<TaskFormPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/appointments" element={<AppointmentsPage />} />
                    <Route path="/agendamientos" element={<AgendamientoPage />} />
                    <Route path="/add-agendamiento" element={<AgendamientoFormPage />} />
                    <Route path="/agendamientos/:id" element={<AgendamientoFormPage />} />
                    <Route path="/nosotros" element={<NosotrosPage />} />
                    {/* 
                    <Route path="/users" element={<UsersPage />} /> {/* Nueva ruta para usuarios */}
                    {/* 
                    <Route path="/users/:id" element={<UserFormPage />} /> {/* Ruta para editar usuario */}
                    
                  </Route>

                  <Route element={<ProtectedRoute allowedEmails={['admin@gmail.com']} />}>
                  <Route path="/users" element={<UsersPage />} /> {/* Ruta para usuarios */}
                  <Route path="/edit-user/:id" element={<EditUserPage />} /> {/* Ruta para editar usuario */}
                  </Route>

                </Routes>
              </main>
              <Footer />
            </div>
          </BrowserRouter>
          {/* </UserProvider>*/}
        </TaskProvider>
        </AgendamientoProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;