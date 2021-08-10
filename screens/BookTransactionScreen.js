import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class TransactionScreen extends Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null, //This will tell if the user has granted camera permission to the application
      scanned: false, //This will tell if the scanning has completedor not.
      scannedData: '', //This will hold the scanned data that we get after scanning.
      buttonState: 'normal', //keeps track if the button has been clicked.
    }
  }

  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);


    this.setState({
      /*status === "granted" is true when user has granted permission
        status === "granted" is false when user has not granted the permission
      */
      hasCameraPermissions: status === "granted",
      buttonState: 'clicked',
    });
  }

  //called when the scan is completed
  //This function automatically receives the type of barcodescanned and the data insidethe barcode. 
  //We can set thescannedData here to be equal to the data received after scanning.
  //Once the scan has beenc ompleted, we also want to set thescanned state to true. 
  //We also want to change state forthe button to make it back to normal when the scan is completed.
  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal'
    });
  }

  render() {
    const hasCameraPermissions = this.state.hasCameraPermissions;
    const scanned = this.state.scanned;
    const buttonState = this.state.buttonState;

    if (buttonState === "clicked" && hasCameraPermissions) {
      return (
        //The BarCodeScannercomponent automatically starts scanning usingthe Camera. 
        //It has a prop calledonBarCodeScanned which can call a function to handle data received after scanning. 
        //We want to call this function only when scanned is false.
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      );
    }

    else if (buttonState === "normal") {
      return (
        <View style={styles.container}>

          <Text style={styles.displayText}>{
            hasCameraPermissions === true ? this.state.scannedData : "Request Camera Permission"
          }</Text>

          <TouchableOpacity
            onPress={this.getCameraPermissions}
            style={styles.scanButton}>
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  displayText: {
    fontSize: 15,
    textDecorationLine: 'underline'
  },
  scanButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 10,
  }
})