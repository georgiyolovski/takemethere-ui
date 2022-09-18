import { useRouter } from 'next/router';
import { useState } from 'react';
import { apiEndpoint } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';
import AddTripForm from '../../big/AddTripForm/AddTripForm';
import Flights from '../../big/Flights/Flights';
import { IHotel } from '../../big/HotelCard/HotelCard';
import HotelsForm from '../../big/HotelsForm/HotelsForm';
import Layout from '../../big/Layout/Layout';
import { IPlace } from '../../big/PlaceCard/PlaceCard';
import PlacesForm from '../../big/PlacesForm/PlacesForm';

const AddTrip = () => {
  const [searchSessionId, setSearchSessionId] = useState<null | number>(null);
  const [flightTicketsUrls, setFlightTicketsUrls] = useState<string[]>([]);
  const [places, setPlaces] = useState<IPlace[]>([]);
  const [hotel, setHotel] = useState<IHotel | null>(null);

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
        hotels: [hotel],
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

      {searchSessionId &&
        flightTicketsUrls.length === 2 &&
        places.length > 0 && (
          <HotelsForm
            onSubmit={onSubmit}
            isSubmitDisabled={hotel === null}
            searchSessionId={searchSessionId}
            onSelectHotel={(hotel: IHotel) => setHotel(hotel)}
            selectedHotel={hotel}
          />
        )}
    </Layout>
  );
};

export default AddTrip;
