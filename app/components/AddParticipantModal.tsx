import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Modal, Button, TouchableHighlight } from 'react-native';

interface AddParticipantModalProps {
    closeHandler: any
}

interface AddParticipantModalState {
    
}
//TODO: participants to see who already is a participant

export class AddParticipantModal extends React.Component<AddParticipantModalProps, {}> {

    constructor(props: AddParticipantModalProps) {
        super(props);

        this.handleAdd = this.handleAdd.bind(this);
    }

    render() {
        return (
            <View style={styles.container}>
                <Modal
                    animationType="slide"
                    transparent={ false }
                    onRequestClose={ this.props.closeHandler }>
                    <View>
                        <TextInput style={ {width: 200} } keyboardType='default' maxLength={25} placeholder="Enter new name" />
                        <Button title='Add' onPress={this.handleAdd} />

                        <TouchableHighlight style={ { margin: 10} } onPress={ this.props.closeHandler }>
                            <Text>Close</Text>
                        </TouchableHighlight>
                    </View>

                </Modal>
            </View>
        )
    }

    private handleAdd() {
        console.log("Add pressed");
        this.refs.current
        
    }

}

const styles = StyleSheet.create({
    container: {
        height: 300,
        padding: 30
    }
})