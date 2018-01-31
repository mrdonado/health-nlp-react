import Actions from './actions';

const statsReducer = (stats = {}, action) => {
  let pendingRequests = [...(stats.pendingRequests || [])];
  switch (action.type) {
    case Actions.SetMessagesCount:
      return Object.assign({}, stats, { count: action.count });
    case Actions.SetProblemsList:
      return Object.assign({}, stats, { problems: action.problems });
    case Actions.IncrementMessagesCount:
      return Object.assign({}, stats, { count: stats.count + 1 });
    case Actions.SetSolutionsList:
      return Object.assign({}, stats, { solutions: action.solutions });
    case Actions.SetMessagesList:
      return Object.assign({}, stats, { messages: action.messages });
    case Actions.SetProblem:
      return Object.assign({}, stats, { problem: action.problem });
    case Actions.SetSolution:
      return Object.assign({}, stats, { solution: action.solution });
    case Actions.AddPendingRequest:
      // TODO: Refactor :22 and :26 with lodash for improved readability
      if (pendingRequests.indexOf(action.requestName) === -1) {
        pendingRequests.push(action.requestName);
      }
      return Object.assign({}, stats, { pendingRequests });
    case Actions.RemovePendingRequest:
      if (pendingRequests.indexOf(action.requestName) > -1) {
        pendingRequests.pop(action.requestName);
      }
      return Object.assign({}, stats, { pendingRequests });
    default:
      return stats;
  }
};

export { statsReducer };