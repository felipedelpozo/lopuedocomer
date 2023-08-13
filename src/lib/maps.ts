import { Suggestion } from '@/types';

const EARTH_RADIUS_KM = 6371.0;

export const getMapsApi = async (url: string) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/${url}&key=${process.env.GOOGLEAPIS_KEY}`
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return await response.json();
  } catch (error) {
    throw new Error(
      'Error al obtener las coordenadas geográficas: ' +
        (error instanceof Error ? error.message : 'unknown error')
    );
  }
};

export const getCoordinatesFromAddress = async (
  place_id: string
): Promise<{
  latitude: number;
  longitude: number;
  formatted_address: string;
}> => {
  const data = await getMapsApi(
    `geocode/json?place_id=${encodeURIComponent(place_id)}`
  );

  if (data.status === 'OK') {
    const {
      geometry: {
        location: { lat, lng },
      },
      formatted_address,
    } = data.results[0];
    return { latitude: lat, longitude: lng, formatted_address };
  } else {
    throw new Error(
      'No se pudieron obtener las coordenadas para la dirección proporcionada.'
    );
  }
};

export const getPlaceAutocomplete = async (
  input: string,
  language: string
): Promise<Suggestion[]> => {
  const data = await getMapsApi(
    `place/autocomplete/json?input=${encodeURIComponent(
      input
    )}&language=${encodeURIComponent(language)}`
  );

  if (data.status === 'OK') {
    const { predictions } = data;

    return predictions.map(
      ({
        description,
        place_id,
      }: {
        description: string;
        place_id: string;
      }) => ({
        text: description,
        place_id,
      })
    );
  } else {
    throw new Error(
      'No se pudieron obtener las coordenadas para la dirección proporcionada.'
    );
  }
};

interface LatLng {
  lat: number;
  lng: number;
}

export const subtractKmToLatLng = (
  coord: LatLng,
  distanceInKm: number
): LatLng => {
  // Convert latitude and longitude from degrees to radians
  const latRadian = (Math.PI * coord.lat) / 180;
  const lngRadian = (Math.PI * coord.lng) / 180;

  // Calculate new latitude
  const newLatRadian = latRadian - distanceInKm / EARTH_RADIUS_KM;
  const newLat = (newLatRadian * 180) / Math.PI;

  // Calculate new longitude
  const newLngRadian =
    lngRadian - distanceInKm / (EARTH_RADIUS_KM * Math.cos(latRadian));
  const newLng = (newLngRadian * 180) / Math.PI;

  return {
    lat: newLat,
    lng: newLng,
  };
};
