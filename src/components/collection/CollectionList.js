import CollectionListItem from './CollectionListItem';

const CollectionList = ({
  collectionsToShow,
  saveSelectedCollectionId,
  selectedIds,
  cssClass = '',
}) => {
  return (
    <div className='collection-list'>
      {collectionsToShow.map((collection) => (
        <CollectionListItem
          key={collection.id}
          collection={collection}
          saveSelectedCollectionId={saveSelectedCollectionId}
          selectedIds={selectedIds}
          cssClass={cssClass}
        />
      ))}
    </div>
  );
};

export default CollectionList;
