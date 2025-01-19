import { env } from "./env";
import { tmpImagesCron } from "./lib/images/cron";

export function register() {
    console.log(env.INSTANCE_ID, process.env.INSTANCE_ID);
    if (!env.INSTANCE_ID || env.INSTANCE_ID === 1) tmpImagesCron.start();

    console.log(
        "Tmp images cron job started. Next invocation:",
        tmpImagesCron.nextDate().toISO(),
    );
}
