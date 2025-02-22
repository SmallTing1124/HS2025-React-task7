import PropTypes from 'prop-types';

function ScreenLoading({ isScreenLoading }) {
  return (
    <>
      {isScreenLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(45, 44, 44, 0.3)',
            zIndex: 999,
          }}
        >
          <div className="spinner-grow" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </>
  );
}

ScreenLoading.propTypes = {
  isScreenLoading: PropTypes.bool,
};

export default ScreenLoading;
