export const getRemoveBookCollectionId = (
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

export const filterBookCollectionById = (
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
