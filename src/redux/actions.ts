import { Dispatch } from 'redux'
import {
  FETCH_SEARCH_RESULTS,
  FETCH_SEARCH_RESULTS_FULFILLED,
  FETCH_SEARCH_RESULTS_FAILED,
  SET_DETAIL_ITEM
} from './actionTypes'

export const fetchSearchResultsFulfilled = (payload: any) => {
  return {
    type: FETCH_SEARCH_RESULTS_FULFILLED,
    payload
  }
}

export const fetchSearchResultsFailed = (payload: Error) => {
  return {
    type: FETCH_SEARCH_RESULTS_FAILED,
    payload
  }
}

export const fetchSearchResults = (searchTerm: string) => async (
  dispatch: Dispatch
) => {
  dispatch({ type: FETCH_SEARCH_RESULTS })
  await fetch(`https://api.github.com/search/repositories?q=${searchTerm}`, {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github.v3+json'
    }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network Error')
      }
      return response.json()
    })
    .then((data) => {
      return dispatch(fetchSearchResultsFulfilled(data.items))
    })
    .catch((err) => {
      return dispatch(fetchSearchResultsFailed(err.message))
    })
}

export const setDetailItem = (item: any) => {
  return {
    type: SET_DETAIL_ITEM,
    payload: item
  }
}
