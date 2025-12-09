import { Link, useParams } from "react-router-dom";
import { Container, Button, Card, Image, Row, Col } from "react-bootstrap";
import { formatCurrency } from "../utilities/formatCurrency";
import type { Item } from "../App"; 


type DetailsProps = {
    items: Item[]; 
    onUpdateClick: (item: Item) => void; 
    onRemoveClick: (id: number) => void; 
}

export function Details({ items, onUpdateClick, onRemoveClick }: DetailsProps) {
    const { id } = useParams<{ id: string }>(); 
    const itemId = id ? parseInt(id) : null;
    const wishItem = items.find(item => item.id === itemId);

    if (!wishItem) {
        return (
            <Container className="my-5 text-center">
                <h2>Wish is not found</h2>
                <Link to="/dashboard">
                    <Button variant="primary">Back to Dashboard</Button>
                </Link>
            </Container>
        );
    }
    
    const handleUpdate = () => {
        onUpdateClick(wishItem); 
    }

    const handleRemove = () => {
        onRemoveClick(wishItem.id); 
    }
    
    const { title, price, imgUrl, description, } = wishItem;

    return (
        <Container className="my-5">
            <Link to="/dashboard" className="mb-4 d-inline-block">
                <Button variant="secondary">← Back to Dashboard</Button>
            </Link>

            <Card className="shadow-lg">
                <Row>
                    <Col md={6} className="d-flex justify-content-center align-items-center mb-4 mb-md-0 p-4">
                        <Image 
                            src={imgUrl} 
                            fluid 
                            style={{ maxHeight: '400px', minHeight: '450px', objectFit: 'contain' }} 
                            alt={title}
                        />
                    </Col>

                    <Col md={6}>
                        <Card.Body className="p-4 p-md-5 pb-0">
                            <h1 className="mb-3">{title}</h1>
                            <h2 className="text-primary mb-4">
                                {formatCurrency(price)}
                            </h2>
                            
                            <hr />

                            <p className="lead">{description}</p>
                            
                        </Card.Body>
                    </Col>
                </Row>
                
                <Card.Footer className="d-flex justify-content-end gap-3 p-3">
                    
                    <Button 
                        variant="outline-primary" 
                        onClick={handleUpdate}
                        className="d-flex align-items-center"
                    >
                        Update
                    </Button>
                    
                    <Button 
                        variant="outline-danger" 
                        onClick={handleRemove}
                        className="d-flex align-items-center"
                    >
                        Delete
                    </Button>
                    
                </Card.Footer>
            </Card>
        </Container>
    );
}