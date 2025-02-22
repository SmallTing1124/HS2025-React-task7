import { useEffect, useRef, useState } from 'react';
import { Modal } from 'bootstrap';
import axios from 'axios';
import { Link } from 'react-router';
import ScreenLoading from '../components/ScreenLoading';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

export default function Cart() {
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [cartData, setCartData] = useState({});
  // 取得購物車
  const getCart = async () => {
    setIsScreenLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/api/${API_PATH}/cart`);
      setCartData(response.data.data);
    } catch (error) {
      console.log(error);
      alert(`取得購物清單失敗`);
    }finally{
      setIsScreenLoading(false);
    }
  };
  useEffect(() => {
    getCart();
  }, []);

  // 確認清除購物車：Modal設定
  const clearCartModalRef = useRef(null);
  useEffect(() => {
    new Modal(clearCartModalRef.current);
  }, []);
  const openClearCartModal = () => {
    const modalInstance = Modal.getInstance(clearCartModalRef.current);
    modalInstance.show();
  };
  const closeClearCartModal = () => {
    const modalInstance = Modal.getInstance(clearCartModalRef.current);
    modalInstance.hide();
  };

  const handleClearCart = () => {
    openClearCartModal();
  };
  const clearCart = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/${API_PATH}/carts`);
      closeClearCartModal();
      getCart();
    } catch (error) {
      console.log(error);
      alert(`清除購物車失敗！`);
    }
  };

  const handleRemoveItemCart = async (cart_id) => {
    try {
      await axios.delete(`${BASE_URL}/api/${API_PATH}/cart/${cart_id}`);
      getCart();
    } catch (error) {
      console.log(error.response.data.message);
      alert(`刪除商品失敗`);
    }
  };

  const handleIncreaseProductQty = async (product_id, qty) => {
    try {
      await axios.put(`${BASE_URL}/api/${API_PATH}/cart/${product_id}`, {
        data: {
          product_id,
          qty,
        },
      });
      getCart();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {/* 購物車清單 */}
      <div className="container">
        <h3 className="text-center mt-5 mb-2">購物車清單</h3>
        {cartData.carts?.length === 0 ? (
          <div className="text-center">
            <p>目前購物車中沒有商品，趕快加入一些吧！</p>
            <Link to={`/products`}>返回商品列表</Link>
          </div>
        ) : (
          <>
            <div className="text-end mb-4">
              <button
                type="button"
                className="btn btn-outline-danger"
                onClick={handleClearCart}
              >
                清空購物車
              </button>
            </div>

            <div className="table-responsive">
              <table className="table align-middle">
                <thead>
                  <tr>
                    <th style={{ width: '30px' }}></th>
                    <th>品名</th>
                    <th style={{ width: '150px' }} className="text-center">
                      數量/單位
                    </th>
                    <th className="text-end">單價</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.carts?.map((cart) => {
                    return (
                      <tr key={cart.id}>
                        <td>
                          <button
                            type="button"
                            className="btn btn-outline-danger"
                            onClick={() => {
                              handleRemoveItemCart(cart.id);
                            }}
                          >
                            <i className="bi bi-x-lg"></i>
                          </button>
                        </td>
                        <td>{cart.product.title}</td>
                        <td style={{ width: '150px' }} className="text-center">
                          <div className="btn-group">
                            <button
                              type="button"
                              className="btn btn-outline-dark"
                              disabled={cart.qty === 1}
                              onClick={() => {
                                handleIncreaseProductQty(cart.id, cart.qty - 1);
                              }}
                            >
                              -
                            </button>
                            <span
                              className="btn btn-outline-dark"
                              style={{ width: '40px', pointerEvents: 'none' }}
                            >
                              {cart.qty}
                            </span>
                            <button
                              type="button"
                              className="btn btn-outline-dark"
                              onClick={() => {
                                handleIncreaseProductQty(cart.id, cart.qty + 1);
                              }}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="text-end">{cart.final_total}</td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="3" className="text-end">
                      總計：
                    </td>
                    <td className="text-end" style={{ width: '130px' }}>
                      {cartData.final_total}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="text-end">
              <Link className="btn btn-danger px-5" to={`/order`}>
                結帳
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Modal 清除購物車確認 */}
      <div
        ref={clearCartModalRef}
        className="modal fade"
        id="clearCartModal"
        tabIndex="-1"
        aria-labelledby="clearCartModalLabel"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title fs-5" id="clearCartModalLabel">
                確定要清空購物車嗎？
              </h2>
              <button
                type="button"
                className="btn-close"
                onClick={closeClearCartModal}
              ></button>
            </div>
            <div className="modal-body">刪除後無法復原，請確認是否繼續。</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-danger"
                onClick={clearCart}
              >
                清除購物車
              </button>
            </div>
          </div>
        </div>
      </div>
      <ScreenLoading isScreenLoading={isScreenLoading} />
    </>
  );
}
