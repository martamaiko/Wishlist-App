import { Col, Row } from "react-bootstrap"
import { CardItem } from "../components/CardItem";
import type { SortCriteria, Item } from "../App"; 


type DashboardProps = {
    items: Item[]; 
    activeSortCriteria: SortCriteria;
    onUpdateClick: (item: Item) => void; 
    onRemoveClick: (id: number) => void; 
}

export function Dashboard({ items, activeSortCriteria, onUpdateClick, onRemoveClick }: DashboardProps) {

    let sortedItems: Item[] = [...items];
    
    const getPriceValue = (item: Item): number => {
        const price = parseFloat(item.price as any);
        return isNaN(price) ? 0 : price; 
    };
    switch (activeSortCriteria) {
        case 'price-low-high':
            sortedItems.sort((a, b) => getPriceValue(a) - getPriceValue(b));
            break;

        case 'price-high-low':
            sortedItems.sort((a, b) => getPriceValue(b) - getPriceValue(a));
            break;

        case 'date-oldest':
            sortedItems.sort((a, b) => {
                const dateA = new Date(a.addTime).getTime();
                const dateB = new Date(b.addTime).getTime();
                return dateA - dateB; 
            });
            break;

        case 'date-newest':
        default:
            sortedItems.sort((a, b) => {
                const dateA = new Date(a.addTime).getTime();
                const dateB = new Date(b.addTime).getTime();
                return dateB - dateA; 
            });
            break;
    }

    return (
        <>
            <Row md={2} xs={1} lg={3} className="g-4 mt-1">
                {sortedItems.map(item => (
                    <Col key={item.id}>
                        <CardItem 
                            {...item}
                            onUpdateClick={onUpdateClick}
                            onRemoveClick={onRemoveClick} 
                        />
                    </Col>
                ))}
            </Row>
        </>
    );
}