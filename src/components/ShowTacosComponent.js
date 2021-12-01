import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  FlatList,
  Image,
  Button,
  NativeModules,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {initAction} from '../action/actionType';

class ShowTacosComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataLoaded: false,
      catData: [],
      refreshing: true,
    };
  }

  componentDidMount() {
    this.props.initAction();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.ingredients) {
      return {
        refreshing: false,
        isDataLoaded: true,
        catData: nextProps.ingredients,
      };
    }
    return false;
  }

  renderCatsItem = data => {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: data.item.url}} />
      </View>
    );
  };

  itemSeperator = () => {
    <View
      style={{
        height: 2,
        backgroundColor: 'rgba(0,0,0,0.5)',
        marginLeft: 10,
        marginRight: 10,
      }}
    />;
  };

  handleRefresh = () => {
    this.setState({refreshing: true}, () => this.props.initAction());
  };

  callToNativeModule = () => {
    NativeModules.Bulb.turnOff();
    this.updateStatus();
  };

  updateStatus = () => {
    NativeModules.Bulb.getStatus((error, isOn) => {
      console.log('Message From Ios: ', isOn);
    });
  };

  render() {
    const {catData} = this.state;
    console.log('inside render catData: ', catData);
    return (
      <SafeAreaView testID="catsListView">
        <View>
          <Button title="Click Here" onPress={this.callToNativeModule} />
        </View>
        <FlatList
          data={catData.ingredients}
          renderItem={item => this.renderCatsItem(item)}
          keyExtractor={item => item.id.toString()}
          ItemSeparatorComponent={this.itemSeperator()}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    margin: 10,
    backgroundColor: '#FFF',
    borderRadius: 6,
  },
  image: {
    height: '100%',
    borderRadius: 4,
  },
});

const mapStateToProps = state => ({
  ingredients: state.showTacosReducer,
});
const mapDispatchToProps = dispatch =>
  bindActionCreators({initAction}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ShowTacosComponent);
