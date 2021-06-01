import React, {useEffect, useState} from 'react';
import { FlatList, StyleSheet,Text, View } from 'react-native';

import AlbumCategory from '../components/AlbumCategory';

import albumCategories from '../data/albumCategories'

import {API, graphqlOperation} from 'aws-amplify';
// importing query
import {listAlbumCategorys} from '../src/graphql/queries';

// adding linear gradient on the background
import { LinearGradient } from "expo-linear-gradient";

export default function TabOneScreen() {

  const [categories, setCategories] = useState([]);

  // run the query when the components mount
  useEffect(()=>{
    // function
    const fetchAlbumCategories = async () => {
      try {
        const data = await API.graphql(graphqlOperation(listAlbumCategorys));
        // console.log(data);
        setCategories(data.data.listAlbumCategorys.items)
      } catch (e) {
        console.log(e);
      }
    }

    // function call to fetch album cateogories
    fetchAlbumCategories();
  },[])

  return (
    <LinearGradient
    // colors={["#09203f", "#537895"]}
    colors={['rgb(91, 87, 115)', 'rgba(0, 0, 0, 1)']}
          start={[0.1, 0.1]}
    style={styles.container}
      >
    <View style={styles.container}>
      <FlatList 
      data={categories}
      // here one item will be one AlbumCategory which is coming from data
      renderItem={({item})=> (<AlbumCategory 
        title={item.title} 
        // it will give the array of albums within the one albumCategory
        albums={item.albums.items}
        />)}
        // each category has its own id
        keyExtractor={(item)=>item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
