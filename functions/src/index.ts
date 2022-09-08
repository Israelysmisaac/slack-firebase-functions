/* eslint-disable max-len */
import * as functions from "firebase-functions";
import {events} from "./events";
import {actions} from "./actions";
import {optionsList} from "./options";
import axios from "axios";
import {config} from "./config/config";
import {Request} from "./types";
import crypto from "crypto-js";
import tsscmp from "tsscmp";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

// callback
export const callback = functions.https.onRequest(async (request, response) => {
    const {code} = request.query;
    const oAuthRes = await axios.post(
        `https://slack.com/api/oauth.v2.access?code=${code}&client_id=${config.clientId}&client_secret=${config.clientSecret}`
    );
    console.log(oAuthRes);
    response.send(oAuthRes.data);
});
// action
export const action = functions.https.onRequest(async (request, response) => {
    // const legit = legitSlackRequest(request);
    const legit = true;
    if (!legit) {
        response.send({});
    } else {
        const data = request.body;
        const result =await actions(data);
        response.send(result);
    }
});
// event
// eslint-disable-next-line max-len
export const event = functions.https.onRequest(async (request, response) => {
    const legit = legitSlackRequest(request);
    if (!legit) {
        response.send({});
    } else {
        const data = request.body as unknown as Request;
        // functions.logger.info("Hello logs!", data);
        if (data.type === "url_verification") {
            response.send({challenge: data.challenge});
        } else {
            const result =await events(data);
            response.send(result);
        }
    }
});
// options
export const options = functions.https.onRequest(async (request, response) => {
    console.log("options", request.body);
    const legit = legitSlackRequest(request);
    // const legit = true;
    if (!legit) {
        response.send({});
    } else {
        const data = request.body;
        const result =await optionsList(data);
        response.send(result);
    }
});

/**
 * request authenication
 * @param {string} req
 * @return {boolean}
 */
function legitSlackRequest(req:Record<string, any>):boolean {
    // Your signing secret
    const slackSigningSecret = config.signingSecret;
    // Grab the signature and timestamp from the headers
    const requestSignature = req.headers["x-slack-signature"] as string;
    const requestTimestamp = req.headers["x-slack-request-timestamp"];
    const unix = Math.round(+new Date()/1000);
    if ((unix - requestTimestamp) > 60 * 5) {
        // The request timestamp is more than five minutes from local time.
        // It could be a replay attack, so let's ignore it.
        return false;
    }
    // Update it with the Slack Request
    const [version, hash] = requestSignature.split("=");
    const base = `${version}:${requestTimestamp}:${JSON.stringify(req.body)}`;
    console.log("time ", requestTimestamp);
    console.log("verion ", version);
    // Create the HMAC
    // eslint-disable-next-line new-cap
    const hmac = crypto.HmacSHA256(base, slackSigningSecret).toString(crypto.enc.Hex);
    // Returns true if it matches
    console.log(hash+"=="+hmac);
    return tsscmp(hash, hmac);
}
