// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Stats from './components/stats';

const mapStateToProps = state => ({
  stats: state.stats,
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Stats);