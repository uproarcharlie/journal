//packages
import { createStackNavigator } from "react-navigation";
import React from 'react';
import { StyleSheet, View, Text, TouchableHighlight, ActivityIndicator } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

//styles
import navStyles from './styles/navStyles';

//screens
import Post from './components/posts/Post';
import Posts from './components/posts/Posts';
import NewPost from './components/posts/NewPost';
import {Fab, Icon } from 'native-base';

import Login from './components/user/Login';

class Home extends React.Component {
    static navigationOptions = {
      title: "Home",
     ...navStyles
    };
  
  newPost = () => {
    this.props.navigation.navigate('NewPost')
  };

  goToPost = () => {
    this.props.navigation.navigate('Post')
  };
  
    render() {
      
      return (
        <View style={styles.container}>
        <Posts {...this.props} />
        <Fab style={styles.newPost} onPress={this.newPost} style={styles.newPost}>
          <Icon name='add' />
          </Fab>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      marginTop: 30,
      flex: 1,
      justifyContent: "space-between"
    },
    newPost: {
      backgroundColor: "#704ea0",
      
    },
    newPostText:  {
      fontSize: 20,
      textAlign: 'center',
      color: '#ffffff'
    }

  });

const Navigator = createStackNavigator ({
    Home: {
      screen: Home
    },
    Post: {
      screen: Post
    },
    NewPost: {
      screen: NewPost
    }
  })

  const NavWrapper = ({loading, user}) => {
    if (loading) return <ActivityIndicator size='large' color='#704ea0' />;
    if (!user) return <Login />;
    return <Navigator screenProps={{ user }} />;
  }

const userQuery = gql`
query userQuery {
  user  {
    id
    email
    posts(orderBy: createdAt_DESC) {
      id
      title
    }
  }
}`

  export default graphql(userQuery, {
    props: ({ data }) => ({ ...data })
  })(NavWrapper);