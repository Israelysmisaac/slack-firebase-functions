import * as functions from "firebase-functions";
import {events} from "./events";
import {actions} from "./actions";
import {optionsList} from "./options";
import axios from "axios";
import {config} from "./config/config";
import {Request} from "./types";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

// callback
export const callback = functions.https.onRequest(async (request, response) => {
    const {code} = request.query;
    const oAuthRes = await axios.post(
        `https://slack.com/api/oauth.v2.access?code=${code}&client_id=${config.clientId}&client_secret=${config.clientSecret}`
    );
    response.send(oAuthRes.data);
});
// action
export const action = functions.https.onRequest(async (request, response) => {
    const data = request.body;
    const result =await actions(data);
    response.send(result);
});
// event
// eslint-disable-next-line max-len
export const event = functions.https.onRequest(async (request, response) => {
    const data = request.body as unknown as Request;
    // functions.logger.info("Hello logs!", data);
    if (data.type === "url_verification") {
        response.send({challenge: data.challenge});
    } else {
        const result =await events(data);
        response.send(result);
    }
});
// options
export const options = functions.https.onRequest(async (request, response) => {
    const data = request.body;
    const result =await optionsList(data);
    response.send(result);
});
