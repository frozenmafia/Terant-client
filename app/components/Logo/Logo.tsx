import React from 'react';
import styles from './Logo.module.css'; // Corrected import path

const Logo = () => {
  return (
    <div className={`${styles.logoContainer} flex items-center space-x-2`}>
      <svg
        xmlns="log.webp"
        viewBox="0 0 64 64"
        width="40px"
        height="40px"
        className={`${styles.logoIcon} fill-current text-white`}
      >
        <path fill="#ecf0f1" d="M32 2L2 32h10v30h16V42h8v20h16V32h10z" />
      </svg>
      <span className={`${styles.logoText} text-2xl font-bold text-white`}>Terant</span>
    </div>
  );
};

export default Logo;
