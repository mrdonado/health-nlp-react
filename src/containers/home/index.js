// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Home from './components/home';

const mapStateToProps = state => ({
  home: state.home,
});

const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);