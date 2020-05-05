import React from 'react'
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Image
} from 'react-native';

import wallpaper from "../Assets/Images/Login/wallpaper.jpg";

const Login = () => {
    return (
        <Image style={styles.picture} source={wallpaper}>
        </Image>
    )
}

const styles = StyleSheet.create({
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    content: {
        flex: 1
    },
    picture: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
})

export default Login
