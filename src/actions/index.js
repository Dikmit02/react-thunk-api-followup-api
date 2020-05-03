import jsonPlaceholder from '../apis/jsonPlaceholder'
import _ from 'lodash'

export const fetchPostAndUsers = () => async (dispatch, getState) => {
    // console.log('About to fetch post');
    await dispatch(fetchPosts())
    // const userIds = _.uniq(_map(getState().posts, 'userId'))
    // userIds.forEach(id => dispatch(fetchUser(id)))

    // above two line same as chaining wala 
    _.chain(getState().posts)
        .map('userId')
        .uniq()
        .forEach(id => dispatch(fetchUser(id)))
        .value()
    // console.log('fetched posts!')
}

//ERROR::
//Action must be plain objects
//use middleware
// export const fetchPosts=async ()=>{
//     //BAD APPROACH !!!!!!!!!

//     const response =await jsonPlaceholder.get('/posts');

//     return {
//         type:'FETCH_POSTS'
//     }
// }

//whnever we are calling an action creator we are going to declare everytie a 
// new function 
// starting fro second return keyword everytie in memory whenever the fetchzUser action creator is called

export const fetchPosts = () => async dispatch => {
    const response = await jsonPlaceholder.get('/posts')
    //returning the entire response
    // dispatch({type:'FETCH_POSTS',payload:response})

    // want only data from respnse
    dispatch({ type: 'FETCH_POSTS', payload: response.data })


}

//fetch the detail for single user with a given id
// export const fetchUser=(id)=>async dispatch=>{
//     const response=await jsonPlaceholder.get(`/users/${id}`)
//     dispatch({type:'FETCH_USER',payload:response.data})
// }

// for fetching a singleuser for a single time nas storing inside memoizaion

export const fetchUser = id => dispatch => _fetchUser(id, dispatch);
const _fetchUser = _.memoize(async (id, dispatch) => {
    const response = await jsonPlaceholder.get(`users/${id}`);
    dispatch({ type: 'FETCH_USER', payload: response.data })
})






















