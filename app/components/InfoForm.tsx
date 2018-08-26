import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Picker, Button } from 'react-native';
import DatePicker from 'react-native-datepicker';
import { ReceiptOverview } from '../api/ReceiptOverview';
import { AddParticipantModal } from './AddParticipantModal';
import { PersonButton } from './PersonButton';

interface InfoFormProps {
    overview: ReceiptOverview,
    participants: string[]
    submitHandler: any
}

interface InfoFormState {
    transactionName: string,
    date: Date,
    total: string,  // must be string to format correctly in text inputs, but typecheck later
    tax: string,
    allParticipants: Map<string, JSX.Element>, //will be removed/better implemented once participants are no longer hard coded.
    participants: string[],
    purchaser: string,
    showAddPplModal: boolean
}

export class InfoForm extends Component<InfoFormProps, InfoFormState> {

    constructor(props: InfoFormProps) {
        super(props);
        var purchaser = props.participants.length == 0 ? '' : props.participants[0];
        var allParticipants: Map<string, JSX.Element> = new Map<string, JSX.Element>();
        props.participants.forEach(p => {
            // allParticipants.set(p, this.renderParcipantButton(p, true));
            allParticipants.set(p, <PersonButton 
                key={ p }
                name={ p } 
                isIn={ true } 
                onPress={ () => this.onParticipantPress(p) } />);
        }); 
        this.state = {
            transactionName: props.overview.merchantName,
            date: props.overview.date,
            total: props.overview.totalAmount.toString(),
            tax: props.overview.taxAmount.toString(),
            allParticipants: allParticipants,
            participants: props.participants,
            purchaser: purchaser,
            showAddPplModal: false
        }

        this.onParticipantPress = this.onParticipantPress.bind(this);
        this.openAddModal = this.openAddModal.bind(this);
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
                    <TextInput style={ styles.input } keyboardType='numeric' value={ this.state.total } onChangeText={ newTotal => this.setState({ total: newTotal }) }/>
                </View>
                <View style={ styles.field }>
                    <Text style={ styles.label }>Tax </Text>
                    <TextInput style={ styles.input } keyboardType='numeric' value={ this.state.tax } onChangeText={ newTax => this.setState({ tax: newTax }) }/>
                </View>
                <View style={ [styles.field, {flexWrap: 'wrap'}] }>
                    <Text style={ styles.label }>Participants </Text>
                    { Array.from(this.state.allParticipants.values()) }
                    <View style={ styles.button }>
                        <Button title='+' color='green' onPress={this.openAddModal} />
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

    // TODO: consolidate with ItemInList's onParticipantPress if possible
    private onParticipantPress(name: string) {
        var newParticipants = this.state.participants;
        var newAllParticipants = this.state.allParticipants;
        var newPurchaser = this.state.purchaser;    // is this actually doing anything? CHECK
        if (newParticipants.indexOf(name) != -1) { // touched participant was active, and want to remove
            newParticipants.splice(newParticipants.indexOf(name), 1); // delete one entry at index of name
            // newAllParticipants.set(name, this.renderParcipantButton(name, false));
            newAllParticipants.set(name, <PersonButton 
                key={ name }
                name={ name } 
                isIn={ false } 
                onPress={ () => this.onParticipantPress(name) } />);
        }
        else {
            newParticipants.push(name);
            // newAllParticipants.set(name, this.renderParcipantButton(name, true));
            newAllParticipants.set(name, <PersonButton 
                key={ name }
                name={ name } 
                isIn={ true } 
                onPress={ () => this.onParticipantPress(name) } />)
        }
        if (newPurchaser == name) {
            newPurchaser = '';
        }
        this.setState({ allParticipants: newAllParticipants, participants: newParticipants, purchaser: newPurchaser });
    }

    private openAddModal() {
        this.setState({showAddPplModal: true});
    }

    private onAddClose() {
        this.setState({ showAddPplModal: false});
    }

    private onAddClick(newName) {
        if (this.state.participants.indexOf(newName) != -1) {   // index of name not found
            alert("That person already exists.");
            return;
        }

        var newAll = this.state.allParticipants;
        // newAll.set(newName, this.renderParcipantButton(newName, true));
        newAll.set(newName, <PersonButton 
            key={ newName }
            name={ newName } 
            isIn={ true } 
            onPress={ () => this.onParticipantPress(newName) } />);
        var newParticipants = this.state.participants;
        newParticipants.push(newName);

        this.setState({
            allParticipants: newAll,
            participants: newParticipants
        })
    }

    // TODO: make cleaner somehow
    private onNext() {
        //TODO: check date
        if (!this.state.transactionName || !this.state.total || !this.state.tax || !this.state.participants || !this.state.purchaser) {
            alert("one or more of the above fields is empty or invalid.");
            return;
        }
        if (!parseFloat(this.state.total) || !parseFloat(this.state.tax)) {
            alert("Tax or total is not a number.");
            return;
        }

        var newOverview = this.props.overview;
        newOverview.setMerchantName(this.state.transactionName);
        newOverview.setDate(this.state.date);
        newOverview.setTotalAmount(parseFloat(this.state.total));
        newOverview.setTaxAmount(parseFloat(this.state.tax));
        this.props.submitHandler(newOverview, this.state.participants, this.state.purchaser);
    }

    // private renderParcipantButton(name: string, isIn: boolean): JSX.Element {
    //     var color = isIn ? IN : OUT;
    //     return (
    //         <View style={ styles.button } key={ name }>
    //             <Button color={ color } title={name} onPress= { (ev) => this.handleParticipantPress(name) } />
    //         </View>
    //     )
    // }

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