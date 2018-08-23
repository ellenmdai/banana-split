import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { ReceiptOverview } from '../api/ReceiptOverview';
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
        var receiptOverview = nav.getParam('receiptOverview', "INVALID");
        var initialParticipants = nav.getParam('participants', "INVALID");

        return (
            <View style={ [screenStyles.default, styles.container] }>
                <Text style={ styles.textHeader } >Here's what we found:</Text>
                <InfoForm overview={ receiptOverview } participants={ initialParticipants } submitHandler={ this.onNext } />
            </View>
        )
    }

    // own method so can be passed as param to InfoForm 
    private onNext(overview: ReceiptOverview, participants: string[], purchaser: string) {
        this.props.navigation.navigate('ItemsList', { 'receiptOverview': overview, 'participants': participants, 'purchaser': purchaser })
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