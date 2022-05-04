import CollectionListItem from './CollectionListItem';

const CollectionList = ({
  collectionsToShow,
  handleOnChange,
  selectedIds,
  cssClass = '',
}) => {
  return (
    <div className='collection-list'>
      {collectionsToShow.map((collection) => (
        <CollectionListItem
          key={collection.id}
          collection={collection}
          handleOnChange={handleOnChange}
          selectedIds={selectedIds}
          cssClass={cssClass}
        />
      ))}
    </div>
  );
};

export default CollectionList;
