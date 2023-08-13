import { decode, encode } from 'universal-base64url';

export const JSONEncode = (data: unknown) => encode(JSON.stringify(data));
export const JSONDecode = (data: string) => JSON.parse(decode(data));
