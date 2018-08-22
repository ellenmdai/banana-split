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

        this.onNext = this.onNext.bind(this);
    }

    render() {
        let nav = this.props.navigation;
        var overview = new Overview(nav.getParam('receiptData', "INVALID"));

        return (
            <View style={ [screenStyles.default, styles.container] }>
                <Text style={ styles.textHeader } >Here's what we found:</Text>
                <InfoForm data={ overview } submitHandler={ this.onNext } />
            </View>
        )
    }

    // own method so can be passed as param to InfoForm 
    // CHECK
    private onNext(overview: Overview) {
        console.log(overview.date);
        console.log(overview.merchantName);
        console.log(overview.totalAmount);
        console.log(overview.taxAmount);
        console.log(overview.participants);
        console.log(overview.purchaser);

        this.props.navigation.navigate('ItemsList', { 'overview': overview })
    }

}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textHeader: {
        fontSize: 30,
        fontWeight: 'bold'
    }
})