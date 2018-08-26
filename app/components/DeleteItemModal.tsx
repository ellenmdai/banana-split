import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, TouchableHighlight } from 'react-native';
import Modal from 'react-native-modal';
import { Item } from '../api/Item';

interface DeleteItemModalProps {
    toDeleteItem: Item,
    confirmHandler: any,
    closeHandler: any,
}

export class DeleteItemModal extends React.Component<DeleteItemModalProps, {}> {

    constructor(props: DeleteItemModalProps) {
        super(props);
    }

    render() {
        console.log(this.props.toDeleteItem);
        return (
            <Modal 
                backdropOpacity={ 0.7 }
                backdropColor='black'
                isVisible={ true }
                onModalHide={ this.props.closeHandler }
                onBackdropPress={ this.props.closeHandler }
            >
                <View style={ styles.modal } >
                    <Text>Are you sure you want to delete '{ this.props.toDeleteItem.name }'? </Text>
                    <View style={ styles.buttons }>
                        <Button title='Delete' onPress={ this.props.confirmHandler } color='red' />
                        <Button title='Cancel' onPress={this.props.closeHandler} />
                    </View>
                </View>
    
            </Modal>
        )

    }

}

const styles = StyleSheet.create({
    modal: {
        minHeight: 150,
        justifyContent: 'center',
        alignItems: 'center',
        padding: '5%',
        marginHorizontal: '5%',
        marginVertical: 125,
        backgroundColor: 'white'
    },
    buttons: {
        flexDirection: 'row'
    }
})