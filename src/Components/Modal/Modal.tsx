import React, { ReactNode } from "react";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="modal-overlay ">
          <div className="modal-content ">
            <button className="modal-close" onClick={onClose}>
              Close
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
