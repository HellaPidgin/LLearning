import React, { useContext } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { Container, ContainerWhiteSpace, LessonPanel } from ".";
import { AppProviderContext } from "../provider";
import { colors } from "../utils/colors";

const ScoreContainer = styled.View`
  flex: 1;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;

const ScoreText = styled.Text`
  color: ${colors.Eggshell};
  font-size: 25px;
  font-weight: bold;
`;

export default function quizComplete() {
    
  const globalAppState = useContext(AppProviderContext);
  
  return (
    <Container>
      <ContainerWhiteSpace />
      <LessonPanel>
          <ScoreContainer>
              <ScoreText> Your Score is: </ScoreText>
                <ScoreText>
                    {globalAppState.score}/{globalAppState.questionCounter}
                </ScoreText>
          </ScoreContainer>
      </LessonPanel>
    </Container>
  );
}
