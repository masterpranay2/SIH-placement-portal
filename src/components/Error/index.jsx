import { Link } from 'react-router-dom';
import Error401 from '../../assets/Error401.png';
import Error404 from '../../assets/Error404.png';
import Button from '../Button';
import styles from './style.module.scss';
const Error = ({ error }) => {
    const errors = {
        404: {
            titleHighlight: 'Page ',
            title: 'Not Found',
            message: 'The page you are looking for is either missing or doesn’t exist. Don’t worry, go to home page.',
            image: Error404,
        },
        401: {
            titleHighlight: 'Un',
            title: 'authorized',
            message: 'You are not authorized to access this page. If you think this is an error, please contact administrator.',
            image: Error401,
        }
    }
  return (
    <div className={styles.error}>
        <div className={styles.errorIllustration}>
            <img src={errors[error].image} alt="error" />
        </div>
        <div className={styles.errorDetails}>
            <h2><span>{errors[error].titleHighlight}</span>{errors[error].title}</h2>
            <p>{errors[error].message}</p>
            <Button
            text={<Link to="/">Go to Home Page</Link>}
            normal
            invertOnHover
            />
        </div>
    </div>
  );
}

export default Error;