import { tmpImagesCron } from "./lib/images/cron";

export function register() {
    tmpImagesCron.start();

    console.log(
        "Tmp images cron job started. Next invocation:",
        tmpImagesCron.nextDate().toISO(),
    );
}
