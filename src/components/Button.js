const Button = ({ type, text, handleNewChange }) => {
    return (
      <button type={type} onClick={handleNewChange} >{text}</button>
    )
  };

export default Button;
