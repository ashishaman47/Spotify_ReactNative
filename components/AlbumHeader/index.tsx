import React from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import {Album} from '../../types'
import styles from './styles'

export type AlbumHeaderProps = {
    album: Album
}

const AlbumHeader = (props: AlbumHeaderProps) => {

// distructure props
const {album} = props;

    return (
        <View style={styles.container}>
            {/* Cover Image */}
            <Image 
            style={styles.image}
            source={{uri: album.imageUri}}
            />
            {/* Name */}
            <Text style={styles.name}>{album.name}</Text>
            {/* Creator  &  No. likes */}
            <View style={styles.creatorContainer}>
                <Text style={styles.creator}>By {album.by}</Text>
                <Text style={styles.like}>{album.numberOfLikes} Likes</Text>
            </View>
            {/* Play button */}
            <TouchableOpacity>
                <View style={styles.button}>
                    <Text style={styles.buttonText}>PLAY</Text>
                </View>
            </TouchableOpacity>
        </View>
    )
}

export default AlbumHeader;