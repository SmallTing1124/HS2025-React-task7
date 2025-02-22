import { useEffect, useState } from 'react';
import ScreenLoading from '../../components/ScreenLoading';

import axios from 'axios';
const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

import { Link, useParams } from 'react-router';

export default function ProductDetail() {
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const { id: product_id } = params;

  const [product, setProduct] = useState({});
  const [qtySelect, setQtySelect] = useState(1);
  useEffect(() => {
    //取得商品資訊
    setIsScreenLoading(true);
    (async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/${API_PATH}/product/${product_id}`
        );
        setProduct(response.data.product);
      } catch (error) {
        console.log(error);
      } finally {
        setIsScreenLoading(false);
      }
    })();
  }, []);

  const handleAddToCart = async (product_id, qtySelect) => {
    setIsLoading(true);
    try {
      await axios.post(`${BASE_URL}/api/${API_PATH}/cart`, {
        data: {
          product_id,
          qty: Number(qtySelect),
        },
      });
      alert(`已加入購物車`);
      setQtySelect(1);
    } catch (error) {
      console.error(error); // 紀錄完整錯誤訊息
      alert(`加入購物車失敗`);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <section className="pt-5 mb-4">
        <div className="container">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to={`/`}>Home</Link>
              </li>
              <li className="breadcrumb-item">
                <Link to={`/products`}>商品列表</Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                {product.title}
              </li>
            </ol>
          </nav>
          <div className="row">
            <div className="col-lg-6">
              <img src={product.imageUrl} width="100%" />
            </div>
            <div className="col-lg-6 d-flex flex-column ">
              <div className="text">
                <p className="m-0">{product.category}</p>
                <h2>{product.title}</h2>
                <p>{product.content}</p>
              </div>
              <div className="mt-auto">
                <del className="h6">原價 {product.origin_price}元</del>
                <div className="h5">特價 {product.price}元</div>
                <div className="input-group align-items-center ">
                  <label htmlFor="qtySelect">數量：</label>
                  <select
                    value={qtySelect}
                    onChange={(event) => {
                      setQtySelect(event.target.value);
                    }}
                    id="qtySelect"
                    className="form-select"
                    style={{ width: '30%' }}
                  >
                    {Array.from({ length: 10 }).map((_, index) => (
                      <option key={index} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-end">
                  <button
                    disabled={isLoading}
                    type="button"
                    className="btn btn-primary w-100 mt-3"
                    onClick={() => {
                      handleAddToCart(product.id, qtySelect);
                    }}
                  >
                    {isLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          aria-hidden="true"
                        ></span>
                        <span role="status">Loading...</span>
                      </>
                    ) : (
                      '加入購物車'
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="col-12">
              <div className="py-5">
                <hr />
              </div>
              <h2 className="text-center">{product.title}</h2>
              <p className="text-center">{product.description}</p>
              <div className="row">
                {product?.imagesUrl?.map((image) => (
                  <div className="col" key={image}>
                    <img
                      src={image}
                      alt={product.title}
                      className="w-100 py-2"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <ScreenLoading isScreenLoading={isScreenLoading} />
    </>
  );
}
