import '../styles/Button.css';

const Button = ({ label, onClick }) => {
  return onClick ? (
    <div className='button--container' onClick={() => onClick()}>
      <span>{label}</span>
    </div>
  ) : (
    <div className='button--container'>
      <span>{label}</span>
    </div>
  );
};

export default Button;
