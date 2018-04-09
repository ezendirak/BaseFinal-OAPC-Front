import { InfoKey } from './info-key';
export interface RegisterResponse {
    id: number;
    periode: string;
    tipusProducte: InfoKey;
    eInformant: string;
    colorCarn: string;
    calibre: string;
    qualitat: string;
    varietat: string;
    quantitatVenuda: number;
    preuSortida: number;
}
