import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const Guzergahlar = () => {
  const routes = [
    {
      title: "Final Yozgat",
      distance: "505km",
      rewards: ["1. 25.000 €", "2. 13.000 €", "3. 7.500 €"],
      note: "(Para Ödülüdür)",
    },
    {
      title: "Semi Final",
      distance: "324km",
      rewards: ["1. 2.500 €", "2. 2.000 €", "3. 1.500 €"],
      note: "(Para Ödülüdür)",
    },
    {
      title: "Aktivasyon Yarışı",
      distance: "324km",
      rewards: ["1. 2.500 €", "2. 2.000 €", "3. 1.500 €"],
      note: "(Para Ödülüdür)",
    },
    {
      title: "Yarış 4",
      distance: "200km",
      rewards: ["1. 1.000 €", "2. 750 €", "3. 500 €"],
      note: "(Para Ödülüdür)",
    },
    {
      title: "Yarış 5",
      distance: "150km",
      rewards: ["1. 1.200 €", "2. 900 €", "3. 600 €"],
      note: "(Para Ödülüdür)",
    },
    {
      title: "Yarış 6",
      distance: "180km",
      rewards: ["1. 1.500 €", "2. 1.000 €", "3. 700 €"],
      note: "(Para Ödülüdür)",
    },
    {
      title: "Yarış 7",
      distance: "220km",
      rewards: ["1. 2.000 €", "2. 1.500 €", "3. 1.000 €"],
      note: "(Para Ödülüdür)",
    },
    {
      title: "Yarış 8",
      distance: "300km",
      rewards: ["1. 3.000 €", "2. 2.500 €", "3. 2.000 €"],
      note: "(Para Ödülüdür)",
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.verticalLine} />
      {routes.map((route, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.title}>{route.title}</Text>
          <Text style={styles.distance}>{route.distance}</Text>
          {route.rewards.map((reward, i) => (
            <Text key={i} style={styles.reward}>
              {reward}
            </Text>
          ))}
          <Text style={styles.note}>{route.note}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  verticalLine: {
    position: "absolute",
    width: 2,
    height: "100%",
    backgroundColor: "#e0e0e0",
    left: "50%",
    transform: [{ translateX: -1 }],
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "90%",
    alignSelf: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  distance: {
    fontSize: 18,
    fontWeight: "600",
    color: "#666",
    marginBottom: 10,
  },
  reward: {
    fontSize: 16,
    color: "#444",
    marginBottom: 5,
  },
  note: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#888",
    marginTop: 10,
  },
});

export default Guzergahlar;
