// Method that returns Book Collection Id that needs to be removed
export const getBookCollectionIdToRemove = (
  bookCollections,
  collectionId,
  bookId
) => {
  let removeBookCollectionId;

  Object.values(bookCollections).forEach((bookCollection) => {
    if (
      bookCollection.bookId == bookId &&
      bookCollection.collectionId == collectionId
    ) {
      removeBookCollectionId = bookCollection.id;
    }
  });

  return removeBookCollectionId;
};

// Method that filters Book Collections by id
// i.e. Removes Book Collection by id
export const filterBookCollectionsById = (
  bookCollections,
  removeBookCollectionId
) => {
  let newBookCollection = {};

  Object.values(bookCollections).forEach((bookCollection) => {
    if (bookCollection.id != removeBookCollectionId) {
      newBookCollection = {
        ...newBookCollection,
        [bookCollection.id]: { ...bookCollection },
      };
    }
  });

  return newBookCollection;
};
