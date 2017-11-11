import Actions from './actions';

const statsReducer = (stats = {}, action) => {
  switch (action.type) {
    case Actions.SetMessagesCount:
      return Object.assign({}, stats, { count: action.count });
    case Actions.IncrementMessagesCount:
      return Object.assign({}, stats, { count: stats.count + 1 });
    default:
      return stats;
  }
};

export { statsReducer };