import { Modal, Button } from "react-bootstrap";

interface ConfirmationModalProps {
    show: boolean;
    handleClose: () => void;
    handleConfirm: () => void;
    title: string;
    body: string;
}

export function ConfirmationModal({ show, handleClose, handleConfirm, title, body }: ConfirmationModalProps) {
    
    const onConfirm = () => {
        handleConfirm();
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{body}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    No, cancel
                </Button>
                <Button variant="danger" onClick={onConfirm}>
                    Yes, delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}