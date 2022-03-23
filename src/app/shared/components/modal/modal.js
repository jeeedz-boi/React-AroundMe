import { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "../button/button";
import './style.css'

export const CustomModal = (props) => {
    const { ModalBodyRender, isShow, onHide } = props;
  
    return (
      <>
        <Modal
          show={isShow}
          onHide={onHide}
          className='custom-modal'
          centered
        >
          <Modal.Body>
            { ModalBodyRender() }
          </Modal.Body>
        </Modal>
      </>
    );
}