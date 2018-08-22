import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { screenStyles } from './screenStyles';
import { Overview } from '../api/Overview';

interface ItemsScreenProps {
    overview: Overview
}


export class ItemsScreen extends Component<ItemsScreenProps, {}> {

    static navigationOptions = {
        title: 'Edit Items',
    };

    constructor(props: ItemsScreenProps) {
        super(props);
    }

    render() {
        const overview = this.props.navigation.getParam('overview', 'NO-OVERVIEW');

        return (
            <View style={screenStyles.default}>
                <Text>{ overview.merchantName }</Text>
            </View>
        )
    }

}