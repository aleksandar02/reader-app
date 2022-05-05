import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import BookCollectionPage from './pages/BookCollectionPage';
import AddBookPage from './pages/AddBookPage';
import Sidebar from './components/sidebar/Sidebar';
import Collection from './components/collection/Collection';
import CreateCollectionPage from './pages/CreateCollectionPage';
import AddBooksToCollectionPage from './pages/AddBooksToCollectionPage';
import BookDetailsPage from './pages/BookDetailsPage';
import CollectionListModal from './components/collection/CollectionListModal';
import { useSelector } from 'react-redux';
import { selectShowModal } from './redux/modal/modal.reducer';

function App() {
  const showModal = useSelector((state) => selectShowModal(state));

  if (showModal) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = 'auto';
  }

  return (
    <div className='App'>
      <Router>
        <Sidebar />
        <Routes>
          <Route path='/' element={<BookCollectionPage />}>
            <Route path=':collectionId' element={<Collection />} />
          </Route>
          <Route path='book-details/:bookId' element={<BookDetailsPage />} />
          <Route path='add-book' element={<AddBookPage />} />
          <Route path='create-collection' element={<CreateCollectionPage />} />
          <Route
            path='add-books/:collectionId'
            element={<AddBooksToCollectionPage />}
          />
        </Routes>
        {showModal && <CollectionListModal />}
      </Router>
    </div>
  );
}

export default App;
