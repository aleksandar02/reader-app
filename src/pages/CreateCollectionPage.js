import CreateCollectionForm from '../components/collection/CreateCollectionForm';
import Header from '../components/header/Header';

const CreateCollectionPage = () => {
  return (
    <div className='main-section'>
      <Header
        title='Create New Collection'
        subtitle='Fill in the required fields to create new card.'
      />
      <CreateCollectionForm />
    </div>
  );
};

export default CreateCollectionPage;
