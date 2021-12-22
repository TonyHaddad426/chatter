import React from "react";
import Card from "./Card";
import classes from "./Modal.module.css";

// THIS COMPONENT IS NOT BEING USED
const Modal = (props) => {
  return (
    <div className={classes.openModal}> 
    <div className={classes.backdrop} onClick={"props.setError"}>
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>{props.children}</h2>
        </header>
        <div className={classes.content}>
          <p className={classes.h1}>{props.message}</p>
        </div>
        <footer className={classes.actions}>
          <button type="submit" onClick={"props.setError"}>Okay</button>
        </footer>
      </Card>
    </div>
    </div>
  );
};

export default Modal;
