const getFeed = () => {
    return fetch(
        "http://localhost:3333/feed",
        {
            method: "GET",
            headers: {
                "X-Authorization": localStorage.getItem("session_token")
            }
        })
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

const getSinglePost = (postId) => {
    return fetch(`http://localhost:3333/posts/${postId}`)
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

const newPost = (text) => {
    return fetch(
        "http://localhost:3333/posts",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("session_token")
            },
            body: JSON.stringify({
                "text": text
            })
        })
        .then(response => {
            if(response.status === 201){
                return response.json();
            } else if(response.status === 400){
                throw "Bad request";
            } else if(response.status === 401){
                throw "Unauthorised";
            } else {
                throw "Something went wrong";
            }
        })
        .then(resJson => {
            return resJson;
        })
        .catch(error => {
            console.log(error);
            return Promise.reject(error);
        });
};

const editPost = (postId, text) => {
    return fetch(
        `http://localhost:3333/posts/${postId}`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "X-Authorization": localStorage.getItem("session_token")
            },
            body: JSON.stringify({
                "text": text
            })
        })
        .then(response => {
            if(response.status === 200){
                return;
            } else if(response.status === 400){
                throw "Bad request";
            } else if(response.status === 401){
                throw "Unauthorised";
            } else if(response.status === 403){
                throw "Forbidden";
            } else {
                throw "Something went wrong";
            }
        })
        .then(resJson => {
            return resJson;
        })
        .catch(error => {
            console.log(error);
            return Promise.reject(error);
        });
};

const likePost = (postId) => {
    return fetch(
        `http://localhost:3333/posts/${postId}/like`,
        {
            method: "POST",
            headers: {
                "X-Authorization": localStorage.getItem("session_token")
            }
        })
        .then(response => {
            if(response.status === 200){
                return;
            } else if(response.status === 401){
                throw "Unauthorised";
            } else if(response.status === 403){
                throw "You have already liked this post";
            } else if(response.status === 404){
                throw "Not found";
            } else{
                throw "Something went wrong."
            }
        })
        .catch(error => {
            console.log(error);
            return Promise.reject(error);
        });
};

const unlikePost = (postId) => {
    return fetch(
        `http://localhost:3333/posts/${postId}/like`,
        {
            method: "DELETE",
            headers: {
                "X-Authorization": localStorage.getItem("session_token")
            }
        })
        .then(response => {
            if(response.status === 200){
                return;
            } else if(response.status === 401){
                throw "Unauthorised";
            } else if(response.status === 403){
                throw "You have not liked this post";
            } else if(response.status === 404){
                throw "Not found";
            } else{
                throw "Something went wrong."
            }
        })
        .catch(error => {
            console.log(error);
            return Promise.reject(error);
        });
};

const deletePost = (postId) => {
    return fetch(
        `http://localhost:3333/posts/${postId}`,
        {
            method: "DELETE",
            headers: {
                "X-Authorization": localStorage.getItem("session_token")
            }
        })
        .then(response => {
            if(response.status === 200){
                return;
            } else if(response.status === 401){
                throw "Unauthorised";
            } else if(response.status === 403){
                throw "Forbidden";
            } else if(response.status === 404){
                throw "Not found";
            } else{
                throw "Something went wrong."
            }
        })
        .catch(error => {
            console.log(error);
            return Promise.reject(error);
        });

}

export const postService = {
    getFeed,
    getSinglePost,
    newPost,
    editPost,
    likePost,
    unlikePost,
    deletePost,
}