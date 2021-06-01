import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import {View, Text, FlatList} from 'react-native'
import AlbumHeader from '../components/AlbumHeader';

import {API, graphqlOperation} from 'aws-amplify';
// importing query
import {getAlbum} from '../src/graphql/queries';

import SongListItem from '../components/SongListItem/index'
import albumDetails from '../data/albumDetails'

// adding linear gradient on the background
import { LinearGradient } from "expo-linear-gradient";

const AlbumScreen = () => {
    
    // getting access to the passed params that we passed on navigation
    const route = useRoute();
    const albumId = route.params.id;

    
    const [album, setAlbum] = useState(null);

    useEffect(() => {
        // checking the passed data value
        // console.log(route)
        console.log(albumId);

        // function
        const fetchAlbumDetails = async () => {
            try {
                const data = await API.graphql(graphqlOperation(getAlbum, {id: albumId}))
                // console.log(data);
                setAlbum(data.data.getAlbum)
            } catch (e) {
                console.log(e);
            }
        }

        fetchAlbumDetails();
    },[])

    // if we are still fetching album then return this
    if(!album) {
        return <Text>Loading...</Text>
    }

    return (
        <LinearGradient
    colors={["#09203f", "#537895"]}
    // colors={['rgb(91, 87, 115)', 'rgba(0, 0, 0, 1)']}
          start={[0.1, 0.1]}
          style={{flex: 1}}
      >
    <View>
        {/* list of all the songs */}
        <FlatList 
        data={album.songs.items}
        renderItem={({item})=> <SongListItem song={item} />}
        keyExtractor={(item)=> item.id}
        showsVerticalScrollIndicator={false}
        // Rendered at the top of all the items. Can be a React Component, react element
        ListHeaderComponent={()=> <AlbumHeader album={album} />}
        />
    </View>
    </LinearGradient>
)}

export default AlbumScreen