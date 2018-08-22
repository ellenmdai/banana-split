import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Picker, Button, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { Overview } from '../api/Overview';
import { AddParticipantModal } from './AddParticipantModal';

interface InfoFormProps {
    data: Overview,
    submitHandler: any
}

//TODO: check info for valid inputs, send data over as props

interface InfoFormState {
    transactionName: string,
    date: Date,
    total: number,
    tax: number,
    allParticipants: Map<string, JSX.Element>, //will be removed/better implemented once participants are no longer hard coded.
    participants: string[],
    purchaser: string,
    showAddPplModal: boolean
}

export class InfoForm extends Component<InfoFormProps, InfoFormState> {

    constructor(props: InfoFormProps) {
        super(props);
        var purchaser = props.data.participants.length == 0 ? '' : props.data.participants[0];
        var allParticipants: Map<string, JSX.Element> = new Map<string, JSX.Element>();
        props.data.participants.forEach(p => {
            allParticipants.set(p, this.createParticipant(p, true));
        }) 
        this.state = {
            transactionName: props.data.merchantName,
            date: props.data.date,
            total: props.data.totalAmount,
            tax: props.data.taxAmount,
            allParticipants: allParticipants,
            participants: props.data.participants,
            purchaser: purchaser,
            showAddPplModal: false
        }

        this.handleParticipantPress = this.handleParticipantPress.bind(this);
        this.handleAddParticipant = this.handleAddParticipant.bind(this);
        this.onAddClose = this.onAddClose.bind(this);
        this.onAddClick = this.onAddClick.bind(this);
        this.onNext = this.onNext.bind(this);
    }

    render() {
        var purchaserOptions: JSX.Element[] = [];
        this.state.participants.forEach(p => {
            purchaserOptions.push(<Picker.Item label={p} value={p} key={p} />);
        });

        return (
            <View>
                <View style={ styles.field }>
                    <Text style={ styles.label }>Transaction name </Text>
                    <TextInput style={ styles.input } keyboardType='default' value={ this.state.transactionName } onChangeText={ newName => this.setState({ transactionName: newName }) }/>
                </View>   
                <View style={ styles.field }>
                    <Text style={ styles.label }>Transaction date </Text>
                    <DatePicker
                        date={ this.state.date }
                        mode='date'
                        format='MM-DD-YYYY'
                        confirmBtnText='set'
                        cancelBtnText='cancel'
                        onDateChange={ newDate => { this.setState({ date: newDate})}}
                    />
                </View>                
                <View style={ styles.field }>
                    <Text style={ styles.label }>Total </Text>
                    <TextInput style={ styles.input } keyboardType='numeric' value={ this.state.total.toString() } onChangeText={ newTotal => this.setState({ total: parseFloat(newTotal) }) }/>
                </View>
                <View style={ styles.field }>
                    <Text style={ styles.label }>Tax </Text>
                    <TextInput style={ styles.input } keyboardType='numeric' value={ this.state.tax.toString() } onChangeText={ newTax => this.setState({ tax: parseFloat(newTax) }) }/>
                </View>
                <View style={ [styles.field, {flexWrap: 'wrap'}] }>
                    <Text style={ styles.label }>Participants </Text>
                    { Array.from(this.state.allParticipants.values()) }
                    <View style={ styles.button }>
                        <Button title='+' color='green' onPress={this.handleAddParticipant} />
                    </View>
                </View>
                <View style={ styles.field }>
                    <Text style={ styles.label }>Purchaser </Text>
                    <View style={ styles.pickerContainer }><Picker 
                        style={ styles.picker } 
                        selectedValue={ this.state.purchaser }
                        onValueChange={ (itemValue, itemIndex) => this.setState({purchaser: itemValue}) } 
                        mode='dropdown'>
                        { purchaserOptions }
                    </Picker></View>
                </View>

                <View style={[ styles.button, styles.submit ]}><Button title='Next' onPress= { this.onNext } /></View>

                { this.state.showAddPplModal ? <AddParticipantModal closeHandler={ this.onAddClose } addHandler={ this.onAddClick } /> : null }

            </View>
        )
    }

    private handleParticipantPress(name: string) {
        var newParticipants = this.state.participants;
        var newAllParticipants = this.state.allParticipants;
        var newPurchaser = this.state.purchaser;    // is this actually doing anything? CHECK
        if (newParticipants.indexOf(name) != -1) { // touched participant was active, and want to remove
            newParticipants.splice(newParticipants.indexOf(name), 1); // delete one entry at index of name
            newAllParticipants.set(name, this.createParticipant(name, false));

        }
        else {
            newParticipants.push(name);
            newAllParticipants.set(name, this.createParticipant(name, true));
        }
        if (newPurchaser == name) {
            newPurchaser = '';
        }
        this.setState({ allParticipants: newAllParticipants, participants: newParticipants, purchaser: newPurchaser });
    }

    private handleAddParticipant() {
        this.setState({showAddPplModal: true});
    }

    private onAddClose() {
        this.setState({ showAddPplModal: false});
    }

    private onAddClick(newName) {
        var newAll = this.state.allParticipants;
        newAll.set(newName, this.createParticipant(newName, true));
        var newParticipants = this.state.participants
        newParticipants.push(newName);

        this.setState({
            allParticipants: newAll,
            participants: newParticipants
        })
    }

    // TODO: make cleaner somehow
    private onNext() {
        //TODO: check date
        console.log("_____");
        if (!this.state.transactionName || !this.state.total || !this.state.tax || !this.state.participants || !this.state.purchaser) {
            alert("one or more of the above fields is empty or invalid.");
            return;
        }

        var participantsString = "";
        this.state.participants.forEach(participant => {
            participantsString + '"' + participant + '", ';
        });

        // Merchant name currently hardcoded in Overview
        var json = JSON.parse('{' +
            '"date": { "data": "' + this.state.date + '" }, ' +
            '"totalAmount": { "data": ' + this.state.total + ' }, ' +
            '"taxAmount": { "data": ' + this.state.tax + ' }, ' +
            '"merchantName": { "data": "' + this.state.transactionName + '" }, ' +
            '"participants": [' + participantsString + '], ' +
            '"purchaser": "' + this.state.purchaser + '"' +
        '}')
        var newOverview = new Overview(json);
        this.props.submitHandler(newOverview);
    }

    private createParticipant(name: string, isIn: boolean): JSX.Element {
        var color = isIn ? IN : OUT;
        return (
            <View style={ styles.button } key={ name }>
                <Button color={ color } title={name} onPress= { (ev) => this.handleParticipantPress(name) } />
            </View>
        )
    }

}

// TODO: fix submit placement to use flex not pixel margin
const styles = StyleSheet.create({
    field: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        margin: 5
    },
    label: {
        fontWeight: 'bold',
    },
    input: {
        fontSize: 24,
        padding: 2,
        borderColor: '#888',
        borderWidth: 1
    },
    pickerContainer: {
        borderColor: '#888',
        borderWidth: 1
    },
    picker: {
        width: 170,
    },
    button: {
        margin: 1
    },
    submit: {
        marginTop: 150
    }
})

const IN: string = 'royalblue';
const OUT: string = 'gray';