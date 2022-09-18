import { useRouter } from 'next/router';
import { useState } from 'react';
import { apiEndpoint } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import AddTripForm from '../../big/AddTripForm/AddTripForm';
import Flights from '../../big/Flights/Flights';
import Layout from '../../big/Layout/Layout';
import { IPlace } from '../../big/PlaceCard/PlaceCard';
import PlacesForm from '../../big/PlacesForm/PlacesForm';

const AddTrip = () => {
  const [searchSessionId, setSearchSessionId] = useState<null | number>(null);
  const [flightTicketsUrls, setFlightTicketsUrls] = useState<string[]>([]);
  const [places, setPlaces] = useState<IPlace[]>([]);

  const { auth } = useAuth();
  const router = useRouter();

  const onSubmit = () => {
    fetch(`${apiEndpoint}/trips`, {
      method: 'POST',
      headers: {
        Authorization: `${auth?.token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        search_session_id: searchSessionId,
        tickets: flightTicketsUrls,
        hotels: [],
        places: places,
      }),
    })
      .then(() => {
        router.push('/my-trips');
      })
      .catch((err) => console.log(err));
  };

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
          onRemoveFlightUrls={() => setFlightTicketsUrls([])}
        />
      )}

      {searchSessionId && flightTicketsUrls.length === 2 && (
        <PlacesForm
          onSubmit={onSubmit}
          isSubmitDisabled={places.length === 0}
          searchSessionId={searchSessionId}
          onSelectPlace={(newPlace: IPlace) =>
            setPlaces((prevState) => {
              const existingPlace = prevState.find(
                (place) => place.id === newPlace.id
              );

              if (existingPlace) {
                return prevState.filter((place) => place.id !== newPlace.id);
              }

              return [...prevState, newPlace];
            })
          }
        />
      )}
    </Layout>
  );
};

export default AddTrip;
