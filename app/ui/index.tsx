import React, { useState } from 'react'
// React Native Dependencies
import { View, Text } from 'react-native'
import styled from "styled-components/native";
// Firebase Config
import { config } from "../../config";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
initializeApp(config);

import { Ionicons } from "@expo/vector-icons";
import { colors } from "../utils/colors";
// Quiz UI
// Wipe UI
// Quiz Updated UI

// React Native Styled Component Dependencies
const Container = styled.View`
    flex:1;
    background-color:${colors.GreenSheen};
`
const LessonPanel = styled.View`
    justify-content: space-between;
    flex:9;
    border-top-radius: 5px;
    background-color: ${colors.Independence};

`
const ContainerWhiteSpace = styled.View`
    flex:1;
`
const LessonPanelInteractiveContainer = styled.View`
    padding:10px;
    align-items:center;
`

const LessonPrompt = styled.Text`
    font-size: 12px;
    color: ${colors.Eggshell}
`
const LessonTranslation = styled.Text`
    font-size: 14px;
    color: ${colors.Eggshell};
`
const LessonTranslationHighlightedText = styled.Text`
    font-weight:bold;
    text-decoration-line: underline;
`
const MainLessonText = styled.Text`
    border-style: dotted;
    border-bottom-width: 1px;
    color: ${colors.Eggshell};
`;
const MainLessonMissingValue = styled.View`
    border-bottom-width: 1px;
    width: 10px;

`
const OptionalValueContainer = styled.View`
    padding: 5px;
    border-radius: 5px;
    background-color: ${colors.Eggshell}
`
const OptionalValueText = styled.Text`
    color: ${colors.Independence};
`
const LessonPanelContinueContainer = styled.View`
  padding-bottom: 10px;
  border-top-radius: 5px;
`;
const ContinueContainerText = styled.Text`
  color: ${colors.Eggshell};
`;

const ContinueContainerButton = styled.TouchableOpacity`
    border-radius: 5px;
    height: 10px; 
    width: 80%;
    background-color: ${colors.Eggshell};
    align-items: center
`
const ContinueContainerButtonText = styled.Text`
    color: ${colors.Independence}
`

const index = () => {
    const [missingTextSize, setMissingTextSize] = useState<number>(0)
    
    const courseListener = async () => {
      const db = getDatabase();
      console.log("Hello World");
      const reference = ref(db, "course");
      //console.log(reference)
      await onValue(reference, (snapshot) => {
        console.log(snapshot);
        console.log(snapshot.val());
      });
    };
    
    
    return (
        <View>
            <Text>Hello World</Text>
        </View>
    )
}

export default index;
