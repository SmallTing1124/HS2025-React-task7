import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import ScreenLoading from '../../components/ScreenLoading';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { pushMessage } from '../../redux/toastSlice';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function ProductList() {
  const dispatch = useDispatch();

  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setIsScreenLoading(true);
    //取得商品資訊
    const getProducts = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/${API_PATH}/products`
        );
        setProducts(response.data.products);
      } catch (error) {
        alert(`取得商品失敗`);
        console.dir(error.response.data.message);
      } finally {
        setIsScreenLoading(false);
      }
    };
    getProducts();
  }, []);
  // 事件處理：加入購物車
  const handleAddToCart = async (product_id, qty) => {
    setIsLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/${API_PATH}/cart`, {
        data: {
          product_id,
          qty: Number(qty),
        },
      });
      const { message } = res.data;
      dispatch(
        pushMessage({
          text: message,
          status: 'success',
        })
      );
    } catch (error) {
      const { message } = error.response.data;
      dispatch(
        pushMessage({
          text: message,
          status: 'failed',
        })
      );
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="container">
        <div className="mt-5">
          <nav aria-label="breadcrumb ">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={`/`}>Home</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                商品列表
              </li>
            </ol>
          </nav>
        </div>
        <div className="table-responsive mt-2">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>圖片</th>
                <th>商品名稱</th>
                <th>價格</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                return (
                  <tr key={product.id}>
                    <td style={{ width: '200px' }}>
                      <img
                        className=" object-fit-cover border rounded"
                        height="100"
                        width="200"
                        src={product.imageUrl}
                      />
                    </td>
                    <td>{product.title}</td>
                    <td>
                      <del className="h6">原價 {product.origin_price}元</del>
                      <div className="h5">特價 {product.price}元</div>
                    </td>
                    <td className="text-end">
                      <Link
                        className="btn btn-outline-secondary me-2"
                        to={`/product/${product.id}`}
                      >
                        查看更多
                      </Link>
                      <button
                        type="button"
                        disabled={isLoading}
                        className="btn btn-outline-danger"
                        onClick={() => {
                          handleAddToCart(product.id, 1);
                        }}
                      >
                        加到購物車
                        {isLoading && (
                          <div
                            className="spinner-border spinner-border-sm"
                            role="status"
                          >
                            <span className="sr-only"></span>
                          </div>
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <ScreenLoading isScreenLoading={isScreenLoading} />
    </>
  );
}

export default ProductList;
