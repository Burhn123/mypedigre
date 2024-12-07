import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

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
        <View key={index} style={styles.routeContainer}>
          <View
            style={
              index % 2 === <Text>0</Text> ? styles.leftContainer : styles.rightContainer
            }
          >
            <Text style={styles.title}>{route.title}</Text>
            <Text style={styles.distance}>{route.distance}</Text>
            {route.rewards.map((reward, i) => (
              <Text key={i} style={styles.reward}>
                {reward}
              </Text>
            ))}
            <Text style={styles.note}>{route.note}</Text>
          </View>
        </View>
      ))}
      {/* Bu satırın sonunu görünebilir hale getirmek için */}
      <View style={styles.endSpace} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // ScrollView'un tüm alanı kapsamasını sağlıyor
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingBottom: 20, // ScrollView'un alt kısmına boşluk ekledim
  },
  verticalLine: {
    position: "absolute",
    width: 2,
    height: "100%",
    backgroundColor: "#000",
    left: "50%",
    transform: [{ translateX: +10 }],
  },
  routeContainer: {
    position: "relative",
    marginVertical: 70,
    width: "100%",
  },
  leftContainer: {
    position: "absolute",
    left: 0,
    width: "45%",
    alignItems: "flex-start",
    paddingLeft: 20,
  },
  rightContainer: {
    position: "absolute",
    right: 0,
    width: "45%",
    alignItems: "flex-start",
    paddingLeft: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  distance: {
    fontSize: 20,
    marginBottom: 5,
    fontWeight: "bold",
  },
  reward: {
    fontSize: 18,
    marginBottom: 2,
    fontWeight: "bold",
  },
  note: {
    fontSize: 16,
    fontStyle: "italic",
    marginTop: 5,
  },
  endSpace: {
    height: 80, // Alt kısmı tamamen görünür yapmak için boşluk ekledim
  },
});

export default Guzergahlar;
