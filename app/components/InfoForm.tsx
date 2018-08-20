import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Picker, Button } from 'react-native';
import { Overview } from '../api/Overview';
import { AddParticipantModal } from './AddParticipantModal';

interface InfoFormProps {
    data: Overview
}

//TODO: check info for valid inputs, send data over as props

interface InfoFormState {
    allParticipants: Map<string, JSX.Element>, //will be removed/better implemented once participants are no longer hard coded.
    participants: string[],
    purchaser: string,
    showAddPplModal: boolean
}

export class InfoForm extends Component<InfoFormProps, InfoFormState> {

    private myRef;

    constructor(props: InfoFormProps) {
        super(props);
        var purchaser = props.data.participants.length == 0 ? '' : props.data.participants[0];
        var allParticipants: Map<string, JSX.Element> = new Map<string, JSX.Element>();
        props.data.participants.forEach(p => {
            allParticipants.set(p, <Button color={ IN } title={p} onPress= { (ev) => this.handleParticipantPress(p)} key={p} />);
        }) 
        this.state = {
            allParticipants: allParticipants,
            participants: props.data.participants,
            purchaser: purchaser,
            showAddPplModal: false
        }

        this.myRef = React.createRef();
        this.handleParticipantPress = this.handleParticipantPress.bind(this);
        this.handleAddParticipant = this.handleAddParticipant.bind(this);
        this.onAddClose = this.onAddClose.bind(this);
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
                    <TextInput style={ styles.input } keyboardType='default' defaultValue={ this.props.data.merchantName }/>
                </View>                
                <View style={ styles.field }>
                    <Text style={ styles.label }>Total </Text>
                    <TextInput style={ styles.input } keyboardType='numeric' defaultValue={ this.props.data.totalAmount.toString() }/>
                </View>
                <View style={ styles.field }>
                    <Text style={ styles.label }>Tax </Text>
                    <TextInput style={ styles.input } keyboardType='numeric' defaultValue={ this.props.data.taxAmount.toString() }/>
                </View>
                <View style={ [styles.field, {flexWrap: 'wrap'}] }>
                    <Text style={ styles.label }>Participants </Text>
                    { Array.from(this.state.allParticipants.values()) }
                    <Button title='+' color='green' onPress={this.handleAddParticipant} />
                    { this.state.showAddPplModal ? <AddParticipantModal closeHandler={ this.onAddClose } /> : null }
                </View>
                <View style={ styles.field }>
                    <Text style={ styles.label }>Purchaser </Text>
                    <Picker 
                        style={ styles.picker } 
                        selectedValue={ this.state.purchaser }
                        onValueChange={ (itemValue, itemIndex) => this.setState({purchaser: itemValue}) } 
                        mode='dropdown'>
                        { purchaserOptions }
                    </Picker>
                </View>
            </View>
        )
    }

    private handleParticipantPress(name: string) {
        console.log("handling pressing of " + name);
        var newParticipants = this.state.participants;
        var newAllParticipants = this.state.allParticipants;
        var newPurchaser = this.state.purchaser;    // is this actually doing anything? CHECK
        if (newParticipants.indexOf(name) != -1) { // touched participant was active, and want to remove
            newParticipants.splice(newParticipants.indexOf(name), 1); // delete one entry at index of name
            newAllParticipants.set(name, <Button color={ OUT } title={name} onPress= { (ev) => this.handleParticipantPress(name) } key={name}/>);

        }
        else {
            newParticipants.push(name);
            newAllParticipants.set(name, <Button color={ IN } title={name} onPress= { (ev) => this.handleParticipantPress(name) } key={ name }/>);
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
        console.log("handling close from InfoForm");
        this.setState({ showAddPplModal: false});
    }

}

const styles = StyleSheet.create({
    field: {
        flexDirection: 'row',
        alignItems: 'stretch',
        justifyContent: 'flex-start',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 20
    },
    input: {
        fontSize: 24
    },
    picker: {
        width: 170,
        alignItems: undefined,
    }
})

const IN: string = 'royalblue';
const OUT: string = 'gray';