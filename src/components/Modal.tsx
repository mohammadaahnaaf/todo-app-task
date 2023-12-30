// Modal.js
import { useState } from 'react';
type Props = {
    isOpen: boolean
    onClose: any
    children: any
}

export const Modal = (props: Props) => {
    const closeModal = () => {
        props.onClose();
    };

    return (
        <div
            className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center transition-opacity ${props.isOpen ? 'visible opacity-100' : 'invisible opacity-0'
                }`}
        >
            <div className="bg-white p-4 rounded shadow-lg max-w-4xl w-full mx-auto">
                <button className="absolute w-full h-full top-2 right-2" onClick={closeModal}>
                    &times;
                </button>
                {props.children}
            </div>
        </div>
    );
};