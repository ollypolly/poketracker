import { request } from "./request";

export const cardClient = {
    getSets() {
        return request
            .getData("v1/sets", {})
            .then(response => {
                return response;
            });
    },

    getCardsForSet(code: string) {
        return request
            .getData(`v1/cards`, { code })
            .then(response => {
                return response;
            });
    }
};
