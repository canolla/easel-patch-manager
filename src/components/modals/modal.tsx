import * as React from "react";


import "../../styles/modal.css";

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
            <div className="modal-title-container">
                <div className="modal-title">
                    { title }
                </div>
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
        </div>
    </div>
}