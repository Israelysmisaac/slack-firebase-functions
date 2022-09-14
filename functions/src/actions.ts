/* eslint-disable max-len */
import {config} from "./config/config";
import axios from "axios";
import {Request} from "./types";

export const actions = async (request: Request) => {
    // const eventType = request.event.type;
    // const user_id = request.event.user,
    const parsedData = JSON.parse(request.payload);
    console.log(parsedData);
    if (parsedData.view && parsedData.view.state && parsedData.view.state.values) {
        console.log("value: ", parsedData.view.state.values);
    }

    if (
        parsedData.actions &&
        parsedData.actions[0] &&
        parsedData.actions[0].value
    ) {
        const teamId = parsedData.team.id;
        console.log("team id", teamId);
        await axios.post(
            "https://slack.com/api/views.open",
            {
                trigger_id: parsedData.trigger_id,
                view: {
                    type: "modal",
                    callback_id: "booking-form-submit",
                    title: {
                        type: "plain_text",
                        text: "Book Hall 1",
                        emoji: true,
                    },
                    submit: {
                        type: "plain_text",
                        text: "Submit",
                        emoji: true,
                    },
                    close: {
                        type: "plain_text",
                        text: "Cancel",
                        emoji: true,
                    },
                    blocks: [
                        {
                            type: "input",
                            element: {
                                type: "datepicker",
                                initial_date: "2022-04-28",
                                placeholder: {
                                    type: "plain_text",
                                    text: "Select a date",
                                    emoji: true,
                                },
                                action_id: "datepicker-action",
                            },
                            label: {
                                type: "plain_text",
                                text: "Select a date",
                                emoji: true,
                            },
                        },
                        {
                            type: "input",
                            element: {
                                type: "timepicker",
                                initial_time: "13:37",
                                placeholder: {
                                    type: "plain_text",
                                    text: "Select time",
                                    emoji: true,
                                },
                                action_id: "timepicker-action",
                            },
                            label: {
                                type: "plain_text",
                                text: "Select in time",
                                emoji: true,
                            },
                        },
                        {
                            type: "input",
                            element: {
                                type: "timepicker",
                                initial_time: "13:37",
                                placeholder: {
                                    type: "plain_text",
                                    text: "Select time",
                                    emoji: true,
                                },
                                action_id: "timepicker-action",
                            },
                            label: {
                                type: "plain_text",
                                text: "Select out time",
                                emoji: true,
                            },
                        },
                        {
                            type: "input",
                            element: {
                                type: "multi_users_select",
                                placeholder: {
                                    type: "plain_text",
                                    text: "Select users",
                                    emoji: true,
                                },
                                action_id: "multi_users_select-action",
                            },
                            label: {
                                type: "plain_text",
                                text: "Team Members",
                                emoji: true,
                            },
                        },
                    ],
                },
            },
            {
                headers: {
                    Authorization: config.gngWorkspaceBotToken,
                },
            }
        );
    }

    if (
        parsedData.type &&
        parsedData.type === "view_submission" &&
        parsedData.view &&
        parsedData.view.state &&
        parsedData.view.state.values
    ) {
        // console.log(parsedData.view.state.values)
        Object.keys(parsedData.view.state.values).forEach((item) => {
        // console.log(parsedData.view.state.values[item])
            if (parsedData.view.state.values[item] && parsedData.view.state.values[item]["multi_users_select-action"]) {
                console.log(parsedData.view.state.values[item]["multi_users_select-action"].selected_users);
            }
        });
    }

    await axios.post(
        "https://slack.com/api/chat.postMessage",
        {
            channel: "U040MMKRX2T",
            blocks: [
                {
                    "type": "section",
                    "text": {
                        "type": "mrkdwn",
                        "text": "------------------------------------------\nYour Booking Done\n Your Booking ID: ABDGC3214",
                    },
                    "accessory": {
                        "type": "image",
                        "image_url": "https://i.imgur.com/2J2wnbe.png",
                        "alt_text": "Windsor Court Hotel thumbnail",
                    },
                },
            ],
        },
        {
            headers: {
                Authorization: config.gngWorkspaceBotToken,
            },
        }
    );

    await axios.post(
        "https://slack.com/api/views.open",
        {
            trigger_id: parsedData.trigger_id,
            view: {
                type: "modal",
                callback_id: "booking-done",
                title: {
                    type: "plain_text",
                    text: "Book Hall 1 - Done",
                    emoji: true,
                },
                close: {
                    type: "plain_text",
                    text: "Cancel",
                    emoji: true,
                },
                blocks: [
                    {
                        "type": "section",
                        "text": {
                            "type": "mrkdwn",
                            "text": "------------------------------------------\nYour Booking Done\n Your Booking ID: ABDGC3214",
                        },
                        "accessory": {
                            "type": "image",
                            "image_url": "https://i.imgur.com/2J2wnbe.png",
                            "alt_text": "Windsor Court Hotel thumbnail",
                        },
                    },
                ],
            },
        },
        {
            headers: {
                Authorization: config.gngWorkspaceBotToken,
            },
        }
    );

    // return {
    //     "response_action": "clear",
    // };
};

