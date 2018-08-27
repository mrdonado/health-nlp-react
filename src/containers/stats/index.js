import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Stats from './components/stats';
import {
  fetchMessagesCount,
  fetchProblemsList,
  fetchSolutionsToProblem,
  fetchWordSearch,
  fetchMessagesForProblemSolution,
  resetStats
} from '../../modules/stats/dispatchers';

const mapStateToProps = state => ({
  stats: state.stats
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    fetchMessagesCount,
    fetchProblemsList,
    fetchSolutionsToProblem,
    fetchWordSearch,
    fetchMessagesForProblemSolution,
    resetStats
  }, dispatch);
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stats);