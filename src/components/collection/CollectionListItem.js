import { BiPlus } from 'react-icons/bi';

const CollectionListItem = ({
  collection,
  handleOnChange,
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
      onClick={() => handleOnChange(collection.id)}
    >
      <p>{collection.name}</p>
      <BiPlus />
    </div>
  );
};

export default CollectionListItem;
