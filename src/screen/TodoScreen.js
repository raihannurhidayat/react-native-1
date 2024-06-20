import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { IconButton } from "react-native-paper";
import Fallback from "../components/Fallback";

const TodoScreen = () => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);

  const handleAddTodo = () => {
    if (todo === "") {
      alert("Please Enter Your Task ");
      return
    }
    try {
      setTodoList([
        ...todoList,
        {
          id: Date.now().toString(),
          title: todo,
        },
      ]);
    } catch (error) {
      alert(error);
    } finally {
      setTodo("");
    }
  };

  const handleTodoDelete = (id) => {
    const updateTodoList = todoList.filter((item) => item.id !== id);

    try {
      setTodoList(updateTodoList);
    } catch (error) {
      alert(error);
    } finally {
      setTodo("");
    }
  };

  const handleEditTodo = (todo) => {
    setEditedTodo(todo);
    setTodo(todo.title);
    // const todoSelected = todoList.filter((todo) => todo.id === id)
    // setTodo(todoSelected[0].title)
    // console.log(todoSelected[0].title);
  };

  const handleUpdate = () => {
    try {
      const updatedTodo = todoList.map((item) => {
        if (item.id === editedTodo.id) {
          return { ...item, title: todo };
        }
        return item;
      });
      setTodoList(updatedTodo);
      setEditedTodo(null);
      setTodo("");
    } catch (error) {}
  };

  const renderTodos = ({ item, index }) => {
    return (
      <View
        style={{
          backgroundColor: "#1e90ff",
          borderRadius: 6,
          paddingVertical: 12,
          paddingHorizontal: 6,
          marginBottom: 12,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.8,
          shadowRadius: 3,
          // elevation:
        }}
        key={index}
      >
        <Text
          style={{
            color: "#fff",
            fontSize: 20,
            fontWeight: "800",
            flex: 1,
            textTransform: "capitalize",
          }}
        >
          {item.title}
        </Text>
        <IconButton
          icon="pencil"
          iconColor="#fff"
          onPress={() => handleEditTodo(item)}
        />
        <IconButton
          icon="trash-can"
          iconColor="#fff"
          onPress={() => handleTodoDelete(item.id)}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        marginHorizontal: 16,
        marginTop: 36,
      }}
    >
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: "#1e90ff",
          borderRadius: 6,
          paddingVertical: 12,
          paddingHorizontal: 16,
        }}
        placeholder="Add A Task"
        value={todo}
        onChangeText={(inputText) => setTodo(inputText)}
      />
      {editedTodo ? (
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            paddingVertical: 12,
            borderRadius: 6,
            marginVertical: 34,
            alignItems: "center",
          }}
          onPress={() => handleUpdate()}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
            Save
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            paddingVertical: 12,
            borderRadius: 6,
            marginVertical: 34,
            alignItems: "center",
          }}
          onPress={() => handleAddTodo()}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>
            Add
          </Text>
        </TouchableOpacity>
      )}

      {/* Render Todo List */}

      {todoList.length <= 0 ? (
        <Fallback />
      ) : (
        <FlatList data={todoList} renderItem={renderTodos} />
      )}
    </View>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({});
