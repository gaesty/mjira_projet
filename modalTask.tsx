import React, { useState } from "react";
import { Modal, View, Text, TextInput, Pressable, Alert } from "react-native";
import styles from '../assets/styles/style_projet.js';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";

const ModalFormComponent = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [Nom_tache, setNom] = useState("");
    const [MembreMail, setMembreMail] = useState("");
    const [Description_tache, setDescription_tache] = useState("");
    const projetID = 5;
    const [Priorite, setPriorite] = useState("Basse");
    const [Statut, setStatut] = useState("A Faire");

    const [startDate, setStartDate] = useState(dayjs());
    const [endDate, setEndDate] = useState(dayjs());

    const handleConfirm = ({ date }) => {
        setStartDate(date);
        setEndDate(date);
        setModalVisible(false); // Close the modal after selecting the date
    };

    // Function to reset the form values
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
            projetID,
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
            // Reset form values after successful submission
            resetForm();
            // Refresh displayed data here if needed
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
                <Text style={styles.buttonText}>Create a Task</Text>
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
                            {/* <Picker.Item label="To Do" value="A Faire" /> */}
                            <Picker.Item label="In Progress" value="En Cours" />
                            <Picker.Item label="Completed" value="Terminée" />
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

export default ModalFormComponent;
