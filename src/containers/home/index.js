import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import database from '../../firebase/firebase-db';
import analysisDispatchers from '../../modules/analysis/dispatchers';
import { Home } from './components/home';

// The analysis dispatchers must be configured with the
// firebase database instance.
const { getResults, moreResults, watchAnalysisAddedEvent } = analysisDispatchers(database(firebase));

const mapStateToProps = state => ({
  analysis: state.analysis
});

const mapDispatchToProps = dispatch => {

  watchAnalysisAddedEvent(dispatch);

  return bindActionCreators({
    getResults,
    moreResults,
    changePage: () => push('/about-us')
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);