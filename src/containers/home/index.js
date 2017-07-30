import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import firebase from 'firebase';
import database from '../../firebase/firebase-db';
import getAnalysis from '../../modules/analysis/dispatchers';
import { Home } from './components/home';

const mapStateToProps = state => ({
  analysis: state.analysis
});

// The getAnalysisDispatcher must be configured with the
// firebase database instance.
const getAnalysisDispatcher = getAnalysis(database(firebase));

const mapDispatchToProps = dispatch => bindActionCreators({
  getAnalysis: getAnalysisDispatcher,
  changePage: () => push('/about-us')
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);