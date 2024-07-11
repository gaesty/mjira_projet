import React, { useState } from "react";
import {
    Modal,
    View,
    Text,
    TextInput,
    Pressable,
    Alert,
} from "react-native";
import styles from '../assets/styles/style_projet.js';
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";

const ModalProject = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [Nom_projet, setNomProjet] = useState("");
    const [MembreMail, setMembreMail] = useState("");
    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());

    const handleSubmit = async () => {
        const formData = {
            MembreMail,
            Nom_projet,
            Date_debut: startDate.toISOString().split("T")[0],
            Date_fin: endDate.toISOString().split("T")[0],
        };

        try {
            const response = await fetch("http://localhost:3000/api/projet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log("Succès:", data);
            Alert.alert("Succès", "Projet créé avec succès !");
            setModalVisible(false);
            setNomProjet("");
            setMembreMail("");
            setStartDate(dayjs());
            setEndDate(dayjs());
        } catch (error) {
            console.error("Erreur:", error);
            Alert.alert("Erreur", "Erreur lors de la création du projet.");
        }
    };

    return (
        <View style={styles.container}>
            <Pressable
                style={styles.createProjectButtonContainer}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.buttonText}>Nouveau Projet</Text>
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
                        <Text style={styles.modalText}>Nom du projet :</Text>
                        <TextInput
                            style={styles.input}
                            value={Nom_projet}
                            onChangeText={setNomProjet}
                        />
                        <Text style={styles.modalText}>Email du membre :</Text>
                        <TextInput
                            style={styles.input}
                            value={MembreMail}
                            onChangeText={setMembreMail}
                            keyboardType="email-address"
                        />
                        <Text style={styles.modalText}>Date du projet :</Text>
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
                            <Text>Envoyer</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ModalProject;
