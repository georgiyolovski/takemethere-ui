import { useState } from 'react';
import AddTripForm from '../../big/AddTripForm/AddTripForm';
import Flights from '../../big/Flights/Flights';
import Layout from '../../big/Layout/Layout';
import PlacesForm from '../../big/PlacesForm/PlacesForm';

const AddTrip = () => {
  const [searchSessionId, setSearchSessionId] = useState<null | number>(null);
  const [flightTicketsUrls, setFlightTicketsUrls] = useState<string[]>([]);

  return (
    <Layout title='Add a Trip'>
      <AddTripForm
        onSubmitCallback={(id) => setSearchSessionId(id)}
        onRemoveFlightUrls={() => setFlightTicketsUrls([])}
      />

      {searchSessionId && (
        <Flights
          searchSessionId={searchSessionId}
          onSaveFlightUrl={(flightUrl) =>
            setFlightTicketsUrls((prevState) => [...prevState, flightUrl])
          }
        />
      )}

      <PlacesForm />
    </Layout>
  );
};

export default AddTrip;
