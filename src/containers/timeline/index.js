import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import database from '../../firebase/firebase-db';
import { analysisDispatchers, swapForm, postAnalysis } from '../../modules/analysis/dispatchers';
import { Timeline } from './components/timeline';

// The analysis dispatchers must be configured with the
// firebase database instance.
const { getResults, moreResults, watchAnalysisAddedEvent } = analysisDispatchers(database(firebase));

const mapStateToProps = state => ({
  analysis: state.analysis,
  formWindow: state.formWindow
});

const mapDispatchToProps = dispatch => {

  watchAnalysisAddedEvent(dispatch);

  return bindActionCreators({
    swapForm,
    getResults,
    moreResults,
    postAnalysis: postAnalysis(fetch)(dispatch),
    changePage: () => push('/about-us')
  }, dispatch)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);