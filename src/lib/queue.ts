type Task = Promise<void> | void;

export class Queue {
    private tasks: Task[] = [];
    private isProcessing: boolean = false;
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    addTask(task: Task) {
        this.tasks.push(task);
    }

    addTasks(tasks: Task[]) {
        this.tasks.push(...tasks);
    }

    start() {
        this.processTasks();
    }

    getQueueLength() {
        return this.tasks.length;
    }

    private async processTasks() {
        if (this.isProcessing || this.tasks.length === 0) return;

        this.isProcessing = true;

        while (this.tasks.length > 0) {
            const task = this.tasks.shift();
            if (!task) break;

            try {
                if (task instanceof Promise) {
                    await task;
                }
            } catch (err) {
                console.error(
                    `Error processing task in queue ${this.name}:`,
                    err,
                );
            }
        }

        this.isProcessing = false;
    }
}
