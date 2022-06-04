import { Form } from 'react-bootstrap';
import * as actionTypes from "./actionTypes"

export function addForm(article: IForm) {
  const action: FormAction = {
    type: actionTypes.ADD_FORM,
    article,
  }

  return simulateHttpRequest(action)
}

export function removeArticle(article: IForm) {
  const action: FormAction = {
    type: actionTypes.REMOVE_FORM,
    article,
  }
  return simulateHttpRequest(action)
}

export function simulateHttpRequest(action: FormAction) {
  return (dispatch: DispatchType) => {
    setTimeout(() => {
      dispatch(action)
    }, 500)
  }
}