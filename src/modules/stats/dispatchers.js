import Actions from './actions';

const setMessagesCount = (count) => {
  return {
    count,
    type: Actions.SetMessagesCount
  }
};

const fetchMessagesCount = () => dispatch => {
  fetch(process.env.REACT_APP_STATS_BASE_URL)
    .then(response => response.json())
    .then(data => {
      dispatch(setMessagesCount(data['messages-count']));
    });
};

export { fetchMessagesCount, setMessagesCount };