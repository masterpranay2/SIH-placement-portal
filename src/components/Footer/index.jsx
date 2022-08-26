import copyright from '../../assets/copyright.png';
import styles from './style.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <img src={copyright} alt="copyright"/>
      <p>2022 AICTE All Rights Reserved</p>
    </footer>
  )
}

export default Footer;