import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight } from 'react-native';
import Modal from 'react-native-modal';

interface AddParticipantModalProps {
    closeHandler: any,
    addHandler: any
}

interface AddParticipantModalState {
    newName: string
}
//TODO: participants to see who already is a participant

export class AddParticipantModal extends React.Component<AddParticipantModalProps, AddParticipantModalState> {

    constructor(props: AddParticipantModalProps) {
        super(props);
        this.state = {
            newName: ''
        }

        this.handleAdd = this.handleAdd.bind(this);
        this.updateInput = this.updateInput.bind(this);
    }

    render() {
        return (
            <Modal 
                backdropOpacity={ 0.7 }
                backdropColor='black'
                isVisible={ true }
                onModalHide={ this.props.closeHandler }
                onBackdropPress={ this.props.closeHandler }
            >
                <View style={styles.modal} >
                    <TextInput style={ {width: 200} } 
                        keyboardType='default' 
                        maxLength={25} 
                        value={ this.state.newName }
                        onChangeText={ text => this.updateInput(text) }
                        placeholder="Enter new name" 
                    />
                    <Button title='Add' onPress={this.handleAdd} />

                    <TouchableHighlight style={ { margin: 10, marginTop: 20, alignSelf: 'flex-end'} } onPress={ this.props.closeHandler }>
                        <Text>Close</Text>
                    </TouchableHighlight>
                </View>

            </Modal>
        )
    }

    private updateInput(input) {
        this.setState({
            newName: input
        });
    }
    
    private handleAdd() {
        if (this.state.newName == '') {
            alert("no name entered.");
            return;
        }
        console.log("newName: " + this.state.newName);   
        this.props.addHandler(this.state.newName);
        this.setState({
            newName: ''
        })   
    }

}

// For the most part doesn't seem like it makes a difference whether to put it in container or modal
// position: absolute seems stop sibling buttons from expanding upon visible; or moving component out of the field div
// marginHorizontal doesn't do anything rn cuz the box is smaller than 5%
// TODO: fix marginVertical being pixels instead of percents but how???
const styles = StyleSheet.create({
    modal: {
        minHeight: 150,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5%',
        marginHorizontal: '5%',
        marginVertical: 125,
        backgroundColor: 'white'
    }
})