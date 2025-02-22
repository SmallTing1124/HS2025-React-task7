import { useEffect } from 'react';
import { useNavigate } from 'react-router';

export default function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }, []);
  return (
    <>
      <section className="w-100 vh-100 d-flex justify-content-center align-items-center ">
        <div className="text-center">
          <h1
            style={{
              fontSize: '100px',
            }}
          >
            <i className="bi bi-emoji-frown"></i> <br />
            404
          </h1>
          <h3>此頁面不存在</h3>
        </div>
      </section>
    </>
  );
}
