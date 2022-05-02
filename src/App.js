import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import BookCollectionPage from './pages/BookCollectionPage';
import AddBookPage from './pages/AddBookPage';
import Sidebar from './components/sidebar/Sidebar';
import Collection from './components/collection/Collection';
import CreateCollectionPage from './pages/CreateCollectionPage';
import AddBooksToCollectionPage from './pages/AddBooksToCollectionPage';

function App() {
  return (
    <div className='App'>
      <Router>
        <Sidebar />
        <Routes>
          <Route path='/' element={<BookCollectionPage />}>
            <Route path=':collectionId' element={<Collection />} />
          </Route>
          <Route path='/add-book' element={<AddBookPage />} />
          <Route path='/create-collection' element={<CreateCollectionPage />} />
          <Route
            path='/add-books/:collectionId'
            element={<AddBooksToCollectionPage />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
