import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getAnalysis } from '../../modules/analysis';
import { Home } from './components/home';

const mapStateToProps = state => ({
  analysis: state.analysis
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAnalysis,
  changePage: () => push('/about-us')
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);