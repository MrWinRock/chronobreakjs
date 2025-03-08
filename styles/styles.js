import { StyleSheet } from "react-native";
import Colors from "../constant/Colors";
import TimeSelector from "../components/TimeSelector";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.backgroundColor,
    paddingTop: 50,
    paddingBottom: 150,
  },
  stopwatchContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.backgroundColor,
    paddingTop: 50,
    paddingBottom: 50,
  },
  button: {
    backgroundColor: Colors.buttonColor,
  },
  text: {
    color: Colors.textColor,
    fontSize: 20,
    fontWeight: 700,
    fontFamily: "Poppins",
  },
  worldClockIcon: {
    backgroundColor: Colors.secondaryColor,
    borderRadius: 35,
    padding: 2,
    position: "absolute",
    bottom: 5,
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  worldClockIconFocused: {
    backgroundColor: "#89b9fe",
  },

  // World Clock Screen #0ff
  timeContainer: {
    width: "100%",
    backgroundColor: Colors.cardColor,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 40,
    paddingHorizontal: 25,
    marginVertical: 5,
    borderRadius: 10,
  },
  cityName: {
    fontSize: 26,
    fontWeight: "bold",
    padding: 5,
    color: Colors.textCardColor,
  },
  timeDisplay: {
    fontSize: 32,
    fontWeight: "500",
    color: Colors.textCardColor,
  },
  headerContainer: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 36,
    fontWeight: "bold",
    color: Colors.textColor,
  },
  headerButton: {
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  headerButtonText: {
    color: Colors.textColor,
    fontSize: 36,
    fontWeight: 700,
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  countryCode: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.textColor,
  },
  cityItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderColor,
  },
  deletingContainer: {
    width: "40%",
    backgroundColor: "#db001f",
    borderTopEndRadius: 10,
    borderEndEndRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
  },
  deleteButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  deleteButtonText: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },

  // Time Zone Converter #
  picker: {
    height: 50,
    width: "100%",
    color: Colors.textColor,
    fontSize: 36,
    fontWeight: "bold",
    marginVertical: 20,
  },
  timezoneContainer: {
    marginTop: 20,
    backgroundColor: Colors.cardColor,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
    maxHeight: 360,
  },
  convertedTimeContainer: {
    marginVertical: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    paddingBottom: 10,
  },
  convertedText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#000",
  },
  convertedTime: {
    fontSize: 32,
    fontWeight: "500",
    color: "#000",
  },
  timePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  timePicker: {
    flex: 1,
    height: 150,
  },
  timeSelectorContainer: {
    padding: 10,
    alignItems: "center",
  },
  wheelContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollView: {
    height: 180,
    width: 100,
  },
  scrollViewContent: {
    paddingVertical: 60,
  },
  scrollItem: {
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
    padding: 0,
  },
  selectedItemText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#fff",
  },
  itemText: {
    fontSize: 50,
    fontWeight: "bold",
    color: "#a3cae0",
  },
  colonContainer: {
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  colon: {
    fontSize: 60,
    color: "#fff",
    fontWeight: "900",
    marginHorizontal: 10,
  },
  timezoneMain: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  // Timer #0ff
  timerDisplayContainer: {
    padding: 20,
    borderRadius: 10,
    height: 300,
  },
  timerDisplay: {
    marginTop: 60,
    fontSize: 50,
    fontWeight: "bold",
    color: Colors.textColor,
    textAlign: "center",
    marginVertical: 20,
  },
  timerButtonContainer: {
    marginTop: 50,
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  timerRunningButtonContainer: {
    flexDirection: "row",
    padding: 10,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  timerButton: {
    backgroundColor: Colors.buttonColor,
    padding: 20,
    margin: 10,
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  timerButtonDelete: {
    backgroundColor: "#c91d1d",
    padding: 20,
    margin: 10,
    borderRadius: 50,
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  timerButtonText: {
    color: Colors.textColor,
    fontSize: 14,
    fontWeight: "bold",
  },

  // Stopwatch #0ff
  timerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 200,
    marginBottom: 50,
    borderRadius: 10,
  },
  timer: {
    fontSize: 70,
    fontWeight: "700",
    fontFamily: "Inter-Bold",
    color: "#fff",
    textAlign: "left",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginBottom: 50,
  },
  stopwatchButton: {
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    marginHorizontal: 10,
  },
  startButton: {
    backgroundColor: "#1E90FF",
  },
  stopButton: {
    backgroundColor: "#FF4500",
  },
  lapButton: {
    backgroundColor: "#A9D7E7CC",
  },
  resetButton: {
    backgroundColor: "#A9D7E7CC",
  },
  buttonStart: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#fff",
  },
  buttonLap: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "#3d6a76",
  },
  lapContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  lapText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  separator: {
    height: 1,
    width: "100%",
    backgroundColor: "#fff",
    marginTop: 5,
  },
  separatorContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  flatListContainer: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
  },
  hmsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 340,
    marginVertical: 10,
  },
  hmsText: {
    fontSize: 22,
    fontWeight: "bold",
    justifyContent: "space-between",
    color: Colors.textColor,
  },

  // AddAlarm styles
  amcontainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  amheaderContainer: {
    padding: 20,
    backgroundColor: "#4A628A",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  amheader: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  amheaderButton: {
    marginLeft: 10,
  },
  amheaderButtonText: {
    fontSize: 24,
    color: "#fff",
  },
  alarmCard: {
    backgroundColor: "#fff",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  alarmText: {
    fontSize: 18,
    color: "#333",
  },
  aminput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 100,
    color: "#000",
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  aminputTransparent: {
    height: 50,
    borderColor: "#fff",
    paddingHorizontal: 10,
    color: "#B9B9B9",
    marginTop: 5,
    backgroundColor: "transparent",
    fontSize: 25,
  },
  amseparator: {
    height: 1,
    backgroundColor: "#000",
    marginVertical: 10,
  },
  settingsContainer: {
    backgroundColor: "#DCF5FC",
    borderRadius: 35,
    padding: 10,
  },
  settingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  settingText: {
    fontSize: 25,
    color: "#000",
  },
});

export default styles;
