import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import ScreenLoading from '../components/ScreenLoading';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function Home() {
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    setIsScreenLoading(true);
    (async () => {
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
    })();
  }, []);
  return (
    <>
      <div className="container">
        <div className="mt-5 mb-3">
        <h2>歡迎來到，首頁！</h2>
        </div>
        <div className="row row-cols-3 g-3">
          {products.map((product) => {
            return (
              <div className="col" key={product.id}>
                <div className="card">
                  <img
                    src={product.imageUrl}
                    className="card-img-top object-fit-cover"
                    height={`300px`}
                    alt={product.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.category}</p>
                    <div className="text-end">
                      <Link
                        to={`/product/${product.id}`}
                        className="card-link text-decoration-none"
                      >
                        查看更多{' '}
                        <i className="bi bi-arrow-right-circle-fill"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ScreenLoading isScreenLoading={isScreenLoading} />
    </>
  );
}
