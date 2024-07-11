import React, { useState, useEffect } from 'react';
import { View, Image, Text, ActivityIndicator } from 'react-native';
import styles from '../assets/styles/style_projet.js';
import { useLocalSearchParams } from 'expo-router';

type ProjectInfoComponentProps = {
  projectId: string;
};

const { projectId } = useLocalSearchParams();


const ProjectInfoComponent: React.FC<ProjectInfoComponentProps> = ({ projectId }) => {
  const [projectData, setProjectData] = useState(5);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completionPercentage, setCompletionPercentage] = useState(0);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const projectResponse = await fetch(`http://localhost:3000/api/projet/4`);
        const projectData = await projectResponse.json();
        setProjectData(projectData[0]);

        const tasksResponse = await fetch('http://localhost:3000/api/tache');
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
      <Text style={styles.deliveryDate}>Membres</Text>
      <View style={styles.membersContainer}>
        <Image
          resizeMode="contain"
          source={{ uri: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b463cd2fb9cb717b2357227483fbe271a29631ef8ae2a7684ff026e9caa57d07?apiKey=18f62052b067435492d6e194104674e5&' }}
          style={styles.memberImage}
        />
      </View>
    </View>
  );
};

export default ProjectInfoComponent;
