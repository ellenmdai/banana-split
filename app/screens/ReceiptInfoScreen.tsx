import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Overview } from '../api/Overview';


export class ReceiptInfoScreen extends Component<{}, {}> {

    static navigationOptions = {
        title: 'New Receipt',
    };

    constructor(props: any) {
        super(props);
    }

    render() {
        let nav = this.props.navigation;
        // const totalAmount = nav.getParam('totalAmount', 'NOT FOUND');
        var overview = new Overview(nav.getParam('receiptData', "INVALID"));

        return (
            <View style={styles.container}>
                <Text>Here's what we found:</Text>
                <Text>{ overview.date.toDateString() }</Text>
                <Text>{ overview.merchantName }</Text>
                <Text>{ overview.totalAmount }</Text>
                <Text>{ overview.taxAmount }</Text>
                <Text>{ overview.participants.toString() }</Text>
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