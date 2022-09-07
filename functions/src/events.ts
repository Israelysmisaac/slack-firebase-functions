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

