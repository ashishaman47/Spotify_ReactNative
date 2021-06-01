import React, { useContext, useEffect, useState } from 'react';
import { Text, Image, View, TouchableOpacity } from 'react-native';
import styles from './styles';
import {AntDesign, FontAwesome} from '@expo/vector-icons'
import {Sound} from "expo-av/build/Audio/Sound";

import { Song } from '../../types';

import {AppContext} from '../../AppContext'
import { getSong } from '../../src/graphql/queries';
import {API, graphqlOperation} from 'aws-amplify';

// const song = {
// 	id: '1',
// 	// song uri
// 	uri: 'https://not-just-trash.s3-eu-west-1.amazonaws.com/WhatsApp+Audio+2020-09-22+at+14.20.25.mp4',
// 	imageUri: 'https://cache.boston.com/resize/bonzai-fba/Globe_Photo/2011/04/14/1302796985_4480/539w.jpg',
// 	title: 'notJust Dev Beats',
// 	artist: 'Vadim',
//   }

const PlayerWidget = () => {

	// storing the sound from playCurrentSong func
	// here type will be Sound or null --> this Sound is from Audio(expo-av)
	const [sound, setSound] = useState<Sound|null>(null);
	// current status of song -> playing or not
	const [isPlaying, setIsPlaying] = useState<boolean>(true);
	// duration of the current song
	const [duration, setDuration] = useState<number|null>(null);
	// position --> how much of the song played
	const [position, setPosition] = useState<number|null>(null);


	// stores the current playing song
	const [song, setSong] = useState(null);


	// getting the current song id using useContext hook from --> AppContext
	const {songId} = useContext(AppContext);

	// based on this songid we need to query our song from database
	useEffect(() => {
		// fetch data about song
		const fetchSong = async() => {
			try{
				const data = await API.graphql(graphqlOperation(getSong, {id: songId}))
				// console.log(data)
				setSong(data.data.getSong)
			} catch (e) {
				console.log(e)
			}
		}

		fetchSong();
	}, [songId])

	const onPlaybackStatusUpdate = (status) => {
		// status --> has every current status of song
		console.log(status);
		setIsPlaying(status.isPlaying);
		// set duration --> to duration of song in milli sec
		setDuration(status.durationMillis);
		setPosition(status.positionMillis);
	}

	// it will be async func --> playing, downloading audio song will be done async
	const playCurrentSong = async () => {
		
		// if sound is not null --> it will destroy the previous instance of sound
		if (sound) {
			// this will make sure we only play one song at a time.
			await sound.unloadAsync();
		}
		
		// will create sound Asynchronously --> createAysnc()
		// this accepts parameter --> source, initialStatus, onPlaybackStatusUpdate
		// this func will be called every frame --> telling how much frame we have already played, play/paused
		const {sound: newSound} = await Sound.createAsync(
			{uri: song.uri},
			// sound should start playing when we create it
			// using --> isPlaying --> which tells whether sound is playing or not
			{shouldPlay: isPlaying},
			onPlaybackStatusUpdate
		)
		// setState of sound to current sound being played
		setSound(newSound)
	}

	// run this func when the song changes
	useEffect(()=>{
		// play the song --> func call
		if(song) {
			playCurrentSong();
		}
	},[song])

	// function to play/pause sound
	const onPlayPausePress = async () => {
		// if there is no sound and we press play/pause button nothing should happen
		if (!sound) {
			return;
		}

		// if we have the sound --> then if it's playing we need to stop the sound and vice versa
		// for this we need a variable which tells whether a song is playing or not
		if(isPlaying) {
			// pause it if playing
			await sound.pauseAsync();
		} else {
			// play it if not playing
			await sound.playAsync();
		}
	}

	// function that will calculate song played into % wise
	const getProgress = () => {
		// return 0 if there is no sound or duration or position
		if (sound === null || duration === null || position === null) {
			return 0;
		}

		// returns how much % of sound is played --> value b/w [0-1]*100
		return (position / duration)*100;
	}

	// if there is no song playing don't display the playing widget
	if(!song) {
		return null;
	}

	return (
		<View style={styles.container}>
			{/* Progress bar of the song --> in line styling getting width % from the function based on the current progress of the song */}
			<View style={[styles.progress, {width: `${getProgress()}%`}]} />
			
			<View style={styles.row}>
				{/* Image cover */}
			<Image 
			style={styles.image}
			source={{uri: song.imageUri}}
			/>

			<View style={styles.rightContainer}>
			<View style={styles.nameContainer}>
			{/* Title */}
			<Text style={styles.title}>{song.title}▫</Text>
			{/* Artist */}
			<Text style={styles.artist}>{song.artist}</Text>
			</View>
			<View style={styles.iconContainer}>
			<AntDesign name='hearto' size={25} color='white' />

			{/* based on the status of the isPlaying --> we must display play/pause button */}
			<TouchableOpacity onPress={onPlayPausePress}>
			<FontAwesome name={isPlaying ? 'pause' : 'play'} size={25} color='white' />
			</TouchableOpacity>
			</View>
			</View>
			</View>
		</View>
	)
};

export default PlayerWidget;
