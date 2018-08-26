import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableWithoutFeedback, TouchableHighlight } from 'react-native';
import { Item } from '../api/Item';
import { PersonButton } from './PersonButton';

interface ItemInListProps {
    item: Item,
    allParticipants: string[],
    deleteHandler: any
}

interface ItemInListState {
    name: string,
    price: string,  // for TextInput to work
    split: number,
    splitters: string[],
    splitterIcons: Map<string, JSX.Element>
}

const ABBREV_LENGTH = 3;

// TODO: TEST

export class ItemInList extends React.Component<ItemInListProps, ItemInListState> {

    constructor(props: ItemInListProps) {
        super(props);
        var split: number = props.item.price / props.allParticipants.length;
        var splitterIcons: Map<string, JSX.Element> = new Map<string, JSX.Element>();
        this.props.allParticipants.forEach((p, i) => {
            splitterIcons.set(p, <PersonButton 
                key={ p }
                name={ p.substr(0, ABBREV_LENGTH) } 
                isIn={ true } 
                onPress={ () => this.onParticipantPress(p) } />);
        });
        this.state = {
            name: props.item.name,
            price: props.item.price.toString(),
            split: split,
            splitters: props.allParticipants,
            splitterIcons: splitterIcons
        }

        this.checkValidPrice = this.checkValidPrice.bind(this);
        this.onParticipantPress = this.onParticipantPress.bind(this);
        // this.removeSplitter = this.removeSplitter.bind(this);
        // this.addSplitter = this.addSplitter.bind(this);
    }

    render() {

        return (
            <View style={ styles.container }>
                <View style={ styles.prices }>
                    <TextInput style={ styles.input } 
                        keyboardType='numeric' 
                        value={ this.state.price } 
                        onChangeText={ newPrice => this.setState({ price: newPrice }) }
                        onEndEditing={ this.checkValidPrice }
                    />
                    <Text style={ styles.splitPrice }>{ this.state.split.toFixed(2) }</Text>
                </View>
                <View style={ styles.nameContainer }>
                    <TextInput style={ styles.input } 
                        keyboardType='default' 
                        value={ this.state.name } 
                        onChangeText={ newName => this.setState({ name: newName }) }
                    />
                </View>
                <View>
                    <View style={ styles.splitterSection }>
                        { Array.from(this.state.splitterIcons.values()) }
                    </View>
                    <TouchableHighlight onPress={ this.props.deleteHandler }>
                        <View style={ styles.delete }><Text>delete</Text></View>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }

    private checkValidPrice() {
        if (!parseFloat(this.state.price)) {
            alert("The price is not a valid number.");
            return;
        }

        var newSplit = parseFloat(this.state.price) / this.state.splitters.length;
        this.setState({ split: newSplit });
    }

    private onParticipantPress(name: string) {
        var newSplitters = this.state.splitters;
        var newSplitterIcons = this.state.splitterIcons;
        // update splitters and icons
        if (newSplitters.indexOf(name) != -1) { // touched participant was active, and want to remove
            newSplitters.splice(newSplitters.indexOf(name), 1); // delete one entry at index of name
            newSplitterIcons.set(name, <PersonButton 
                key={ name }
                name={ name.substr(0, ABBREV_LENGTH) } 
                isIn={ false } 
                onPress={ () => this.onParticipantPress(name) } />);
        }
        else {
            newSplitters.push(name);
            newSplitterIcons.set(name, <PersonButton 
                key={ name }
                name={ name.substr(0, ABBREV_LENGTH) } 
                isIn={ true } 
                onPress={ () => this.onParticipantPress(name) } />)
        }

        // adjust price split
        var newSplit: number;
        if (newSplitters.length == 0) {
            newSplit = NaN;
        }
        else {
            newSplit = parseFloat(this.state.price) / newSplitters.length;
        }
        this.setState({ splitterIcons: newSplitterIcons, splitters: newSplitters, split: newSplit });
    }

}

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        paddingHorizontal: 5,
        paddingVertical: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    prices: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center'
    },
    splitPrice: {
        fontWeight: 'bold'
    },
    nameContainer: {
        flex: 2,
        overflow: 'scroll'
    },
    input: {
        padding: 2,
        borderColor: '#888',
        borderWidth: 1
    },
    rightSide: {
        flex: 2,
        flexDirection: 'column',
    },
    splitterSection: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    delete: {
        alignSelf: 'flex-end',
        padding: 2
    }
})





    // private removeSplitter(person: string) {
    //     var newSplitters: string[] = this.state.splitters.splice(this.state.splitters.indexOf(person), 1);    // remove persion from array
    //     var newSplit: number;
    //     if (newSplitters.length == 0) {
    //         newSplit = NaN;
    //     }
    //     else {
    //         newSplit = parseFloat(this.state.price) / newSplitters.length;
    //     }
    //     this.setState({
    //         splitters: newSplitters,
    //         split: newSplit
    //     })
    // }

    // or private?
    // public addSplitter(person: string) {
    //     if (this.state.splitters.indexOf(person) != -1) {
    //         return;
    //     }
    //     var newSplitters: string[] = this.state.splitters;
    //     newSplitters.push(person);
    //     var newSplit = parseFloat(this.state.price) / newSplitters.length;
    //     this.setState({
    //         splitters: newSplitters,
    //         split: newSplit
    //     })
    // }