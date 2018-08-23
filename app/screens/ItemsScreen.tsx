import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { screenStyles } from './screenStyles';
import { ReceiptOverview } from '../api/ReceiptOverview';

interface ItemsScreenProps {
    overview: ReceiptOverview
}


export class ItemsScreen extends Component<ItemsScreenProps, {}> {

    static navigationOptions = {
        title: 'Edit Items',
    };

    constructor(props: ItemsScreenProps) {
        super(props);
    }

    render() {
        const overview = this.props.navigation.getParam('receiptOverview', 'NO-OVERVIEW');

        return (
            <View style={screenStyles.default}>
                <Text>{ overview.totalAmount }</Text>
                <Text>{ this.props.navigation.getParam('participants', "INVALID-PARTICIPANTS") }</Text>
            </View>
        )
    }

}