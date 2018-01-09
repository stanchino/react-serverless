const subject = () => (require("../signOut").default);

const mockFactory = (method, result) => ({
    CognitoUserPool: jest.fn(() => ({
        getCurrentUser: jest.fn(() => ({
            globalSignOut: callback => callback[method](result)
        }))
    }))
});

const handlesResponse = (method, result, exected_method) => {
    const mocks = mockFactory(method, result);
    jest.doMock("amazon-cognito-identity-js", () => (mocks));

    expect(subject()())[exected_method].toEqual(result);
}

describe("test signOutRequest", () => {
    beforeEach(() => {
        jest.resetModules();
    });

    it ('when the response is successful', () => handlesResponse('onSuccess', 'success', 'resolves'));
    it ('when the response is an error', () =>  handlesResponse('onFailure', 'error', 'rejects'));
});