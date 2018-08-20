import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Overview } from '../api/Overview';
import { InfoForm } from '../components/InfoForm';
import { screenStyles } from './screenStyles';


export class ReceiptInfoScreen extends Component<{}, {}> {

    static navigationOptions = {
        title: 'New Receipt',
    };

    constructor(props: any) {
        super(props);
    }

    render() {
        let nav = this.props.navigation;
        var overview = new Overview(nav.getParam('receiptData', "INVALID"));

        return (
            <View style={ [screenStyles.default, styles.container] }>
                <Text>Here's what we found:</Text>
                <InfoForm data={ overview } />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    }
})