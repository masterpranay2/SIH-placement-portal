import styles from './style.module.scss';

const Button = ({notLink, type, text, outline, special, size, animate, onclick, stretch, normal, invertOnHover, unInvertOnHover}) => {
  return (
    <button className={
      `${styles.button}
       ${outline ? styles.button_outline : ''}
       ${special ? styles.button_special : ''}
       ${size === 'large' ? styles.button_large : ''}
       ${animate ? styles.button_animate : ''}
       ${stretch ? styles.button_stretch : ''}
       ${normal ? styles.button_normal : ''}
       ${invertOnHover ? styles.button_invertOnHover : ''}
       ${unInvertOnHover ? styles.button_unInvertOnHover : ''}
       ${notLink ? styles.button_notLink : ''}`
      } onClick={onclick} {...{type}}
    >
      <span className="button__text">{text}</span>
    </button>
  );
}

export default Button;