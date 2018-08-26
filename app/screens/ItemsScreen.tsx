import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableWithoutFeedback, GestureResponderEvent } from 'react-native';
import { screenStyles } from './screenStyles';
import { ReceiptOverview } from '../api/ReceiptOverview';
import { Item } from '../api/Item';
import { ItemInList } from '../components/ItemInList';
import { DeleteItemModal } from '../components/DeleteItemModal';

// to deal with changes not in receipt
interface ItemsScreenState {
    items: Item[],
    showDeleteModal: boolean,
    toDeleteItemIndex: number
}

// TODO: add items, remove items, submit, highlight selected.

export class ItemsScreen extends Component<{}, ItemsScreenState> {

    static navigationOptions = {
        title: 'Edit Items',
    };

    private allParticipants: string[] = [];


    constructor(props: any) {
        super(props);

        const list: Item[] = this.props.navigation.getParam('receiptOverview', 'NO_OVERVIEW').items;
        this.allParticipants = this.props.navigation.getParam('participants', 'NO_PARTICIPANTS');

        this.state = {
            items: list,
            showDeleteModal: false,
            toDeleteItemIndex: 0
        }

        this.onAddItem = this.onAddItem.bind(this);
        this.onConfirmDelete = this.onConfirmDelete.bind(this);
        this.onShowDeleteModal = this.onShowDeleteModal.bind(this);
    }

    render() {

        const list = this.state.items.map((item, i) => 
                    <ItemInList item={ item } allParticipants={ this.allParticipants } deleteHandler={ () => this.onShowDeleteModal(i) } key={i} />                    
            );

        return (
            <View style={[ screenStyles.default, screenStyles.justifyTop, styles.container ]}>
                <View>
                    <Button title='Add line item' onPress={ this.onAddItem }/>
                </View>
                <ScrollView>
                    { list }
                </ScrollView>

                { this.state.showDeleteModal ? <DeleteItemModal 
                                toDeleteItem={ this.state.items[this.state.toDeleteItemIndex] }
                                closeHandler={ () => this.setState({ showDeleteModal: false }) }
                                confirmHandler={ () => this.onConfirmDelete(this.state.toDeleteItemIndex) }
                                /> :
                                null 
                }
            </View>
        )
    }

    private onAddItem() {
        var newItemsList: Item[] = this.state.items;
        newItemsList.push(new Item(Item.emptyItem));
        this.setState({ 
            items: newItemsList
        });
    }

    //TODO: how to use event to get the item? cuz event.target returns a number, the node id...
    private onShowDeleteModal(i: number) {
        console.log("confirm delete for " + this.state.items[i].name);
        this.setState({
            showDeleteModal: true,
            toDeleteItemIndex: i
        });
    }

    private onConfirmDelete(i: number) {
        var newItemsList: Item[] = this.state.items;
        newItemsList.splice(i, 1) // delete the one item from the list
        this.setState({ 
            items: newItemsList,
            showDeleteModal: false
        });    
    }

}

const styles = StyleSheet.create({
    container: {
        alignItems: 'stretch',
    }
})