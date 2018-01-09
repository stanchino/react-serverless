import { userPool } from "./utils";

const currentUser = userPool.getCurrentUser();

export default () => (
    new Promise((resolve, reject) => {
        currentUser.globalSignOut({
            onSuccess: result => resolve(result),
            onFailure: error => reject(error)
        });
    })
);