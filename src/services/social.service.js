const getUser = (userId) => {
    return fetch(`http://localhost:3333/users/${userId}`)
        .then((response) => {
            if(response.status === 200){
                return response.json();
            } else {
                throw "Something went wrong.";
            }
        })
        .then((resJson) => {
            return resJson;
        })
        .catch((error) => {
            console.log(error);
            return Promise.reject(error);
        });
};

const followUser = (userId) => {
    return fetch(
        `http://localhost:3333/users/${userId}/follow`,
        {
            method: "POST",
            headers: {
                "X-Authorization": localStorage.getItem("session_token")
            },
        })
        .then(response => {
            if(response.status === 200){
                return;
            } else if(response.status === 401){
                throw "Log in to follow this user";
            } else if(response.status === 403){
                throw "You are already following this user";
            } else if(response.status === 404){
                throw "Could not find that user";
            } else{
                throw "Something went wrong."
            }
        })
        .catch(error => {
            console.log(error);
            return Promise.reject(error);
        });
};

const unfollowUser = (userId) => {
    return fetch(
        `http://localhost:3333/users/${userId}/follow`,
        {
            method: "DELETE",
            headers: {
                "X-Authorization": localStorage.getItem("session_token")
            },
        })
        .then(response => {
            if(response.status === 200){
                return;
            } else if(response.status === 401){
                throw "Log in to unfollow this user";
            } else if(response.status === 403){
                throw "You are not following this user";
            } else if(response.status === 404){
                throw "Could not find that user";
            } else{
                throw "Something went wrong."
            }
        })
        .catch(error => {
            console.log(error);
            return Promise.reject(error);
        });
};

const searchUsers = (searchQ) => {
    return fetch(`http://localhost:3333/search?q=${searchQ}`)
        .then((response) => {
            if(response.status === 200){
                return response.json();
            } else if(response.status === 400){
                throw "Bad request";
            } else {
                throw "Something went wrong.";
            }
        })
        .then((resJson) => {
            return resJson;
        })
        .catch((error) => {
            console.log(error);
            return Promise.reject(error);
        });
}

export const socialService = {
    getUser,
    followUser,
    unfollowUser,
    searchUsers
}