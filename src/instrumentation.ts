import { env } from "./env";
import { tmpImagesCron } from "./lib/images/cron";

export function register() {
    console.log(env.INSTANCE_ID, process.env.INSTANCE_ID);
    // Only start in dev or prod, but first instance
    if (env.INSTANCE_ID === undefined || env.INSTANCE_ID === "0")
        tmpImagesCron.start();

    console.log(
        "Tmp images cron job started. Next invocation:",
        tmpImagesCron.nextDate().toISO(),
    );
}
