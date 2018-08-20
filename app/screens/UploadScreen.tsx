import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { screenStyles } from './screenStyles';


export class UploadScreen extends Component<{}, {}> {

    static navigationOptions = {
        title: 'Upload Receipt',
    };

    constructor(props: any) {
        super(props);
    }

    render() {
        const itemId = this.props.navigation.getParam('itemId', 'NO-ID');
        var sample = require('../sampleReceipt.json');

        return (
            <View style={screenStyles.default}>
                <Text>ItemId: { JSON.stringify(itemId) }</Text>
                <Text>This is where a user would upload an image.</Text>
                <Button
                    title="Next"
                    onPress={() => this.props.navigation.navigate('ReceiptInfo', { 'receiptData': sample }) }
                />
            </View>
        )
    }

}