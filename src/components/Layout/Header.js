import React from "react";
import headerImg from "../../assets/header.jpg"
import styles from "./Header.module.css"

const Header = props => {
  return (
    <React.Fragment>
      <header className={styles.header}>
        <h1>Sushi Delivery</h1>
        <button>Card</button>
      </header>
      <div className={styles["main-image"]}>
        <img src={headerImg} alt="Sushi Delivery"/>
      </div>
    </React.Fragment>
  )
}

export default Header;