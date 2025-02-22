import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export default function Login() {
  const navigate = useNavigate();
 const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const res = await axios.post(`${BASE_URL}/admin/signin`, data);
      const { token, expired, message } = res.data;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}; `;
      axios.defaults.headers.common['Authorization'] = token;
      alert(message);
      reset();
      navigate('/admin/products');
      setIsLoading(false)
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        <h1 className="mb-5">Cake後台管理</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
          <div className="form-floating mb-3">
            <input
              {...register('username', {
                required: 'Email欄位必填',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: '格式錯誤，請輸入有效的 Email',
                },
              })}
              type="email"
              className={`form-control ${errors.username && 'is-invalid'}`}
              id="username"
              placeholder="name@example.com"
              name="username"
              autoComplete="username"
            />
            <label htmlFor="username">Email address</label>
            {errors.username && (
              <div className="invalid-feedback">{errors.username?.message}</div>
            )}
          </div>
          <div className="form-floating mb-3">
            <input
              {...register('password', {
                required: '密碼欄位必填',
                pattern: {
                  value: /^(?=.*[a-z])(?=.*\d)[a-z\d]{8,}$/,
                  message: '密碼欄位格式錯誤',
                },
              })}
              type="password"
              className={`form-control ${errors.password && 'is-invalid'}`}
              id="password"
              placeholder="Password"
              name="password"
              autoComplete="current-password"
            />
            <label htmlFor="password">Password</label>
            {errors.password && (
              <div className="invalid-feedback">{errors.password?.message}</div>
            )}
            <small className="form-text">
              密碼需至少 8 碼，包含小寫字母與數字
            </small>
          </div>
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            登入
          </button>
        </form>
        <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
      </div>
    </>
  );
}
