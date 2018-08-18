import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import { Overview } from '../api/Overview';

interface InfoFormProps {
    data: Overview
}

export class InfoForm extends Component<InfoFormProps, {}> {

    constructor(props: InfoFormProps) {
        super(props);
    }

    render() {
        return (
            <View>
                {/* <TextInput />TODO */}

            </View>
        )
    }

}