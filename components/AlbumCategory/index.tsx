import React from 'react'
import {Text, View, FlatList} from 'react-native'
import {Album} from '../../types'
import AlbumComponent from '../Album'
import styles from './styles'

// defining the props type
export type AlbumCategoryProps = {
    title: string,
    albums: [Album],
} 

const AlbumCategory = (props: AlbumCategoryProps) => (
    <View style={styles.container}>
        {/* Title of Category */}
        <Text style={styles.title}>{props.title}</Text>
        {/* List of albums */}
        <FlatList 
        data={props.albums}
        renderItem={({item})=> <AlbumComponent album={item} />}
        keyExtractor={(item)=> item.id}
        horizontal
        // remove scrollbar
        showsHorizontalScrollIndicator={false}
        />
    </View>
)

export default AlbumCategory;

// FlatList --> is used to display list of items
// renderItem --> this func will be called for each specific item --> and it will render AlbumComponent --> and each item will be passed as props to AlbumComponent
// keyExtractor --> for each item what will be the key that react will used for catching internal operation.