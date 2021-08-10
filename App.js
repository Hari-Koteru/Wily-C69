import React,{Component} from 'react';
import {StyleSheet,Text,View} from 'react-native';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createAppContainer} from 'react-navigation';
import TransactionScreen from './screens/BookTransactionScreen';
import SearchScreen from './screens/SearchScreen';

export default class App extends Component{
  render(){
    return(
      <AppContainer></AppContainer>
    )
  }
}
const tabNavigator = createBottomTabNavigator({
  Transaction : {screen: TransactionScreen},
  Search : {screen: SearchScreen},
})
const AppContainer = createAppContainer(tabNavigator);

const styles = StyleSheet.create({
  container : {
    flex : 1,
    backgroundColor : 'red',
    justifyContent : 'center',
    alignItems : 'center'}
}) 