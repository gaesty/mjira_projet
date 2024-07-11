import { View, Image, Text, ScrollView, TouchableOpacity, Dimensions, Modal, TextInput, Pressable, Alert, ActivityIndicator, FlatList } from 'react-native';
import styles from '@/assets/styles/style_projet';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { useLocalSearchParams } from 'expo-router';

const NavigationItem = ({ source, label, onPress }) => (
  <TouchableOpacity style={styles.navigationItemContainer} onPress={onPress}>
    <Image resizeMode="contain" source={{ uri: source }} style={styles.navItemImage} />
    <View style={styles.navigationItemLabelContainer}>
      <Text>{label}</Text>
    </View>
  </TouchableOpacity>
);

const ModalFormComponent = ({ projectId }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [Nom_tache, setNom] = useState("");
  const [MembreMail, setMembreMail] = useState("");
  const [Description_tache, setDescription_tache] = useState("");
  const [Priorite, setPriorite] = useState("Basse");
  const [Statut, setStatut] = useState("A Faire");

  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs());

  const handleConfirm = ({ date }) => {
    setStartDate(date);
    setEndDate(date);
    setModalVisible(false); // Close the modal after selecting the date
  };

  const resetForm = () => {
    setNom("");
    setMembreMail("");
    setDescription_tache("");
    setPriorite("Basse");
    setStatut("A Faire");
    setStartDate(dayjs());
    setEndDate(dayjs());
  };

  const handleSubmit = async () => {
    const formData = {
      MembreMail,
      projetID: projectId,
      Nom_tache,
      Description_tache,
      Priorite,
      Date_debut: startDate.toISOString().split("T")[0],
      Date_fin: endDate.toISOString().split("T")[0],
      Statut,
    };

    try {
      const response = await fetch("http://localhost:3000/api/tache", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log("Success:", data);
      Alert.alert("Success", "Data submitted successfully!");
      resetForm();
      setModalVisible(false);
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Error submitting data.");
    }
  };

  return (
    <View style={styles.modalContainer}>
      <Pressable
        style={styles.addButtonContainer}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.buttonText}>Créer une tâche</Text>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>×</Text>
            </Pressable>
            <Text style={styles.modalText}>Task Name:</Text>
            <TextInput
              style={styles.input}
              value={Nom_tache}
              onChangeText={setNom}
            />
            <Text style={styles.modalText}>Member Email:</Text>
            <TextInput
              style={styles.input}
              value={MembreMail}
              onChangeText={setMembreMail}
              keyboardType="email-address"
            />
            <Text style={styles.modalText}>Task Description:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={Description_tache}
              onChangeText={setDescription_tache}
              multiline
              numberOfLines={4}
            />
            <Text style={styles.modalText}>Priority:</Text>
            <Picker
              selectedValue={Priorite}
              style={styles.picker}
              onValueChange={(itemValue) => setPriorite(itemValue)}
            >
              <Picker.Item label="Low" value="Basse" />
              <Picker.Item label="Medium" value="Moyenne" />
              <Picker.Item label="High" value="Haute" />
            </Picker>
            <Text style={styles.modalText}>Status:</Text>
            <Picker
              selectedValue={Statut}
              style={styles.picker}
              onValueChange={(itemValue) => setStatut(itemValue)}
            >
              <Picker.Item label="To Do" value="A Faire" />
              {/* <Picker.Item label="In Progress" value="En Cours" />
              <Picker.Item label="Completed" value="Terminée" /> */}
            </Picker>
            <Text style={styles.modalText}>Task Date:</Text>
            <DateTimePicker
              mode="range"
              locale={'fr'}
              startDate={startDate}
              endDate={endDate}
              onChange={({ startDate, endDate }) => {
                setStartDate(startDate);
                setEndDate(endDate);
              }}
            />
            <Pressable onPress={handleSubmit}>
              <Text>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const ProjectInfoComponent = ({ projectId }) => {
  const [projectData, setProjectData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    console.log('http://localhost:3000/api/projet?_where=(ID,eq,'+projectId+')', projectId);  // Log to check if projectId is received correctly

    const fetchProjectData = async () => {
      try {
        const projectResponse = await fetch(`http://localhost:3000/api/projet?_where=(ID,eq,`+projectId+`)`);
        if (!projectResponse.ok) {
          throw new Error(`HTTP error! status: ${projectResponse.status}`);
        }
        const projectData = await projectResponse.json();
        setProjectData(projectData[0]);

        const tasksResponse = await fetch(`http://localhost:3000/api/tache?_where=(ProjetID,eq,`+projectId+`)`);
        if (!tasksResponse.ok) {
          throw new Error(`HTTP error! status: ${tasksResponse.status}`);
        }
        const tasksData = await tasksResponse.json();
        setTasks(tasksData);

        calculateCompletionPercentage(tasksData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectData();
  }, [projectId]);

  const calculateCompletionPercentage = (tasks) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.Statut === 'Terminée').length;
    const percentage = (completedTasks / totalTasks) * 100;
    setCompletionPercentage(percentage);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!projectData) {
    return <Text>Failed to load project data.</Text>;
  }

  return (
    <View>
      <Text style={styles.projectName}>{projectData.Nom_projet}</Text>
      <Text style={styles.deliveryDate}>Date de début : {new Date(projectData.Date_debut).toLocaleDateString()}</Text>
      <Text style={styles.deliveryDate}>Date de fin : {new Date(projectData.Date_fin).toLocaleDateString()}</Text>
      <Text style={styles.deliveryDate}>Pourcentage de complétion: {completionPercentage.toFixed(2)}%</Text>
      <View style={styles.completionBarContainer}>
        <View style={{...styles.completionBar, width: `${completionPercentage}%`}} />
      </View>
      <Text>Nombre de tâches à compléter : {tasks.filter(task => task.Statut !== 'Terminée').length}</Text>
    </View>
  );
};

const TaskListComponent = ({ projectId }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTaskList = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/tache?_where=(ProjetID,eq,`+projectId+`)`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTaskList();
  }, [projectId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => item.ID.toString()}
      renderItem={({ item }) => (
        <View style={styles.taskContainer}>
          <Text style={styles.taskTitle}>{item.Nom_tache}</Text>
          <Text>Email: {item.MembreMail}</Text>
          <Text>Project ID: {item.ProjetID}</Text>
          <Text>Description: {item.Description_tache}</Text>
          <Text>Priority: {item.Priorite}</Text>
          <Text>Start Date: {new Date(item.Date_debut).toLocaleDateString()}</Text>
          <Text>End Date: {new Date(item.Date_fin).toLocaleDateString()}</Text>
          <Text>Status: {item.Statut}</Text>
        </View>
      )}
    />
  );
};

const ProjectScreen = () => {
  const { width } = Dimensions.get('window');
  const isSmallScreen = width < 600;
  const { projectId } = useLocalSearchParams();

  const navigationItems = [
    {
      source: 'https://cdn.builder.io/api/v1/image/assets/TEMP/47d5b569d4c3aae9bb2092a302349ac456e4e082842c4b565c64a8dd0265bf4d?apiKey=18f62052b067435492d6e194104674e5&',
      label: 'Home',
      onPress: () => alert('Home Pressed')
    },
    {
      source: 'https://cdn.builder.io/api/v1/image/assets/TEMP/34016c56da58c36605882e4dd98fd72618cf6f038ad9163b05724c6563219a95?apiKey=18f62052b067435492d6e194104674e5&',
      label: 'Explore',
      onPress: () => alert('Explore Pressed')
    },
    {
      source: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c11025026ba665f81f24dc5319bd1225d4706633328deac7dd8d0bfca0830a1c?apiKey=18f62052b067435492d6e194104674e5&',
      label: 'Personal',
      onPress: () => alert('Personal Pressed')
    }
  ];

  return (
    <View style={[styles.container, isSmallScreen && styles.containerSmallScreen]}>
      <View style={[styles.containerLeft, isSmallScreen && styles.containerLeftSmallScreen]}>
        <View style={styles.sideNavContainer}>
          {navigationItems.map((item, index) => (
            <NavigationItem key={index} source={item.source} label={item.label} onPress={item.onPress} />
          ))}
          <ModalFormComponent projectId={projectId} />
        </View>
      </View>
      <ScrollView style={[styles.containerRight, isSmallScreen && styles.containerRightSmallScreen]}>
        <View style={styles.mainContentContainer}>
          <View style={styles.connectedPersonContainer}>
            <Text>Connected Person</Text>
          </View>
          <ProjectInfoComponent projectId={projectId} />
          <Text style={styles.taskTitle}>Tâches:</Text>
          <View style={styles.container}>
            <TaskListComponent projectId={projectId} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProjectScreen;