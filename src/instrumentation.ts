import { tmpImagesCron } from "./lib/images/cron";

export function register() {
    // process.env?.INSTANCE_ID - use this to identify the instance and run cron jobs only on one of them

    tmpImagesCron.start();

    console.log(
        "Tmp images cron job started. Next invocation:",
        tmpImagesCron.nextDate().toISO(),
    );
}
