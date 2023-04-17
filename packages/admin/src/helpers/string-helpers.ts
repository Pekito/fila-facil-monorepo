import { TListTypes } from "@/types"

export function getListLabel(name: TListTypes) {
    switch(name) {
        case "recebidos": return "Recebidos"
        case "em-andamento":return "Em Andamento"
        case "prontos": return "Prontos"
        case "finished": return "Finalizados"
    }
}

export function isStringEmpty(arg: string) {
    return arg === "";
}
export function isUrlValid(arg: string) {
        try {
            new URL (arg);
        } catch (error) {
           return false; 
        }
        return true;
}