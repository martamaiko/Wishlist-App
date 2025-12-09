import { Card, CardBody, CardFooter, CardTitle } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import { Link } from "react-router-dom"
import type { Item } from "../App"
import { getAssetUrl } from "../utilities/getAssetUrl"

type CardItemProps = Item & {
    onUpdateClick: (item: Item) => void;
    onRemoveClick: (id: number) => void;
}

export function CardItem(props: CardItemProps) {
    const { 
        id, 
        title, 
        price, 
        imgUrl, 
        description, 
        onUpdateClick, 
        onRemoveClick 
    } = props;

    const handleUpdate = () => {
        onUpdateClick(props); 
    }

    const handleRemove = () => {
        onRemoveClick(id); 
    }
    
    return (
        <Card className="h-100">
            <Card.Img 
                variant="top" 
                src={imgUrl} 
                height="200px" 
                style={{ objectFit: "cover" }}
            />
            
            <CardBody className="d-flex flex-column justify-content-between">
                <CardTitle className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{title}</span>
                    <span className="ms-2 text-muted">{formatCurrency(price)}</span>
                </CardTitle>
                <span>{description}</span>
            </CardBody>
            
            <CardFooter className="d-flex justify-content-between gap-2">
                <Link 
                    to={`/details/${id}`} 
                    className="p-1 text-secondary icon-action-button" 
                    title="Details"
                >
                    <img src={getAssetUrl("arrow-expand.svg")} alt="Details" style={{ width: '20px', height: '20px' }}/>
                </Link>
                <span 
                    className="p-1 text-secondary icon-action-button" 
                    title="Update" 
                    onClick={handleUpdate}
                    style={{ cursor: 'pointer' }}
                >
                    <img src={getAssetUrl("edit-detailed-alt-line.svg")} alt="Update" style={{ width: '20px', height: '20px' }}/>
                </span>
                <span 
                    className="p-1 text-secondary icon-action-button" 
                    title="Delete" 
                    onClick={handleRemove}
                    style={{ cursor: 'pointer' }}
                >
                    <img src={getAssetUrl("delete-02.svg")} alt="Delete" style={{ width: '20px', height: '20px' }}/>
                </span>
            </CardFooter>
        </Card>
    )
}