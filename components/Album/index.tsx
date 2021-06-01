import React from 'react'
import { 
    View, 
    Image, 
    Text,
    TouchableWithoutFeedback, 
} from 'react-native'
import styles from './styles'
import {Album} from '../../types'
import { useNavigation } from '@react-navigation/native'

// defing the type of props -> we are recieving them as part of album
export type AlbumProps = {
    // we are using here custom type defination that we imported from types
    album: Album,
}

// this will help typescript to make sure what we are recieving as props
const AlbumComponent = (props: AlbumProps) => {
// this will give us reference to the navigation
    const navigation = useNavigation();
    
const onPress = () => {
    // console.warn(`Album Pressed : ${props.album.artistsHeadline}`)

    // navigating to Album Screen
    navigation.navigate('AlbumScreen', {id: props.album.id})
}

    return (
    
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.container}>
            {/* Image of the Album */}
        <Image 
        style={styles.image}
        source={{uri: props.album.imageUri}}
        />
        {/* Artist headline */}
        <Text style={styles.text}>{props.album.artistsHeadline}</Text>
        </View>
        </TouchableWithoutFeedback>
)}

export default AlbumComponent;

// Touchable --> helps us to detect click in React native