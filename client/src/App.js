import './App.css';
import {Routes, Route} from 'react-router-dom';
import UserLogin from './components/LoginForm/UserLogin/UserLogin';
import AdminLogin from './components/LoginForm/AdminLogin/AdminLogin';
import Layout from './pages/Layout/Layout';
import Admin from './pages/Admin/Admin';
import { QueryClientProvider, QueryClient } from 'react-query';
import { Toaster } from 'react-hot-toast';
import RequireAuth from './pages/RequireAuth/RequireAuth';
import Unauthorized from './pages/Unauthorized/Unauthorized';
import DoctorLogin from './components/LoginForm/DoctorLogin/DoctorLogin';
import Home from './pages/PatientPage/Home';

const queryClient = new QueryClient();

const ROLES = {
  'admin': parseInt(process.env.REACT_APP_ADMIN_KEY),
  'user': parseInt(process.env.REACT_APP_USER_KEY),
} 

function App() {
  return (
    <div className='font-fontPoppins'>
      <QueryClientProvider client={queryClient}>
        <Toaster position='bottom-left'/>
        <Routes>
          <Route path="/" element={<Layout/>} >

            <Route path="/" element={<Home roleUser={ROLES?.user}/>}/>
            <Route path="/login" element={<UserLogin/>} />
            <Route path="/admin/login" element={<AdminLogin/>} />
            <Route path="/doctor/login" element={<DoctorLogin/>} />
            <Route path="/unauthorized" element={<Unauthorized/>} />


            <Route element={<RequireAuth allowedRoles={ROLES?.admin}/>}>
              <Route path="/admin/*" element={<Admin/>} />
            </Route>

          </Route>
        </Routes>
      </QueryClientProvider>
    </div>
  ); 
}

export default App;
