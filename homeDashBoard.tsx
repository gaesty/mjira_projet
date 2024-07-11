import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import styles from '@/assets/styles/style_projet';
import ModalProject from '@/components/modalProject';
import ListTask from '@/components/listTaskProject';
import { Link, useRouter } from 'expo-router';

type ProjectProps = {
  ID: string;
  imageUri: string;
  Nom_projet: string;
  tasks: string;
};

const Project: React.FC<ProjectProps> = ({ ID, imageUri, Nom_projet, tasks }) => (
  <Link href={{ pathname: "/[homeProject]", params: { projectId: ID } }} asChild>
    <TouchableOpacity style={styles.projectContainerDash}>
      <Image source={{ uri: imageUri }} style={styles.projectImageDash} />
      <View style={styles.projectNameDash}>
        <Text style={styles.projectNameText}>{Nom_projet}</Text>
      </View>
      <View style={styles.projectTasksDash}>
        <Text>{tasks}</Text>
      </View>
    </TouchableOpacity>
  </Link>
);

const HomeDashBoard: React.FC = () => {
  const [projects, setProjects] = useState<ProjectProps[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/projet");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.containerDash}>
      <View style={styles.headerDash}>
        <View style={styles.headerSectionDash}>
          <View style={styles.headerLogoContainerDash}>
            <Image source={{ uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/feffa8040ba34f8e2d8189701d85bcd28c5881f24c2d5cc751683704fc76230f?apiKey=18f62052b067435492d6e194104674e5&" }} style={styles.headerLogoDash} />
            <Text style={styles.headerTitleDash}>Project Tracker</Text>
          </View>
        </View>
      </View>
      <View style={styles.contentDash}>
        <Text style={styles.overviewTitleDash}>Overview</Text>
        <Text style={styles.projectsHeadingDash}>Your projects</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <View style={styles.projectsContainerDash}>
            {projects.map((project, index) => (
              <Project
                key={index}
                ID={project.ID}
                imageUri={project.imageUri}
                Nom_projet={project.Nom_projet}
                tasks={project.tasks}
              />
            ))}
          </View>
        )}
        <ModalProject />
        <Text style={styles.tasksHeadingDash}>Your tasks</Text>
        <View style={styles.tasksContainerDash}>
          <ListTask />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeDashBoard;
