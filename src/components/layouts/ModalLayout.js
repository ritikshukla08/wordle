import React from "react";
import classes from "../Modals/Stats.module.css";

const ModalLayout = (props) => {
  return (
    <>
      <div onClick={props?.close} className={classes.overlay}></div>
      <div className={classes.modal}>
        <div className={classes.insideModal}>
          <span className={classes.close} onClick={props?.close}>
            x
          </span>
          {props.children}
        </div>
      </div>
    </>
  );
};

export default ModalLayout;
