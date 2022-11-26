import * as React from "react";


import "../../styles/modal.css";
import { FocusTrap } from "../common/FocusTrap";

export interface ModalAction {
    label: string;
    className?: string;
    onClick: () => void;
}

export interface ModalProps {
    title: string
    onCloseClick: () => void;
    actions?: ModalAction[]
}

export const Modal = (props: React.PropsWithChildren<ModalProps>) => {
    const { title, onCloseClick, actions, children } = props;
    return <div className="modal-container">
        <div className="modal-background" onClick={onCloseClick} />
            <div className="modal">
            <FocusTrap onEscape={onCloseClick}>
                <div className="modal-title-container">
                    <div className="modal-title">
                        { title }
                    </div>
                    <button title="Close" onClick={onCloseClick} tabIndex={0}>✕</button>
                </div>
                <div className="modal-content">
                    { children }
                </div>
                { actions?.length &&
                    <div className="modal-actions">
                        {actions.map(action => {
                            const { label, onClick, className } = action;
                            return <button
                                className={"modal-action" + (className ? " " + className : "")}
                                onClick={onClick}>
                                    {label}
                                </button>
                        })}
                    </div>
                }
            </FocusTrap>
        </div>
    </div>
}