import { tmpImagesCron } from "./lib/images/cron";
import { env } from "./env";

export function register() {
    // Only start in dev or prod, but first instance
    if (env.INSTANCE_ID === undefined || env.INSTANCE_ID === "0") {
        tmpImagesCron.start();

        console.log(
            "Tmp images clean up cron job started. Next invocation:",
            tmpImagesCron.nextDate().toISO(),
        );
    }
}
