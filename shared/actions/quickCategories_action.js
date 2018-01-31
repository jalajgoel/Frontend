import variables from '../../variables';

export const QUICK = 'QUICK';

// sending received quickcategories response to reducer
function quickCategories_Success(res) {
  return {
    type: QUICK,
    payload: res,
  };
}

// to handle error
function quickCategories_Error(err) {
  return {
    type: ERROR,
    payload: err,
  };
}

// sending request to backend for quickcategories
export function getQuickCategories_Data() {
  return (dispatch, state) =>
    fetch(`${variables.url.liveURL}/api/categories`, {
      method: 'get',
    })
      .then(res => res.json())
      .then((res) => {
        if (typeof res === 'object') {
          const quickData = res.categories;
          return dispatch(quickCategories_Success(quickData));
        }
        return dispatch(quickCategories_Error(res));
      })
      .catch(error => dispatch(quickCategories_Error(error)));
}
