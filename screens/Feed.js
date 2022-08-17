import React, { useEffect, useState } from 'react'
import { Button, Text, View, Pressable } from 'react-native'
import { useDispatch, useSelector } from "react-redux"
import { selectAnswers } from '../features/answer'
import Checkbox from 'expo-checkbox';
import data from "../features/data"
import { getQuestions } from "../features/answer"
function Feed() {
    const dispatch = useDispatch()
    const [lastquie, setLastQuiz] = useState(true)
    const data = [{
        id: 1,
        answers: [{ label: "Rabat", correct: true }, { label: "Casablanca", correct: false }],
        prompt: "Capitale du maroc ?",
        time: 60
    },
    {
        id: 2,
        answers: [{ label: "Espagne", correct: true }, { label: "italie", correct: false }],
        prompt: "Dans quel pays peut-on trouver la Catalogne, l’Andalousie et la Castille ?",
        time: 30
    },
    {

        id: 3,
        answers: [{ label: "Vercingétorix", correct: false }, { label: "César", correct: true }, { label: "Attila", correct: false }],
        prompt: "Qui a dit: « Le sort en est jeté » (Alea jacta est) ? ",
        time: 60
    }]
    const answers = useSelector(selectAnswers)
    const [currentQst, setcurrentQst] = useState(0)
    const [isSelected, setSelection] = useState(false);

    const [isChecked, setChecked] = useState(false);
    const [OptionChosen, setOptionChosen] = useState("");
    const [score, setScore] = useState(0)
    const nextQuiz = () => {
        if (OptionChosen == true) {
            setScore(score + 1)
            alert(score)
            alert(OptionChosen)
            setcurrentQst(currentQst + 1)
        } else {
            alert("errrororo")
        }

    }
    const lastquiz = () => {
        if (OptionChosen == true) {
            setScore(score + 1)
        }
        setLastQuiz(false)
        setcurrentQst(0)
        setScore(score + 1)

    }
    const refaireQuiz = () => {
        setLastQuiz(true),
            setScore(0)
    }
    return (
        <View>
            {lastquie ?
                < View className='p-10' >
                    <Text className='text-md font-bold'>Question {currentQst}</Text>
                    <Text>
                        {data[currentQst].prompt}
                    </Text>

                    {
                        data[currentQst].answers.map(lab => (
                            <View className='flex flex-row p-2'>
                                <Checkbox value={lab.correct} onValueChange={() => setOptionChosen(lab.correct)} />

                                <Text className='ml-2' >{lab.label}</Text>
                            </View>
                        ))
                    }
                    {
                        currentQst == data.length - 1 ?
                            <Pressable className='bg-[#5FC8F8] rounded-full p-3 mt-20 ' onPress={lastquiz} >
                                <Text className='font-bold text-white text-center' >Last Quiz</Text>
                            </Pressable>
                            :
                            <Pressable className='bg-[#5FC8F8] rounded-full p-3 mt-20 ' onPress={nextQuiz}>
                                <Text className='font-bold text-white text-center' >Suivant</Text>
                            </Pressable>
                    }

                </View > :
                <View>
                    <Text>Your Score {score}</Text>
                    <Pressable className='bg-[#5FC8F8] rounded-full p-3 mt-20 ' onPress={refaireQuiz}>
                        <Text className='font-bold text-white text-center' >Refaire Le Quiz</Text>
                    </Pressable>

                </View>

            }

        </View >
    )
}

export default Feed