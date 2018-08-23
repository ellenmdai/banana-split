import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Picker, Button, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { ReceiptOverview } from '../api/ReceiptOverview';
import { AddParticipantModal } from './AddParticipantModal';

interface PeoplePickerProps {
    all: string[]
}

interface PeoplePickerState {
    included: string[]
}

export class PeoplePicker extends React.Component<PeoplePickerProps, PeoplePickerState> {

    constructor(props: PeoplePickerProps) {
        super(props)
        this.state = {
            included: props.all
        }
    }

    render() {
        return <Text>Hi</Text>
    }

}