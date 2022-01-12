import React, { useEffect, useState } from "react";
// React Native Dependencies
import { View, Text, FlatList, ImageBackground } from "react-native";
import styled from "styled-components/native";
// Firebase Config
import { config } from "../../config";
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref } from "firebase/database";
initializeApp(config);

import { Ionicons } from "@expo/vector-icons";
const MessageBox = require("../images/messageBox.png"); 
import { colors } from "../utils/colors";
// Quiz UI
// Wipe UI
// Quiz Updated UI

// React Native Styled Component Dependencies
const BORDER_RADIUS_VALUE = "20px";
const MAIN_LESSON_FONT_SIZE = 20;
const Container = styled.View`
  flex: 1;
  background-color: ${colors.GreenSheen};
`;
const ContainerWhiteSpace = styled.View`
  flex: 1;
`;

const LessonPanel = styled.View`
  justify-content: space-between;
  flex: 9;
  border-top-left-radius: ${BORDER_RADIUS_VALUE};
  border-top-right-radius: ${BORDER_RADIUS_VALUE};
  background-color: ${colors.Independence};
`;
const LessonInteractiveContainer = styled.View`
  padding: 10px;
  align-items: center;
`;

const LessonPrompt = styled.Text`
  font-size: 12px;
  color: ${colors.Eggshell};
`;

const LessonTextAlignment = styled.View`
    flex-direction: row;
    justify-content: center;
    margin-bottom: 40px;
`
const LessonTranslation = styled.Text`
  font-size: 18px;
  color: ${colors.Eggshell};
  padding: 2px;
`;
const LessonTranslationHighlightedText = styled.Text`
  font-weight: bold;
  text-decoration-line: underline;
`;
const MainLessonText = styled.Text`
  border-style: dashed;
  padding: 5px;
  border-width: 1px;
  border-radius: 1px;
  border-color: ${colors.Eggshell}
  margin: 2px;
  font-size: ${MAIN_LESSON_FONT_SIZE}px;
  color: ${colors.Eggshell};
`;

const MessageBoxImage = styled.ImageBackground`
    width: 50px;
    height: 50px;
    justify-content:center;
    align-items: center;
    padding-bottom:10px;
`
const MessageBoxSpace = styled.View`
    width: 50px;
    height: 50px;
`
const AnswerValueContainer = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 15px;
  background-color: ${colors.Eggshell};
  margin: 5px;
  margin-top: 55px;
`;
const AnswerValueText = styled.Text`
  color: ${colors.Independence};
  font-weight: bold;
`;

const MainLessonMissingValue = styled.View`
  border-bottom-width: 1px;
  width: 40px;
  margin: 5px;
  height: ${MAIN_LESSON_FONT_SIZE + 55};
  border-color: ${colors.Eggshell};
`;
const OptionalValueContainer = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 15px;
  background-color: ${colors.Eggshell};
  margin: 5px;
`;
const OptionalValueEmpty = styled.View`
  padding: 10px;
  border-radius: 15px;
  height: 40px;
  width: 100px;
  background-color: ${colors.TerraCotta};
  margin: 5px;
`;
const OptionalValueText = styled.Text`
  color: ${colors.Independence};
  font-weight: bold;
`;
const LessonPanelContinueContainer = styled.View`
  padding-vertical: 10px;
  padding-bottom: 30px;
  border-top-left-radius: ${BORDER_RADIUS_VALUE};
  border-top-right-radius: ${BORDER_RADIUS_VALUE};
  justify-content: center;
  align-items: center;

`;
const ContinueContainerText = styled.Text`
  color: ${colors.Eggshell};
`;

const ContinueContainerButton = styled.TouchableOpacity`
  border-radius: ${BORDER_RADIUS_VALUE};
  padding: 15px;
  width: 80%;
  background-color: ${colors.Eggshell};
  align-items: center;
  justify-content:center;
`;
const ContinueContainerButtonText = styled.Text`
  color: ${colors.Independence};
  font-size: 15px;
  font-weight: bold;
`;

const index = () => {
  const [translationText, setTranslationText] = useState<String[]>([]);
  const [mainText, setMainText] = useState<String[]>([]);
  const [optionalValues, setOptionalValues] = useState<String[]>([]);
  const [answerValue, setAnswerValue] = useState<number | undefined>();
  const [missingValueIndex, setMissingValueIndex] = useState<number | undefined>();
  const [selectedTextIndex, setSelectedTextIndex] = useState<number | undefined>();

  const courseListener = async () => {
    const db = getDatabase();
    console.log("Hello World");
    const reference = ref(db, "course");
    //console.log(reference)
    await onValue(reference, (snapshot) => {
      setMissingValueIndex(snapshot.val().missingValueIndex);
      setOptionalValues(snapshot.val().availableAnswerOptions);
      setTranslationText(snapshot.val().translations);
      setMainText(snapshot.val().words);
    });
  };

  useEffect(() => {
    courseListener()
  }, [])

  return (
    <Container>
      <ContainerWhiteSpace />
      <LessonPanel>
        <LessonInteractiveContainer>
          <LessonPrompt>Fill in the missing word</LessonPrompt>
          <LessonTextAlignment>
            {translationText.map((text, index) => (
              <LessonTranslation>
                {index === missingValueIndex ? (
                  <LessonTranslationHighlightedText>
                    {text}
                  </LessonTranslationHighlightedText>
                ) : (
                  text
                )}
              </LessonTranslation>
            ))}
          </LessonTextAlignment>
          <LessonTextAlignment>
            {mainText.map((text, index) => (
              <>
                {index === missingValueIndex ? (
                  <>
                  {answerValue !== undefined? <AnswerValueContainer onPress={() => setAnswerValue(undefined)}>
                  <AnswerValueText>{optionalValues[answerValue]}</AnswerValueText>
                </AnswerValueContainer>:<MainLessonMissingValue />}
                </>) : (
                  <View>
                    {selectedTextIndex === index ? (
                      <MessageBoxImage source={MessageBox}>
                        <OptionalValueText>
                          {translationText[index]}
                        </OptionalValueText>
                      </MessageBoxImage>
                    ) : (
                      <MessageBoxSpace />
                    )}

                    <MainLessonText onPress={() => setSelectedTextIndex(index)}>
                      {text}
                    </MainLessonText>
                  </View>
                )}
              </>
            ))}
          </LessonTextAlignment>

          <FlatList
            contentContainerStyle={{ alignItems: "center" }}
            data={optionalValues}
            renderItem={(item) => (
              <>
              {answerValue !== item.index?
                <OptionalValueContainer onPress={() => setAnswerValue(item.index)}>
                  <OptionalValueText>{item.item}</OptionalValueText>
                </OptionalValueContainer>:
                <OptionalValueEmpty />
                }
              </>
            )}
            numColumns={2}
          />
        </LessonInteractiveContainer>
        <LessonPanelContinueContainer>
          <ContinueContainerButton>
            <ContinueContainerButtonText>
              {answerValue === undefined ? "CONTINUE" : "CHECK YOUR ANSWER"}
            </ContinueContainerButtonText>
          </ContinueContainerButton>
        </LessonPanelContinueContainer>
      </LessonPanel>
    </Container>
  );
};

export default index;
