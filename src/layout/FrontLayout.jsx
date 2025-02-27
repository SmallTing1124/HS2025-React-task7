import { Outlet, NavLink, Link } from 'react-router';
import Toast from '../components/Toast';

const routes = [
  { path: '/', name: '首頁' },
  { path: '/products', name: '產品列表' },
  { path: '/cart', name: '購物車' },
];

export default function FrontLayout() {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-md bg-body-tertiary">
          <div className="container-fluid">
            <div className="navbar-brand">CakeShopping</div>
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

              <Link to={`login`} className="btn btn-outline-dark">
                網站後台管理
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Outlet></Outlet>
        <Toast />
      </main>
      <footer></footer>
    </>
  );
}
