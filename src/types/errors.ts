export class BadRequestError extends Error {
    constructor(public message: string) {
        super(message);
    }
}

export class UnauthorizedError extends Error {
    constructor(public message: string) {
        super(message);
    }
}

export class ForbiddenError extends Error {
    constructor(public message: string) {
        super(message);
    }
}
