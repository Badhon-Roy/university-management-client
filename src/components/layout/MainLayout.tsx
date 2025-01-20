
import { Button, Layout} from 'antd';
import {  Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAppDispatch } from '../../redux/hook';
import { logOut } from '../../redux/features/auth/authSlice';
import { toast } from 'sonner';
const { Header, Content } = Layout;

// const items : MenuProps["items"] = [
//   {
//     key : "Dashboard",
//     label : <NavLink to="/admin/dashboard">Dashboard</NavLink>
//   },
//   {
//     key : "User Management",
//     label : "User Management",
//     children : [
//       {
//         key : "Create Admin",
//         label : <NavLink to="/admin/create-admin">Create Admin</NavLink>
//       },
//       {
//         key : "Create Faculty",
//         label : <NavLink to="/admin/create-Faculty">Create Faculty</NavLink>
//       },
//       {
//         key : "Create Student",
//         label : <NavLink to="/admin/create-student">Create Student</NavLink>
//       },
//     ]
//   }
// ]
  

const MainLayout = () => {
  const dispatch = useAppDispatch()
  const handleLogout = ()=>{
    try {
      dispatch(logOut())
      toast.success('Logout Successfully' , {duration : 2000})
    } catch (err) {
      console.log(err);
      toast.error('Something went wrong' , {duration : 2000})
    }
  }
    return (
        <Layout style={{height : "100vh"}}>
          <Sidebar/>
        <Layout>
          <Header >
            <Button onClick={handleLogout}>Logout</Button>
          </Header>
          <Content style={{ margin: '24px 16px 0' }}>
            <div
              style={{
                padding: 24,
                minHeight: 360
              }}
            >
              <Outlet/>
            </div>
          </Content>
        </Layout>
      </Layout>
  
    );
};

export default MainLayout;