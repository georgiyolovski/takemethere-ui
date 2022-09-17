import { CircularProgress } from '@mui/material';
import Box from '@mui/system/Box';
import { useCallback, useEffect, useState } from 'react';
import { apiEndpoint } from '../../../constants';
import { useAuth } from '../../../context/AuthContext';

interface IFlight {
  outgoing: {
    legs: {
      arrival_time: string;
      carrier: {
        logo: string;
        name: string;
      };
      departure: string;
      departure_time: string;
      destination: string;
    }[];
    notes: string[];
    price: {
      amount: number;
      id: string;
      impressionId: string;
    };
    search_hash: string;
    search_id: string;
  }[];
  return: {
    legs: {
      arrival_time: string;
      carrier: {
        logo: string;
        name: string;
      };
      departure: string;
      departure_time: string;
      destination: string;
    }[];
    notes: string[];
    price: {
      amount: 19.0;
      id: string;
      impressionId: string;
    };
    search_hash: string;
    search_id: string;
  }[];
}

interface IProps {
  searchSessionId: number;
}

const Flights: React.FC<IProps> = ({ searchSessionId }) => {
  const { auth } = useAuth();

  const [loadingFlights, setLoadingFlights] = useState(false);
  const [flights, setFlights] = useState<null | IFlight>(null);

  const getFlights = useCallback(
    (id: number) => {
      setLoadingFlights(true);

      fetch(`${apiEndpoint}/search_sessions/${id}/flights`, {
        headers: {
          Authorization: `${auth?.token}`,
        },
      })
        .then((res) => res.json())
        .then((res: IFlight) => setFlights(res))
        .catch((err) => console.log(err))
        .finally(() => setLoadingFlights(false));
    },
    [auth?.token]
  );

  useEffect(() => {
    if (searchSessionId) {
      getFlights(searchSessionId);
    }
  }, [getFlights, searchSessionId]);

  return (
    <>
      <Box mt={3}>
        {loadingFlights && <CircularProgress />}
        {flights && <>{JSON.stringify(flights)}</>}
      </Box>
    </>
  );
};

export default Flights;
