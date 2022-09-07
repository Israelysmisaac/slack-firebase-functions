import {Request} from "./types";

export const optionsList = async (request: Request) => {
    const optionsList = {
        options: [
            {
                text: {
                    type: "plain_text",
                    text: "Chennai",
                },
                value: "CH",
            },
            {
                text: {
                    type: "plain_text",
                    text: "Banglore",
                },
                value: "BA",
            },
            {
                text: {
                    type: "plain_text",
                    text: "Hydrabad",
                },
                value: "HY",
            },
        ],
    };
    return optionsList;
};
