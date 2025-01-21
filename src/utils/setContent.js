import Spinner from '../components/spinner/Spinner';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import Skeleton from '../components/skeleton/Skeleton';

const setContent = (process, Component, props, newItemLoading) => {
  switch (process) {
      case 'waiting':
          return <Skeleton />
      case 'loading':
          return newItemLoading ? <Component {...props} /> :  <Spinner />
      case 'confirmed':
          return <Component {...props} />
      case 'error':
          return <ErrorMessage />
      default:
          throw new Error('Unexpected process state')
  }
}

export default setContent;