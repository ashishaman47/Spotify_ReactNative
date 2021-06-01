import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        padding: 10,
    },
    image: {
        width: 180,
        height: 180,
        margin: 10,
    },
    name: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
    },
    creatorContainer: {
        flexDirection: 'row',
        margin: 5,
    },
    creator: {
        color: 'lightgray',
        margin: 5,
        fontSize: 14,
    },
    like: {
        color: 'lightgray',
        margin: 5,
        fontSize: 14,
    },
    button: {
        backgroundColor: '#1CD05D',
        height: 47,
        width: 155,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    }
})

export default styles