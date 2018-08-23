import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Picker, Button, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { ReceiptOverview } from '../api/ReceiptOverview';
import { AddParticipantModal } from './AddParticipantModal';

const IN: string = 'royalblue';
const OUT: string = 'gray';

interface PersonButtonProps {
    name: string
    isIn: boolean,
    onPress: any // onPress handler
}

interface PersonButtonState {

}

export class PersonButton extends React.Component<PersonButtonProps, PersonButtonState> {

    constructor(props: PersonButtonProps) {
        super(props);
    }

    render() {
        var color = this.props.isIn ? IN : OUT;
        return (
            <View style={ styles.container }>
                <Button color={ color } title={this.props.name} onPress= { this.props.onPress } />
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        margin: 1
    }
})