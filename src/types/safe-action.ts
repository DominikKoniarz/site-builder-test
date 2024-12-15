export type ActionError = {
    error: {
        serverError?: string | undefined;
        validationErrors?:
            | {
                  formErrors: string[];
                  fieldErrors: {
                      [key: string]: string[] | undefined;
                  };
              }
            | undefined;
        bindArgsValidationErrors?: readonly [] | undefined;
    };
    input: unknown;
};

export type ActionErrorHandler = {
    serverError: () => ActionErrorHandler;
    validationErrors: () => ActionErrorHandler;
};
