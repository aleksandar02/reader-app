import CollectionListItem from './CollectionListItem';

const CollectionList = ({ collectionsToShow, handleOnChange, selectedIds }) => {
  return (
    <div className='collection-list'>
      {collectionsToShow.map((collection) => (
        <CollectionListItem
          key={collection.id}
          collection={collection}
          handleOnChange={handleOnChange}
          selectedIds={selectedIds}
        />
      ))}
    </div>
  );
};

export default CollectionList;
