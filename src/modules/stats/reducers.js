import Actions from './actions';

const statsReducer = (stats = {}, action) => {
  switch (action.type) {
    case Actions.SetMessagesCount:
      return Object.assign({}, stats, { count: action.count });
      break;
    default:
      return stats;
  }
};

export { statsReducer };