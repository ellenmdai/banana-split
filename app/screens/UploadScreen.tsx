import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { screenStyles } from './screenStyles';
import { ReceiptOverview } from '../api/ReceiptOverview';

interface UploadScreenState {
    processing: boolean
}

const pershBabes: string[] = ["Ellen", "Brooke", "Taylor"];

export class UploadScreen extends Component<{}, UploadScreenState> {

    static navigationOptions = {
        title: 'Upload Receipt',
    };

    constructor(props: any) {
        super(props);
        this.state = {
            processing: false
        }

        this.onNext = this.onNext.bind(this);
    }

    render() {
        var style = this.state.processing ? [screenStyles.default, screenStyles.loading ] : [ screenStyles.default ];

        return (
            <View style={ style }>
                <Text>This is where a user would upload an image.</Text>
                <Button
                    title="Next"
                    onPress={ this.onNext }
                />
            </View>
        )
    }

    private onNext() {
        this.setState({ processing: true });    // visually alert users of loading
        var sample = require('../sampleReceipt.json');
       
        var ppl = pershBabes;
        var receiptOverview = new ReceiptOverview(sample);
        this.props.navigation.navigate('ReceiptInfo', { 'receiptOverview': receiptOverview, 'participants': ppl });
    }

}