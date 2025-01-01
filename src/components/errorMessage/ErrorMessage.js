import errorImg from './error.gif'

const ErrorMessage = () => {
  return (
    <img src={errorImg}
         alt="Error!"
         style={{ display: 'block', width: 250, height: 250, objectFit: 'contain', margin: '0 auto' }}/>
  );
}

export default ErrorMessage;