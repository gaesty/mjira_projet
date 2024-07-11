import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  containerLeft: {
    flex: 1,
    width: '25%',
    backgroundColor: '#FFF',
    minWidth: 170,
    maxWidth: 170,
  },
  containerRight: {
    flex: 3,
    backgroundColor: '#FFF',
    minWidth: 400,
  },
  sideNavContainer: {
    padding: 20,
  },
  navigationItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 10,
  },
  navItemImage: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  navigationItemLabelContainer: {
    flexGrow: 1,
  },
  addButtonContainer: {
    backgroundColor: '#001787',
    alignItems: 'center',
    padding: 10,
    marginTop: 340,
    width: 130,
    borderRadius: 10,
  },
  createProjectButtonContainer: {
    backgroundColor: '#001787',
    alignItems: 'right',
    padding: 10,
    marginTop: 10,
    // width: 130,
    borderRadius: 10,
  },
  buttonText: {
    color: '#FFF',
  },
  mainContentContainer: {
    padding: 20,
  },
  projectName: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  deliveryDate: {
    fontSize: 16,
    color: '#4F6696',
    marginBottom: 16,
    fontWeight: "bold",
  },
  connectedPersonContainer: {
    padding: 6,
    backgroundColor: '#E8EBF2',
    marginBottom: 16,
    alignSelf: "flex-end",
  },
  completionBarContainer: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 10,
  },
  completionBar: {
    height: '100%',
    backgroundColor: '#001787',
  },
  membersContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  memberImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  taskItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  taskCheckboxContainer: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D6E8',
    marginRight: 8,
  },
  taskNameContainer: {
    flexGrow: 1,
  },
  dueDateContainer: {},
  viewMoreContainer: {
    alignItems: 'center',
    marginTop: 12,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    width: "100%",
    marginBottom: 15,
    paddingLeft: 10,
  },
  textArea: {
    height: 100,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  picker: {
    height: 50,
    width: "100%",
    marginBottom: 15,
  },
  dateText: {
    marginBottom: 15,
    textAlign: "center",
  },
  closeButton: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 1,
  },
  textStyle: {
    fontSize: 20,
    color: "black",
  },
  taskContainer: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Nouvelles propriétés ajoutées
  containerDash: {
    alignItems: "center",
    backgroundColor: "#F7FAFC",
    paddingBottom: 20,
    flexDirection: "column",
    paddingHorizontal: 16,
  },
  headerDash: {
    justifyContent: "space-between",
    alignItems: "stretch",
    borderColor: "rgba(229, 232, 235, 1)",
    borderBottomWidth: 1,
    alignSelf: "stretch",
    display: "flex",
    padding: 12,
    paddingHorizontal: 40,
    flexDirection: "row",
  },
  headerSectionDash: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
  },
  headerLogoContainerDash: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 16,
    fontSize: 18,
    color: "#0D121C",
    fontWeight: "700",
  },
  headerLogoDash: {
    width: 16,
    height: 16,
  },
  headerTitleDash: {
    fontFamily: "Inter, sans-serif",
  },
  headerSearchContainerDash: {
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#E8EBF2",
    display: "flex",
    flexDirection: "row",
    gap: 12,
    fontSize: 16,
    color: "#4F6696",
    fontWeight: "400",
    padding: 8,
    paddingHorizontal: 16,
  },
  headerSearchIconDash: {
    width: 24,
    height: 24,
  },
  headerSearchTextDash: {
    fontFamily: "Inter, sans-serif",
  },
  headerActionsDash: {
    justifyContent: "flex-end",
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  headerUpgradeContainerDash: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  headerUpgradeDash: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#E8EBF2",
    display: "flex",
    flexDirection: "column",
    fontSize: 14,
  color: "#0D121C",
    fontWeight: "700",
    letterSpacing: 0.21,
    padding: 10,
    paddingHorizontal: 16,
  },
  headerProfileContainerDash: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#E8EBF2",
    display: "flex",
    width: 40,
    height: 40,
    padding: 10,
  },
  headerProfileIconDash: {
    width: 20,
    height: 20,
  },
  headerHamburgerDash: {
    width: 40,
    height: 40,
  },
  contentDash: {
    display: "flex",
    marginTop: 36,
    width: "100%",
    maxWidth: 960,
    flexDirection: "column",
    alignItems: "stretch",
    color: "#0D121C",
    fontWeight: "700",
  },
  overviewTitleDash: {
    fontSize: 32,
    fontFamily: "Inter, sans-serif",
  },
  searchBoxDash: {
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E8EB",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    gap: 12,
    padding: 16,
    marginTop: 28,
  },
  searchIconDash: {
    width: 24,
    height: 24,
  },
  searchTextDash: {
    fontSize: 16,
    fontFamily: "Inter, sans-serif",
    color: "#4F6696",
  },
  projectsHeadingDash: {
    fontSize: 24,
    fontFamily: "Inter, sans-serif",
    marginTop: 36,
    marginBottom: 24,
  },
  projectsContainerDash: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
    justifyContent: "center",
  },
  projectContainerDash: {
    justifyContent: "space-between",
    alignItems: "stretch",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E8EB",
    borderWidth: 1,
    display: "flex",
    flexDirection: "column",
    gap: 12,
    padding: 16,
    width: "calc(33.333% - 16px)",
  },
  projectImageDash: {
    width: "100%",
    height: 80,
  },
  projectNameDash: {
    fontSize: 16,
    fontFamily: "Inter, sans-serif",
    fontWeight: "600",
  },
  projectTasksDash: {
    fontSize: 14,
    fontFamily: "Inter, sans-serif",
    fontWeight: "400",
  },
  newProjectButtonDash: {
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: "#E8EBF2",
    display: "flex",
    flexDirection: "column",
    fontSize: 16,
    color: "#0D121C",
    fontWeight: "700",
    letterSpacing: 0.21,
    marginTop: 28,
    padding: 10,
    paddingHorizontal: 16,
  },
  tasksHeadingDash: {
    fontSize: 24,
    fontFamily: "Inter, sans-serif",
    marginTop: 36,
    marginBottom: 24,
  },
  tasksContainerDash: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 24,
    justifyContent: "center",
  },
  taskItemDash: {
    justifyContent: "space-between",
    alignItems: "stretch",
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderColor: "#E5E8EB",
    borderWidth: 1,
    display: "flex",
    flexDirection: "row",
    gap: 12,
    padding: 16,
    width: "calc(33.333% - 16px)",
  },
  taskImageContainerDash: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  taskImageDash: {
    width: 40,
    height: 40,
  },
  taskContentDash: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  taskTitleDash: {
    fontSize: 16,
    fontFamily: "Inter, sans-serif",
    fontWeight: "600",
  },
  taskDescriptionDash: {
    fontSize: 14,
    fontFamily: "Inter, sans-serif",
    fontWeight: "400",
  },
  taskTimeDash: {
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
    fontSize: 12,
    fontFamily: "Inter, sans-serif",
    fontWeight: "400",
    color: "#4F6696",
  },
  containerSmallScreen: {
    flexDirection: 'column',
  },
  containerLeftSmallScreen: {
    width: '100%',
    maxWidth: '100%',
  },
  containerRightSmallScreen: {
    width: '100%',
    minWidth: '100%',
  },
  sideNavContainerSmallScreen: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  navigationItemContainerSmallScreen: {
    width: '30%',
    margin: 5,
  },
  projectNameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333', // Customize as per your design
  },
});


/* fonts */
export const FontFamily = {
  interRegular: "Inter-Regular",
  interMedium: "Inter-Medium",
  interBold: "Inter-Bold",
};
/* font sizes */
export const FontSize = {
  size_base: 16,
  size_sm: 14,
  size_lg: 18,
};
/* Colors */
export const Color = {
  colorWhitesmoke: "#f7fafc",
  colorGray: "#0d121c",
  colorSteelblue: "#4f6696",
  colorAliceblue: "#e8ebf2",
  colorRoyalblue: "#1a5ce6",
  colorLavender: "#d1d6e8",
};
/* Paddings */
export const Padding = {
  p_base_9: 16,
  p_xs: 12,
  p_base: 16,
  p_5xs: 8,
};
/* border radiuses */
export const Border = {
  br_5xs: 8,
  br_xs: 12,
};

export default styles;