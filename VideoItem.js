import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Video } from "expo-av";
import { Ionicons } from "@expo/vector-icons";
import RBSheet from "react-native-raw-bottom-sheet";
import { IconButton } from "react-native-paper";
import FeatherIcon from "react-native-vector-icons/Feather";
const { width, height } = Dimensions.get("window");
const VideoItem = ({ item, isActive, isMuted, toggleMute }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(parseInt(item.likes));
  const [comments, setComments] = useState([
    {
      id: "1",
      user: "User1",
      text: "Great video!",
      avatar: "https://via.placeholder.com/40",
      date: "2023-04-15T10:30:00Z",
    },
    {
      id: "2",
      user: "User2",
      text: "Amazing content!",
      avatar: "https://via.placeholder.com/40",
      date: "2023-04-15T11:45:00Z",
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const commentsSheetRef = useRef();
  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };
  const handleComment = () => {
    commentsSheetRef.current.open();
  };
  const addComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: Date.now().toString(),
        user: "CurrentUser",
        text: newComment.trim(),
        avatar: "https://via.placeholder.com/40",
        date: new Date().toISOString(),
      };
      setComments([newCommentObj, ...comments]);
      setNewComment("");
    }
  };
  return (
    <View style={styles.videoContainer}>
      <Video
        source={{ uri: item.uri }}
        rate={1.0}
        volume={1.0}
        isMuted={isMuted}
        resizeMode="cover"
        shouldPlay={isActive}
        isLooping
        style={styles.video}
      />
      <View style={styles.overlay}>
        <View style={styles.rightControls}>
          <TouchableOpacity onPress={handleLike} style={styles.controlItem}>
            <Ionicons
              name={isLiked ? "heart" : "heart-outline"}
              size={30}
              color={isLiked ? "red" : "white"}
            />
            <Text style={styles.controlText}>{likeCount}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleComment} style={styles.controlItem}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={30}
              color="white"
            />
            <Text style={styles.controlText}>{comments.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleMute} style={styles.controlItem}>
            <Ionicons
              name={isMuted ? "volume-mute" : "volume-medium"}
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomControls}>
          <View style={styles.userInfo}>
            <Image source={{ uri: item.userAvatar }} style={styles.avatar} />
            <Text style={styles.username}>{item.username}</Text>
          </View>
          <Text style={styles.title}>{item.title}</Text>
        </View>
      </View>
      <RBSheet
        ref={commentsSheetRef}
        closeOnDragDown={true}
        closeOnPressMask={true}
        height={height * 0.6}
        customStyles={{
          wrapper: {
            backgroundColor: "rgba(0,0,0,0.6)",
          },
          container: {
            backgroundColor: "#fff",
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          draggableIcon: {
            backgroundColor: "#000",
          },
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 15,
            borderBottomWidth: 1,
            borderBottomColor: "#eee",
            paddingBottom: 5,
          }}
        >
          <Text style={{ color: "black", flex: 1 }}>Comments</Text>
          <IconButton
            onPress={() => commentsSheetRef.current.close()}
            icon={() => <FeatherIcon color="gold" size={22} name="x" />}
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.commentsContainer}
        >
          <ScrollView
            style={styles.commentsList}
            showsVerticalScrollIndicator={false}
          >
            {comments.map((comment) => {
              return (
                <View key={comment.id} style={styles.commentItem}>
                  <Image
                    source={{ uri: comment.avatar }}
                    style={styles.commentAvatar}
                  />
                  <View style={styles.commentContent}>
                    <View style={styles.commentHeader}>
                      <Text style={styles.commentUser}>{comment.user}</Text>
                      <Text style={styles.commentDate}>2 day ago</Text>
                    </View>
                    <Text style={styles.commentText}>{comment.text}</Text>
                  </View>
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.inputContainer}>
            <Image
              source={{ uri: "https://via.placeholder.com/40" }}
              style={styles.inputAvatar}
            />
            <TextInput
              style={styles.input}
              placeholder="Add a comment..."
              value={newComment}
              onChangeText={setNewComment}
            />
            <TouchableOpacity onPress={addComment} style={styles.sendButton}>
              <Ionicons name="send" size={24} color="#000" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </RBSheet>
    </View>
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    width: width,
    height: height,
  },
  video: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
    padding: 20,
  },
  rightControls: {
    position: "absolute",
    right: 10,
    bottom: 100,
    alignItems: "center",
  },
  controlItem: {
    alignItems: "center",
    marginBottom: 15,
  },
  controlText: {
    color: "white",
    marginTop: 5,
  },
  bottomControls: {
    position: "absolute",
    bottom: 20,
    left: 10,
    right: 10,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  title: {
    color: "white",
    fontSize: 14,
  },
  commentsContainer: {
    flex: 1,
    padding: 10,
  },
  commentsList: {
    flex: 1,
  },
  commentItem: {
    flexDirection: "row",
    marginBottom: 15,
  },
  commentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  commentUser: {
    fontWeight: "bold",
  },
  commentDate: {
    fontSize: 12,
    color: "#777",
  },
  commentText: {
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    padding: 10,
  },
  inputAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
  },
  sendButton: {
    padding: 5,
  },
});

export default VideoItem;
