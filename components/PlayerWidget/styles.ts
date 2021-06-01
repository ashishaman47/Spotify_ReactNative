import {StyleSheet} from 'react-native'
import Colors from '../../constants/Colors'

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 49,
        backgroundColor: '#131313',
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
    },
    progress: {
        height: 3,
        backgroundColor: '#bcbcbc',
    },
    row: {
        flexDirection: 'row',
    },
    image: {
        width: 65,
        height: 65,
        marginRight: 5,
    },
    rightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    nameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 90,
        justifyContent: 'space-around',
    },
    title: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        margin: 10,
    },
    artist: {
        color: 'lightgray',
        fontSize: 12,
        marginLeft: -10,
    },
})

export default styles