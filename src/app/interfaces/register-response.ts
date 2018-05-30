import { InfoKey } from './info-key';
import { Periode } from '../model/periode';

export interface RegisterResponse {
    id: number;
    periode: Periode;
    tipusProducte: InfoKey;
    uInformant: String;
    colorCarn: string;
    calibre: string;
    qualitat: string;
    varietat: string;
    quantitatVenuda: number;
    preuSortida: number;
    usuName:  string;
}
