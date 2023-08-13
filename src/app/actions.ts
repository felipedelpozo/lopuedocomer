'use server';

import {
  getCoordinatesFromAddress,
  getPlaceAutocomplete,
  subtractKmToLatLng,
} from '@/lib/maps';
import { Suggestion } from '@/types';
import { AppStateValues } from '@/components/context';

export type GetSeedAddressProps = AppStateValues & {
  place_id: string;
  password: string;
};

export async function getAutocomplete(
  input: string,
  language: string
): Promise<Suggestion[]> {
  return await getPlaceAutocomplete(input, language);
}

export async function getStaticMaps(
  place_id: string,
  size: string = '600x600'
) {
  const { latitude, longitude } = await getCoordinatesFromAddress(place_id);
  const center = subtractKmToLatLng({ lat: latitude, lng: longitude }, 1);
  return `https://maps.googleapis.com/maps/api/staticmap?center=${center.lat},${center.lng}&zoom=14&size=${size}&maptype=roadmap&markers=color:red%7C${latitude},${longitude}&key=${process.env.GOOGLEAPIS_KEY}`;
}
