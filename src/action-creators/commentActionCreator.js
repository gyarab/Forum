//FETCH ACTIONS
//Fetch a page of posts from a specific forum
import {url} from "./url";

export const fetchComments = (postId, postPage) => dispatch => {
    fetch(url+'/comments/' + postId + '/post', {
        headers: {
            'Authorization': localStorage.getItem('auth')
        },
    })
        .then(response => response.json())
        .then(comments =>
            dispatch({
                type: 'FETCH_COMMENTS',
                payload: comments
            })
        ).catch(e => {
        dispatch({
            type: 'FETCH_COMMENTS',
            payload: ""
        })
    });
};

export const createComment = (comment, postId) => dispatch => {
    fetch(url+'/comments/create/' + postId, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'Authorization': localStorage.getItem('auth')
        },
        body: JSON.stringify(comment)
    }).then(response=>response.json())
        .then(res => dispatch({
        type:'CREATE_COMMENT',
        payload:res
    }))
};

//PUT ACTIONS
//Like/Dislike a comment.
export const updateComment = (attitude, commentId) => dispatch => {
    fetch(url+'/comments/update/' + attitude + '/' + commentId, {
        method: 'PUT',
        headers: {
            'Authorization': localStorage.getItem('auth')
        },
    }).then(res => res.json()).then(res => {
        dispatch({
            type: 'COMMENT_UPDATE',
            payload: res
        })
    })
};

//DELETE ACTIONS
//Delete a comment.
export const deleteComment = (commentId) => dispatch =>{
    fetch(url + '/comments/delete/' + commentId, {
        method: 'DELETE',
        headers: {
            'Authorization': localStorage.getItem('auth')
        },
    }).then(() => dispatch({
        type: 'DELETE_COMMENT',
        payload: commentId
    }))
};