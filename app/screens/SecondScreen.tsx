import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export class SecondScreen extends Component<{}, {}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Test for second screen.</Text>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffa',
        alignItems: 'center',
        justifyContent: 'center',
    }
})