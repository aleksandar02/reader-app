import { BiPlus } from 'react-icons/bi';

const CollectionListItem = ({
  collection,
  saveSelectedCollectionId,
  selectedIds,
  cssClass,
}) => {
  let selectedCollectionCssClass = '';

  if (selectedIds && selectedIds.includes(collection.id)) {
    selectedCollectionCssClass = 'selected';
  }

  return (
    <div
      className={`collection-list-item ${selectedCollectionCssClass} ${cssClass}`}
      onClick={() => saveSelectedCollectionId(collection.id)}
    >
      <p>{collection.name}</p>
      <BiPlus />
    </div>
  );
};

export default CollectionListItem;
