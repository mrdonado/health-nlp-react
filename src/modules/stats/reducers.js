import Actions from './actions';
const IRRELEVANT_KEYWORDS = [
  'a',
  'the',
  'this',
  'these',
  'other',
  'new',
  'first',
  'others'
];
const keyWordsFilter = (list) => {
  return list
    .filter(e => {
      console.log('.');
      return (e.key.length > 2) &&
        (IRRELEVANT_KEYWORDS.indexOf(e.key) === -1);
    });
};

const statsReducer = (stats = {}, action) => {
  let pendingRequests = [...(stats.pendingRequests || [])];
  switch (action.type) {
    case Actions.SetMessagesCount:
      return Object.assign({}, stats, { count: action.count });
    case Actions.SetProblemsList:
      return Object.assign({}, stats, {
        problems: keyWordsFilter(action.problems)
      });
    case Actions.IncrementMessagesCount:
      return Object.assign({}, stats, { count: stats.count + 1 });
    case Actions.SetSolutionsList:
      return Object.assign({}, stats, {
        solutions: keyWordsFilter(action.solutions)
      });
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