import Actions from './actions';
import './constants';
import C from './constants';

const addPendingRequest = requestName => ({
  requestName,
  type: Actions.AddPendingRequest
});

const removePendingRequest = requestName => ({
  requestName,
  type: Actions.RemovePendingRequest
});

const setMessagesCount = count => {
  return {
    count,
    type: Actions.SetMessagesCount
  }
};

const setProblemsList = problems => {
  return {
    problems,
    type: Actions.SetProblemsList
  };
};

const setProblem = problem => {
  return {
    problem,
    type: Actions.SetProblem
  };
};

const setSolution = solution => {
  return {
    solution,
    type: Actions.SetSolution
  };
};


const setSolutionsList = solutions => {
  return {
    solutions,
    type: Actions.SetSolutionsList
  };
};

const setMessagesList = messages => {
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
  fetch(`${process.env.REACT_APP_STATS_BASE_URL}/problems/`)
    .then(response => response.json())
    .then(problems => {
      dispatch(setProblemsList(problems));
    });
};

const fetchSolutionsToProblem = problem => dispatch => {
  dispatch(setProblem(problem));
  fetch(`${process.env.REACT_APP_STATS_BASE_URL}/solutions/${problem}/`)
    .then(response => response.json(),
    () => { setSolutionsList([]) })
    .then(solutions => {
      dispatch(setSolutionsList(solutions));
    });
};

const fetchWordSearch = word => dispatch => {
  dispatch(addPendingRequest(C.requestTypes.wordSearch));
  fetch(`${process.env.REACT_APP_STATS_BASE_URL}/messages/search/${word}/`)
    .then(response => response.json())
    .then(messages => {
      dispatch(removePendingRequest(C.requestTypes.wordSearch));
      dispatch(setMessagesList(messages));
    });
};

const fetchMessagesForProblemSolution = (problem, solution) => dispatch => {
  dispatch(setSolution(solution));
  fetch(`${process.env.REACT_APP_STATS_BASE_URL}/messages/match/${problem}/${solution}/`)
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
  fetchMessagesForProblemSolution,
  setMessagesCount
};