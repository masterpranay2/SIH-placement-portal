import { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from './style.module.scss';

import passwordVisibleIcon from '../../assets/eye-filled.svg';
import passwordInvisibleIcon from '../../assets/eye-invisible.svg';
import dropdownOpenIcon from '../../assets/dropdown-open.svg';
import dropdownCloseIcon from '../../assets/dropdown-close.svg';
import upload from '../../assets/upload.svg';

const Input = ({ label, placeholder, err, type, options, onOptionClick, addScroll, required , aadhar}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const input = useRef(null);
  useEffect(() => {

    if(type !== 'date')
    if (type === 'password' && !isPasswordVisible) {
      input.current.type = 'password';
    } else if (type === 'number') {
      input.current.type = 'number';
    } else {
      input.current.type = 'text';
    }
  }, [isPasswordVisible, type]);

  const handleDropdownOptionClick = (opt, e) => {
    input.current.value = e.target.innerText;
    setIsDropdownVisible(false);
    onOptionClick(opt);
  };

  return (
    <div className={styles.inputWrapper}>
      <label htmlFor={label}>{label.toUpperCase()[0] + label.slice('1')}</label>

      {type === 'date' ? (
        <div className={styles.inputField}>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            dateFormat="MM/yyyy"
            showMonthYearPicker
          />
        </div>
      ) : (
        <div
          className={`
        ${styles.inputField} 
        ${(type === 'dropdown' || type === 'upload') && styles.inputFieldDropdown}
        `}
          // click handler for dropdown
          onClick={() => {
            type === 'dropdown' && setIsDropdownVisible(!isDropdownVisible);
          }}
        >
          <input
            type={type === 'number' ? 'number' : 'text'}
            name={label}
            placeholder={placeholder}
            ref={input}
            disabled={type === 'dropdown' || type === 'upload'}
            required={required}
            onChange={(e) => {
              if(aadhar) {
                if(e.target.value.length > 12) {
                  e.target.value = e.target.value.slice(0, 12);
                }
              }
            }}
          />

          {/* Password Eye Icon and Click logic */}
          {type === 'password' && (
            <img
              src={
                isPasswordVisible ? passwordVisibleIcon : passwordInvisibleIcon
              }
              alt="show password"
              //  Click event on eye icon to show/hide password
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            />
          )}

          {/* Dropdown Icon */}
          {type === 'dropdown' && (
            <img
              src={isDropdownVisible ? dropdownOpenIcon : dropdownCloseIcon}
              alt="dropdown"
            />
          )}

          {/* Upload Icon */}
          {type === 'upload' && <img src={upload} alt="upload" />}
        </div>
      )}

      {/* Error Message */}
      {err && <p className={styles.error}>{err}</p>}

      {/* Dropdown Options */}
      {type === 'dropdown' && isDropdownVisible && (
        <div className={styles.dropdown}>
          <ul className={addScroll ? styles.addScroll : ''}>
            {options.map((option, index) => {
              return (
                <li
                  key={index}
                  onClick={(e) => handleDropdownOptionClick(option, e)}
                >
                  {option}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Input;
