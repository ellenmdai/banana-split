import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export class HomeScreen extends Component<{}, {}> {

    static navigationOptions = {
        title: 'Welcome',
    };

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
                    title="Upload a receipt"
                    onPress={ () => this.props.navigation.navigate('Upload', { itemId: Math.floor(Math.random() * 100) }) }
                />
                {/* this.props.navigation is correct despite never being defined. */}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    }
})