import {
  FETCH_SEARCH_RESULTS_FULFILLED,
  FETCH_SEARCH_RESULTS,
  FETCH_SEARCH_RESULTS_FAILED,
  SET_DETAIL_ITEM
} from './actionTypes'

export const initialState = {
  isLoading: false,
  searchList: [],
  error: null,
  detailItem: null
}

export default function (state = initialState, action: any): any {
  switch (action.type) {
    case FETCH_SEARCH_RESULTS: {
      return {
        ...state,
        isLoading: true
      }
    }
    case FETCH_SEARCH_RESULTS_FULFILLED: {
      return {
        isLoading: false,
        searchList: action.payload
      }
    }
    case FETCH_SEARCH_RESULTS_FAILED: {
      return {
        isLoading: false,
        error: { message: action.payload }
      }
    }
    case SET_DETAIL_ITEM: {
      return {
        ...state,
        detailItem: action.payload
      }
    }
    default:
      return state
  }
}
