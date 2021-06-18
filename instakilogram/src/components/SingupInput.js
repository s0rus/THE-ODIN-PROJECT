/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */

const SignupInput = ({ value, label, nameValue, handleValue, type }) => (
  <div>
    <label htmlFor={`signup--${nameValue}`} className='signup--label'>
      <span
        className={
          value ? 'signup--label--content--moved' : 'signup--label--content'
        }
      >
        {label}
      </span>
      <input
        name={`signup--${nameValue}`}
        id={`signup--${nameValue}`}
        type={type || 'text'}
        className={value ? 'signup--input--moved' : 'signup--input'}
        value={value}
        onChange={handleValue}
      />
    </label>
  </div>
);

export default SignupInput;
