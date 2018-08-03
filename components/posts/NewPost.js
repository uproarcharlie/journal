import React, { Component } from 'react';
import {  View, Text, ActivityIndicator } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag'; 

import PostForm from './PostForm';

import navStyles from '../../styles/navStyles';

class NewPost extends Component {
  static navigationOptions = {
        title: 'New Post',
        ...navStyles
};
  state = {
    loading: false
  };

newPost = ({ title, body }) => {
  const {newPost, navigation, screenProps } = this.props;
  this.setState({ loading: true});
  newPost({
    variables: {
      title,
      body,
      userId: screenProps.user.id 
    }
  }).then(() => {
    navigation.goBack();
  }).catch(error =>{
    this.setState({ loading: false});
    console.log(error);
  })
};

  render() {
    return (
      <View>
        {this.state.laoding ? (
        <ActivityIndicator size='large' color='#704ea0' />
          ) : (
        <PostForm onSubmit={this.newPost} />
          )}
      </View>
    );
  }
}

const newPost = gql`
  mutation newPost($title: String!, $body: String!, $userId: ID!) {
    createPost(title: $title, body: $body, userId: $userId)  {
      id
    }
  }
`;

export default graphql(newPost, {
  name: 'newPost',
  options:  {
    refetchQueries: ['postsQuery']
  }
})(NewPost);