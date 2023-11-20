const login = () => {
    return fetch("http://localhost:3333/login")
        .then((response) => {
            if(response.status === 200){
                return response.json();
            } else {
                throw "Something went wrong";
            }
        })
        .then((resJson) => {
            return resJson;
        })
        .catch((error) => {
            console.log(error);
            return Promise.reject(error);
        })
};

const getUser = (userId) => {
    return fetch(`http://localhost:3333/users/${userId}`)
        .then((response) => {
            if(response.status === 200){
                return response.json();
            } else {
                throw "Something went wrong";
            }
        })
        .then((resJson) => {
            return resJson;
        })
        .catch((error) => {
            console.log(error);
            return Promise.reject(error);
        })
};

export const userService = {
    login,
    getUser,
}