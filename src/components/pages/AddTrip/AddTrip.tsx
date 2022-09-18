import { useState } from 'react';
import AddTripForm from '../../big/AddTripForm/AddTripForm';
import Flights from '../../big/Flights/Flights';
import Layout from '../../big/Layout/Layout';
import { IPlace } from '../../big/PlaceCard/PlaceCard';
import PlacesForm from '../../big/PlacesForm/PlacesForm';

const AddTrip = () => {
  const [searchSessionId, setSearchSessionId] = useState<null | number>(null);
  const [flightTicketsUrls, setFlightTicketsUrls] = useState<string[]>([]);
  const [places, setPlaces] = useState<IPlace[]>([]);

  console.log(places);

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

      <PlacesForm
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
    </Layout>
  );
};

export default AddTrip;
