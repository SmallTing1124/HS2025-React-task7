import axios from 'axios';
import { Outlet, NavLink, Link, useNavigate } from 'react-router';
const BASE_URL = import.meta.env.VITE_BASE_URL;

const routes = [
  // { path: '/admin/', name: 'Dashboard' },
  { path: '/admin/products', name: '產品管理' },
  { path: '/admin/orders', name: '訂單管理' },
];
export default function AdminLayout() {
  const navigate = useNavigate();
  const handelLogout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-sm bg-body-tertiary">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarText"
              aria-controls="navbarText"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarText">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                {routes.map((route) => {
                  return (
                    <li key={route.path} className="nav-item">
                      <NavLink
                        className="nav-link"
                        aria-current="page"
                        to={route.path}
                      >
                        {route.name}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
              <Link to={`/`} className="btn btn-outline-dark me-2">
                前往前台首頁
              </Link>
              <button
                type="button"
                className="btn btn-dark"
                onClick={handelLogout}
              >
                登出
              </button>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Outlet></Outlet>
      </main>
      <footer></footer>
    </>
  );
}
