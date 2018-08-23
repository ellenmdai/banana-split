import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Item } from '../api/Item';

interface ItemInListProps {
    item: Item
}

interface ItemInListState {

}

export class ItemInList extends React.Component<ItemInListProps, ItemInListState> {

    constructor(props: ItemInListProps) {
        super(props);
    }

}