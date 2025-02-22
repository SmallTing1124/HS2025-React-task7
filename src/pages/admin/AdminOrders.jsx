import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import ScreenLoading from '../../components/ScreenLoading';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function AdminOrders() {
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  // const [pageInfo,setPageInfo] =useState({});

  useEffect(() => {
    setIsScreenLoading(true);
    // 從 Cookie 取得 hexToken (Token)
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    //將 Token 設定為 axios 的全域 Authorization 標頭
    axios.defaults.headers.common['Authorization'] = token;
    //執行 checkUserLogin() 檢查用戶是否登入
    // API 確認登入狀況
    (async () => {
      try {
        await axios.post(`${BASE_URL}/api/user/check`);
        getOrder();
      } catch (error) {
        alert(error.response.data.message);
        navigate('/login');
      }finally{
        setIsScreenLoading(false);
      }
    })();
  }, []);

  const getOrder = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/${API_PATH}/orders`);
      setOrders(res.data.orders);
      // setPageInfo(res.data.pagination)
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h1 className="text-center mt-5 mb-3">管理訂單</h1>
      <div className="conatiner">
        <div className="row justify-content-center">
          <div className="col-10">
            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th>訂單姓名</th>
                    <th>訂單內容</th>
                    <th>訂單狀態</th>
                    <th className="text-end">訂單金額</th>
                    <th className="text-end">訂單日期</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => {
                    return (
                      <tr key={order.id}>
                        <td>{order.user?.name}</td>
                        <td>
                          {Object.values(order.products).map((item) => {
                            return (
                              <div key={item.id}>
                                {item.product.title} x {item.qty} <br />
                              </div>
                            );
                          })}
                        </td>
                        <td>{order.is_paid ? `已付款` : `尚未付款`}</td>
                        <td className="text-end">${order.total}</td>
                        <td className="text-end">
                          {new Date(order.create_at * 1000).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <ScreenLoading isScreenLoading={isScreenLoading} />
    </>
  );
}
