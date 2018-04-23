import { Empressa } from './empressa';
import { Periode } from './periode';
import { InfoKey } from "../interfaces/info-key";

export class Register {
    id: Periode;
    periode: number;
    tipusProducte: string;
    eInformant: Empressa;
    colorCarn: string;
    calibre: string;
    qualitat: string;
    varietat: string;
    quantitatVenuda: number;
    preuSortida: number;
}
