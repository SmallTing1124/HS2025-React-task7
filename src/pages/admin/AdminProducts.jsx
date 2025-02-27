import axios from 'axios';
import { useEffect, useState } from 'react';

import ProductList from '../admin/components/ProductList';
import Pagination from '../admin/components/Pagination';
import ProductModal from '../admin/components/ProductModal';
import DelProductModal from '../admin/components/DelProductModal';
import { useNavigate } from 'react-router';
import ScreenLoading from '../../components/ScreenLoading';
import { useDispatch } from 'react-redux';
import { pushMessage } from '../../redux/toastSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

const defaultModalState = {
  imageUrl: '',
  imagesUrl: [''],
  title: '',
  category: '',
  unit: '',
  origin_price: '',
  price: '',
  description: '',
  content: '',
  is_enabled: 0,
  num: 0,
};

export default function Products() {
  const dispatch = useDispatch();
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // 儲存產品資料
  const [pageInfo, setPageInfo] = useState({}); // 儲存頁籤資料

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
        getProducts();
      } catch (error) {
        alert(error.response.data.message);
        navigate('/login');
      } finally {
        setIsScreenLoading(false);
      }
    })();
  }, []);

  // 取得產品資料+頁籤資料
  const getProducts = async (page) => {
    try {
      const productsRes = await axios.get(
        `${BASE_URL}/api/${API_PATH}/admin/products?page=${page}`
      );
      const { products, pagination } = productsRes.data;
      setProducts(products);
      setPageInfo(pagination);
    } catch (error) {
      const { message } = error.response.data;
      dispatch(
        pushMessage({
          text: message,
          status: 'failed',
        })
      );
    } finally {
      setIsScreenLoading(false);
    }
  };

  // 儲存 單一商品資訊 (Modal產品詳情頁)
  const [tempProduct, setTempProduct] = useState(defaultModalState);
  //儲存 Mode按下的 [新增 / 編輯 ] 按鈕
  const [modalMode, setModalMode] = useState(null);
  //Modal開啟狀態：產品詳情頁
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  // 開啟 Modal：產品詳情頁
  const handleOpenProductModal = (mode, product) => {
    setModalMode(mode);
    switch (mode) {
      case 'create':
        setTempProduct(defaultModalState);
        break;
      case 'edit':
        setTempProduct(product);
        break;
      default:
        break;
    }
    setIsProductModalOpen(true);
  };

  //綁定DOM：刪除確認頁
  const [isDelProductModalOpen, setIsDelProductModalOpen] = useState(false);
  // 刪除商品：取<API></API>
  const deleteProduct = async () => {
    try {
      await axios.delete(
        `${BASE_URL}/api/${API_PATH}/admin/product/${tempProduct.id}`
      );
      dispatch(
        pushMessage({
          text: `已刪除商品`,
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
    }
  };
  return (
    <>
      <div className="container">
        <div className="row mt-2 mb-5 justify-content-center">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-end mb-4">
              <h2 className="mt-5">管理產品</h2>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  handleOpenProductModal('create');
                }}
              >
                建立新的產品
              </button>
            </div>
            <ProductList
              products={products}
              setTempProduct={setTempProduct}
              setIsDelOpen={setIsDelProductModalOpen}
              handleOpenProductModal={handleOpenProductModal}
            />
            <Pagination getProducts={getProducts} pageInfo={pageInfo} />
          </div>
        </div>
      </div>
      <ProductModal
        getProducts={getProducts}
        modalMode={modalMode}
        tempProduct={tempProduct}
        setTempProduct={setTempProduct}
        isOpen={isProductModalOpen}
        setIsOpen={setIsProductModalOpen}
      />
      <DelProductModal
        getProducts={getProducts}
        deleteProduct={deleteProduct}
        tempProduct={tempProduct}
        isOpen={isDelProductModalOpen}
        setIsOpen={setIsDelProductModalOpen}
      />
      <ScreenLoading isScreenLoading={isScreenLoading} />
    </>
  );
}
