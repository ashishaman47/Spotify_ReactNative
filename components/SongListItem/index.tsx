import React, { useContext } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import styles from './styles';

import { Song } from '../../types';
import { AppContext } from '../../AppContext';

export type SongListItemProps = {
	song: Song,
};

const SongListItem = (props: SongListItemProps) => {

	// destructuring props
	const {song} = props;

	// func from AppContext
	const {setSongId} = useContext(AppContext);

	// function
	const onPlay = () => {
		// console.log('Playing')
		// set new songId in the func of AppContext
		setSongId(song.id);

		// after setting the song id --> use this song id in the player widget to play the song
	}

	return (
			<TouchableOpacity onPress={onPlay}>
				{/* when we press on the song its id should get saved in the AppContext */}
				<View style={styles.container}>
			{/* Image cover */}
				<Image 
				style={styles.image}
				source={{uri: song.imageUri}}
				/>
				<View style={styles.rightContainer}>
					{/* Title */}
				<Text style={styles.title}>{song.title}</Text>
				{/* Artist */}
				<Text style={styles.artist}>{song.artist}</Text>
				</View>
				</View>
			</TouchableOpacity>
	)
};

export default SongListItem;
