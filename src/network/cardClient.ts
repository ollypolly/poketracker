import { request } from "./request";

export const cardClient = {
    getSets() {
        return request
            .getData("v1/sets", {})
            .then(response => {
                return response;
            });
    },

    getCardsForSet(data: { set: string, pageSize: number }) {
        return request
            .getData(`v1/cards`, data)
            .then(response => {
                return response;
            });
    }
};
