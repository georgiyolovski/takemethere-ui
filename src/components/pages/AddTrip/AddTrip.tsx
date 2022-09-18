import { useState } from 'react';
import AddTripForm from '../../big/AddTripForm/AddTripForm';
import Flights from '../../big/Flights/Flights';
import Layout from '../../big/Layout/Layout';

const AddTrip = () => {
  const [searchSessionId, setSearchSessionId] = useState<null | number>(null);

  return (
    <Layout title='Add a Trip'>
      <AddTripForm onSubmitCallback={(id) => setSearchSessionId(id)} />

      {searchSessionId && <Flights searchSessionId={searchSessionId} />}
    </Layout>
  );
};

export default AddTrip;
