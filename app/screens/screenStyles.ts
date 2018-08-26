import { StyleSheet } from 'react-native';

export const screenStyles = StyleSheet.create({
    default: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    justifyTop: {
        justifyContent: 'flex-start'
    },
    loading: {
        backgroundColor: '#0008'
    }
  })