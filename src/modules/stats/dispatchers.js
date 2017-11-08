import Actions from './actions';

const getMessagesCount = () => {
  return {
    type: Actions.GetMessagesCount
  };
};

export { getMessagesCount };