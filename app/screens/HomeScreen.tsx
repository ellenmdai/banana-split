import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export class HomeScreen extends Component<{}, {}> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>This is Banana Split DEV.</Text>
                <Text>Upload a copy of a receipt to get started.</Text>
                <Text>lol jk; tap the button below to start testing.</Text>
                <Button
                    title="Go to Second"
                    onPress={() => this.props.navigation.navigate('Second')}
                />
                {/* this.props.navigation is correct despite never being defined. */}
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