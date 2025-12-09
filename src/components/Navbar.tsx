import { Button, Container, Nav, Navbar as NavbarBs, NavDropdown } from "react-bootstrap";
import type { SortCriteria } from "../App"; 


type NavbarProps = {
    setSortCriteria: (criteria: SortCriteria) => void; 
    activeSortCriteria: SortCriteria; 
    onAddWishClick: () => void; 
}

export function Navbar({ setSortCriteria, activeSortCriteria, onAddWishClick }: NavbarProps) {

    const isDateActive = (criteria: 'date-newest' | 'date-oldest') => activeSortCriteria === criteria;
    const isPriceActive = (criteria: 'price-high-low' | 'price-low-high') => activeSortCriteria === criteria;
    
    return (
        <NavbarBs sticky="top" className="bg-white shadow-sm mb-3">
            <Container>
                <NavbarBs.Brand href="/" className="fs-3 fw-bold me-5 text-primary">
                    Wishlist
                </NavbarBs.Brand>
                <NavbarBs.Collapse className="justify-content-end">
                    <Nav className="d-flex align-items-center">
                        <NavDropdown 
                            title="Sort by Date" 
                            id="sort-date-dropdown" 
                            className="me-2"
                        >
                            <NavDropdown.Item 
                                onClick={() => setSortCriteria('date-newest')} 
                                active={isDateActive('date-newest')}
                            >
                                Newest
                            </NavDropdown.Item>
                            <NavDropdown.Item 
                                onClick={() => setSortCriteria('date-oldest')} 
                                active={isDateActive('date-oldest')}
                            >
                                Oldest
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown 
                            title="Sort by Price" 
                            id="sort-price-dropdown"
                            className="me-3"
                        >
                            <NavDropdown.Item 
                                onClick={() => setSortCriteria('price-high-low')} 
                                active={isPriceActive('price-high-low')}
                            >
                                High to Low
                            </NavDropdown.Item>
                            <NavDropdown.Item 
                                onClick={() => setSortCriteria('price-low-high')} 
                                active={isPriceActive('price-low-high')}
                            >
                                Low to High
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Button variant="primary" onClick={onAddWishClick}>
                            Add new wish
                        </Button>
                    </Nav>
                </NavbarBs.Collapse>
            </Container>
        </NavbarBs>
    )
}