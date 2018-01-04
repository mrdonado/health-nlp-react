import Actions from './actions';

const setMessagesCount = (count) => {
  return {
    count,
    type: Actions.SetMessagesCount
  }
};

const setProblemsList = (problems) => {
  return {
    problems,
    type: Actions.SetProblemsList
  };
};

const setSolutionsList = (solutions) => {
  return {
    solutions,
    type: Actions.SetSolutionsList
  };
};

const setMessagesList = (messages) => {
  return {
    messages,
    type: Actions.SetMessagesList
  };
};

const fetchMessagesCount = () => dispatch => {
  fetch(process.env.REACT_APP_STATS_BASE_URL)
    .then(response => response.json())
    .then(data => {
      dispatch(setMessagesCount(data['messages-count']));
    });
};

const fetchProblemsList = () => dispatch => {
  fetch(`${process.env.REACT_APP_STATS_BASE_URL}/problems`)
    .then(response => response.json())
    .then(problems => {
      dispatch(setProblemsList(problems));
    });
};

const fetchSolutionsToProblem = (problem) => dispatch => {
  fetch(`${process.env.REACT_APP_STATS_BASE_URL}/solutions/${problem}`)
    .then(response => response.json())
    .then(solutions => {
      dispatch(setSolutionsList(solutions));
    });
};

const fetchWordSearch = (word) => dispatch => {
  fetch(`${process.env.REACT_APP_STATS_BASE_URL}/messages/search/${word}`)
    .then(response => response.json())
    .then(messages => {
      dispatch(setMessagesList(messages));
    });
};

export {
  fetchMessagesCount,
  fetchProblemsList,
  fetchSolutionsToProblem,
  fetchWordSearch,
  setMessagesCount
};