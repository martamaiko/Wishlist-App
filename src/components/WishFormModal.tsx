import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import type { Item } from '../App';


export type NewWishData = {
    title: string;
    price: number;
    description: string;
    imgUrl: string;
}

type WishFormModalProps = {
    show: boolean;
    handleClose: () => void;
    itemToEdit: Item | null;
    handleSaveWish: (data: NewWishData, id?: number) => void;
}

export function WishFormModal({ show, handleClose, itemToEdit, handleSaveWish }: WishFormModalProps) {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [imgUrl, setImgUrl] = useState('');
    
    const isEditing = !!itemToEdit;

    useEffect(() => {
        if (isEditing) {
            setTitle(itemToEdit.title);
            setPrice(itemToEdit.price);
            setDescription(itemToEdit.description);
            setImgUrl(itemToEdit.imgUrl);
        } else {
            setTitle('');
            setPrice(0);
            setDescription('');
            setImgUrl('');
        }
    }, [itemToEdit, show]); 

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        
        const data: NewWishData = {
            title,
            price: price || 0,
            description,
            imgUrl,
        };

        handleSaveWish(data, itemToEdit?.id);
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{isEditing ? 'Update Wish' : 'Add new wish'}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="title">
                        <Form.Label>Wish name</Form.Label>
                        <Form.Control 
                            type="text" 
                            required 
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="price">
                        <Form.Label>Price (UAH)</Form.Label>
                        <Form.Control 
                            type="number" 
                            value={price || ''}
                            onChange={e => setPrice(Number(e.target.value))}
                        />
                    </Form.Group>
                    
                    <Form.Group className="mb-3" controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control 
                            as="textarea" 
                            rows={3} 
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="imgUrl">
                        <Form.Label>Image URL</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={imgUrl}
                            onChange={e => setImgUrl(e.target.value)}
                        />
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" type="submit">
                        {isEditing ? 'Safe changes' : 'Add wish'}
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}