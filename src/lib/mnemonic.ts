import {
  getCoordinatesFromAddress,
  getPlaceAutocomplete,
  subtractKmToLatLng,
} from '@/lib/maps';
import geohash from 'ngeohash';
import { createHmac } from 'node:crypto';
import * as bip39 from '@scure/bip39';
import { wordlist as czech } from '@scure/bip39/wordlists/czech';
import { wordlist as english } from '@scure/bip39/wordlists/english';
import { wordlist as french } from '@scure/bip39/wordlists/french';
import { wordlist as italian } from '@scure/bip39/wordlists/italian';
import { wordlist as japanese } from '@scure/bip39/wordlists/japanese';
import { wordlist as korean } from '@scure/bip39/wordlists/korean';
import { wordlist as simp } from '@scure/bip39/wordlists/simplified-chinese';
import { wordlist as spanish } from '@scure/bip39/wordlists/spanish';
import { wordlist as trad } from '@scure/bip39/wordlists/traditional-chinese';
import { AppStateValues } from '@/components/context';

const wordlists = {
  czech,
  english,
  french,
  italian,
  japanese,
  korean,
  simp,
  spanish,
  trad,
};

export const hexStringToUint8Array = (
  hash: string,
  length: number
): Uint8Array => {
  if (hash.length % 2 !== 0 || length <= 0) {
    throw new Error('Invalid parameters.');
  }

  const uint8Array = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    const startIdx = i * 2;
    if (startIdx + 1 >= hash.length) {
      throw new Error('Hash length is not enough to generate the Uint8Array.');
    }

    const byteValue = parseInt(hash.substr(startIdx, 2), 16);
    uint8Array[i] = byteValue;
  }

  return uint8Array;
};

export type GetSeedAddressProps = AppStateValues & {
  place_id: string;
  password: string;
};

export async function getSeedAddress(data: GetSeedAddressProps) {
  const { place_id, password, totalWords, language } = data;
  const { latitude, longitude } = await getCoordinatesFromAddress(place_id!);

  const hash = createHmac('sha256', password!)
    .update(geohash.encode(latitude, longitude))
    .digest('hex');

  const entropy = hexStringToUint8Array(hash, (4 / 3) * totalWords!);
  return bip39.entropyToMnemonic(entropy, wordlists[language!]);
}
