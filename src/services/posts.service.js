const getFeed = () => {
    return fetch("http://localhost:3333/feed")
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

export const postService = {
    getFeed,
    getSinglePost
}