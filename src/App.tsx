import { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom" 
import { Container } from "react-bootstrap"
import { Dashboard } from "./pages/Dashboard"
import { Details } from "./pages/Details"
import { Navbar } from "./components/Navbar"
import initialItems from "./data/db.json"
import { WishFormModal } from "./components/WishFormModal" 
import type { NewWishData } from "./components/WishFormModal" 
import { ConfirmationModal } from "./components/ConfirmationModal"; 


export type SortCriteria = 
    | 'price-high-low' 
    | 'price-low-high' 
    | 'date-newest' 
    | 'date-oldest';

export type Item = typeof initialItems[number];
const STORAGE_KEY = 'wishlistItems'; 

const getInitialItems = (): Item[] => {
    try {
        const storedItems = localStorage.getItem(STORAGE_KEY);
        if (storedItems != null) {
            return JSON.parse(storedItems);
        }
    } catch (error) {
        console.error("Помилка читання LocalStorage, використано дефолтні дані:", error);
    }
    return initialItems as Item[];
};


function App() {
  const navigate = useNavigate(); 
  const location = useLocation(); 
  const shouldHideNavbar = location.pathname.startsWith('/details');

  const [items, setItems] = useState<Item[]>(getInitialItems); 
  const [activeSortCriteria, setActiveSortCriteria] = useState<SortCriteria>('date-newest'); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  const [itemToDeleteId, setItemToDeleteId] = useState<number | null>(null); 

  useEffect(() => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
        console.error("Помилка запису в LocalStorage:", error);
    }
  }, [items]); 


  const openModalForCreate = () => { setEditingItem(null); setIsModalOpen(true); };
  const openModalForEdit = (item: Item) => { setEditingItem(item); setIsModalOpen(true); };
  const closeModal = () => { setIsModalOpen(false); setEditingItem(null); };
  
  const openConfirmModal = (id: number) => { setItemToDeleteId(id); };
  const closeConfirmModal = () => { setItemToDeleteId(null); };

  const handleSaveWish = (data: NewWishData, id?: number) => {
    if (id) {

      setItems(prevItems => prevItems.map(item => item.id === id ? { ...item, ...data } : item));
    } else {
      const newItem: Item = { ...data, id: Date.now(), addTime: new Date().toISOString(), imgUrl: data.imgUrl || 'https://via.placeholder.com/200?text=No+Image', };
      setItems(prevItems => [newItem, ...prevItems]); 
    }
    closeModal(); 
  };

  const handleRemoveWishAndRedirect = (shouldRedirect: boolean = false) => {
    if (itemToDeleteId !== null) {
        setItems(prevItems => prevItems.filter(item => item.id !== itemToDeleteId));
        
        if (shouldRedirect) {
            navigate('/dashboard'); 
        }
    }
    closeConfirmModal(); 
  };
  
  const handleRemoveClick = (id: number) => {
      openConfirmModal(id);
  }

  return (
    <>
      {!shouldHideNavbar && (
          <Navbar
            setSortCriteria={setActiveSortCriteria}
            activeSortCriteria={activeSortCriteria}
            onAddWishClick={openModalForCreate}
          />
      )}
      
      <Container className="mb-4">
          <Routes>
            <Route 
                path="/dashboard" 
                element={
                    <Dashboard 
                        items={items}
                        activeSortCriteria={activeSortCriteria}
                        onUpdateClick={openModalForEdit}
                        onRemoveClick={handleRemoveClick}
                    />
                } 
            />
            
            <Route path="/details/:id" element={
                <Details 
                    items={items}
                    onUpdateClick={openModalForEdit}
                    onRemoveClick={handleRemoveClick}
                />
            } />
            
            <Route path="/" element={<Dashboard 
                items={items} 
                activeSortCriteria={activeSortCriteria}
                onUpdateClick={openModalForEdit}
                onRemoveClick={handleRemoveClick}
            />} />
          </Routes>
      </Container>

      <WishFormModal 
          show={isModalOpen}
          handleClose={closeModal} 
          itemToEdit={editingItem} 
          handleSaveWish={handleSaveWish}
      />
      
      <ConfirmationModal
          show={itemToDeleteId !== null}
          handleClose={closeConfirmModal}
          handleConfirm={() => handleRemoveWishAndRedirect(location.pathname.startsWith('/details'))}
          title="Confirm"
          body="Are you sure you want to delete the wish?"
      />
    </>
  )
}

export default App