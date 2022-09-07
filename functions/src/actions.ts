/* eslint-disable max-len */
import {config} from "./config/config";
import axios from "axios";
import {Request} from "./types";

export const actions = async (request: Request) => {
    // const eventType = request.event.type;
    // const user_id = request.event.user,
    const parsedData = JSON.parse(request.payload);
    console.log(request);

    if (
        parsedData.actions &&
        parsedData.actions[0] &&
        parsedData.actions[0].selected_option
    ) {
        const publish = await axios.post(
            "https://slack.com/api/views.publish",
            {
            // Use the user ID associated with the event
                user_id: parsedData.user.id,
                view: {
                    // Home tabs must be enabled in your app configuration page under "App Home"
                    type: "home",
                    blocks: [
                        {
                            type: "section",
                            block_id: "section678",
                            text: {
                                type: "mrkdwn",
                                text: "Pick items from the list",
                            },
                            accessory: {
                                action_id: "select_city",
                                type: "external_select",
                                placeholder: {
                                    type: "plain_text",
                                    text: "Select items",
                                },
                                min_query_length: 3,
                            },
                        },
                        {
                            type: "divider",
                        },
                        {
                            type: "section",
                            text: {
                                type: "mrkdwn",
                                text: "*<fakeLink.toHotelPage.com|Windsor Court Hotel>*\n★★★★★\n$340 per night\nRated: 9.4 - Excellent",
                            },
                            accessory: {
                                type: "image",
                                image_url:
                    "https://api.slack.com/img/blocks/bkb_template_images/tripAgent_1.png",
                                alt_text: "Windsor Court Hotel thumbnail",
                            },
                        },
                        {
                            type: "context",
                            elements: [
                                {
                                    type: "image",
                                    image_url:
                        "https://api.slack.com/img/blocks/bkb_template_images/tripAgentLocationMarker.png",
                                    alt_text: "Location Pin Icon",
                                },
                                {
                                    type: "plain_text",
                                    emoji: true,
                                    text: "Location: French Quarter",
                                },
                            ],
                        },
                        {
                            type: "actions",
                            elements: [
                                {
                                    type: "button",
                                    text: {
                                        type: "plain_text",
                                        text: "Book Now",
                                        emoji: true,
                                    },
                                    value: "hall_1",
                                    action_id: "actionId-0",
                                },
                            ],
                        },
                        {
                            type: "divider",
                        },
                        {
                            type: "section",
                            text: {
                                type: "mrkdwn",
                                text: "*<fakeLink.toHotelPage.com|The Ritz-Carlton New Orleans>*\n★★★★★\n$340 per night\nRated: 9.1 - Excellent",
                            },
                            accessory: {
                                type: "image",
                                image_url:
                    "https://api.slack.com/img/blocks/bkb_template_images/tripAgent_2.png",
                                alt_text: "Ritz-Carlton New Orleans thumbnail",
                            },
                        },
                        {
                            type: "context",
                            elements: [
                                {
                                    type: "image",
                                    image_url:
                        "https://api.slack.com/img/blocks/bkb_template_images/tripAgentLocationMarker.png",
                                    alt_text: "Location Pin Icon",
                                },
                                {
                                    type: "plain_text",
                                    emoji: true,
                                    text: "Location: French Quarter",
                                },
                            ],
                        },
                        {
                            type: "actions",
                            elements: [
                                {
                                    type: "button",
                                    text: {
                                        type: "plain_text",
                                        text: "Book Now",
                                        emoji: true,
                                    },
                                    value: "hall_2",
                                    action_id: "actionId-0",
                                },
                            ],
                        },
                        {
                            type: "divider",
                        },
                        {
                            type: "section",
                            text: {
                                type: "mrkdwn",
                                text: "*<fakeLink.toHotelPage.com|Omni Royal Orleans Hotel>*\n★★★★★\n$419 per night\nRated: 8.8 - Excellent",
                            },
                            accessory: {
                                type: "image",
                                image_url:
                    "https://api.slack.com/img/blocks/bkb_template_images/tripAgent_3.png",
                                alt_text: "Omni Royal Orleans Hotel thumbnail",
                            },
                        },
                        {
                            type: "context",
                            elements: [
                                {
                                    type: "image",
                                    image_url:
                        "https://api.slack.com/img/blocks/bkb_template_images/tripAgentLocationMarker.png",
                                    alt_text: "Location Pin Icon",
                                },
                                {
                                    type: "plain_text",
                                    emoji: true,
                                    text: "Location: French Quarter",
                                },
                            ],
                        },
                        {
                            type: "actions",
                            elements: [
                                {
                                    type: "button",
                                    text: {
                                        type: "plain_text",
                                        text: "Book Now",
                                        emoji: true,
                                    },
                                    value: "hall_3",
                                    action_id: "actionId-0",
                                },
                            ],
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
        console.log(publish.data);
    }

    if (
        parsedData.actions &&
        parsedData.actions[0] &&
        parsedData.actions[0].value
    ) {
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

    return {
        "response_action": "clear",
    };
};

