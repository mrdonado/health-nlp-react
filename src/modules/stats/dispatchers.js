import Actions from './actions';

const setMessagesCount = (count) => {
  return {
    count,
    type: Actions.SetMessagesCount
  }
};

const fetchMessagesCount = () => dispatch => {
  //fetch('https://health-nlp.stats.jdonado.com/')
  fetch('http://localhost:7009')
    .then(data => {
      dispatch(setMessagesCount(data['messages-count']));
    });
};

export { fetchMessagesCount, setMessagesCount };