/* eslint-disable max-len */
import {config} from "./config/config";
import axios from "axios";
import {Request} from "./types";

export const events = async (request: Request) => {
    const eventType = request.event.type;
    switch (eventType) {
    case "app_home_opened":
        console.log("home open");
        // eslint-disable-next-line no-case-declarations
        await axios.post("https://slack.com/api/views.publish", {
            // Use the user ID associated with the event
            user_id: request.event.user,
            view: {
                /* Home tabs must be enabled in your app configuration
                page under "App Home" */
                type: "home",
                blocks: [
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
                                action_id: "actionId-1",
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
                                action_id: "actionId-2",
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
                                action_id: "actionId-3",
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
        return {message: "Done"};
        break;
    default:
        return "hello";
        break;
    }
};

