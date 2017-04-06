
export default {
    login: (credentials) => {
        return new Promise((resolve) => { return resolve(); });
        // return fetch('//localhost:3000/user/authenticate', {
        //     method: 'POST',
        //     body: JSON.stringify(credentials),
        // }).then();
    }
}