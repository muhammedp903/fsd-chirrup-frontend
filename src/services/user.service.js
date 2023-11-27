const login = (username, password) => {
    return fetch(
        "http://localhost:3333/login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password
            })
        })
        .then(response => {
            if(response.status === 200){
                return response.json();
            } else if(response.status === 400){
                throw "Incorrect username or password";
            } else{
                throw "Something went wrong."
            }
        })
        .then(rJson => {
            localStorage.setItem("user_id", rJson.user_id);
            localStorage.setItem("session_token", rJson.session_token);
            return rJson;
        })
        .catch(error => {
            console.log(error);
            return Promise.reject(error);
        });
};

const logout = () => {
    return fetch(
        "http://localhost:3333/logout",
        {
            method: "POST",
            headers: {
                "X-Authorization": localStorage.getItem("session_token")
            },
        })
        .then(response => {
            if(response.status === 200){
                localStorage.removeItem("session_token");
                localStorage.removeItem("user_id");
                return;
            } else if(response.status === 401){
                throw "Not logged in";
            } else{
                throw "Something went wrong."
            }
        })
        .catch(error => {
            console.log(error);
            return Promise.reject(error);
        });
};

const createUser = (user) => {
    return fetch(
        "http://localhost:3333/users",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if(response.status === 201){
                return response.json();
            } else if(response.status === 400){
                throw "Bad request (username taken)";
            } else{
                throw "Something went wrong."
            }
        })
        .then(rJson => {
            return rJson;
        })
        .catch(error => {
            console.log(error);
            return Promise.reject(error);
        });
}

export const userService = {
    login,
    logout,
    createUser,
}