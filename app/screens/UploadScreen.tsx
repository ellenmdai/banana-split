import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';


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
            <View style={styles.container}>
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})