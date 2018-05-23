import { Estats } from "../model/estats";

export interface InfoEmpressa {
    id:             number;
    codi:           string;
    tipusProductes: string[];
    estat:          Estats;
}
