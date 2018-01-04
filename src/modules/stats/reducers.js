import Actions from './actions';

const statsReducer = (stats = {}, action) => {
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
    default:
      return stats;
  }
};

export { statsReducer };