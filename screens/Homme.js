import React, { useLayoutEffect, useState } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useEffect } from 'react'
import { Button, Pressable } from 'react-native'
import { useDispatch, useSelector } from "react-redux"
import { selectAnswers } from '../features/answer'
import Checkbox from 'expo-checkbox';
import data from "../features/data"
import { getQuestions } from "../features/answer"
import CountDown from 'react-native-countdown-component';
function Homme() {
    const dispatch = useDispatch()
    const [lastquie, setLastQuiz] = useState(true)
    const data = [{
        id: 1,
        answers: [{ label: "Rabat", correct: true }, { label: "Casablanca", correct: false }, { label: "Tanger", correct: false }, { label: "Fes", correct: false }],
        prompt: "Capitale du maroc ?",
        time: 60
    },
    {
        id: 2,
        answers: [{ label: "Espagne", correct: true }, { label: "italie", correct: false }, { label: "Belgique", correct: false }, { label: "Canada", correct: false }],
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
            setScore(score + 0)
            setcurrentQst(currentQst + 1)
        }



    }
    useEffect(() => {
        if (currentQst != data.length - 1) {
            setTimeout(() => {
                setcurrentQst(currentQst + 1)
            }, data[currentQst].time * 1000);
        }
    }, [currentQst]);
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

    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, []);

    return (

        <SafeAreaView className=''>
            <View className='bg-[#5FC8F8] p-20 rounded-b-xl drop-shadow-md'>
                <View className='flex flex-row-reverse mb-5'>
                    <View className='bg-[#F2F2F2] w-12 h-12 p-2 rounded-large '>
                        <View className='bg-[#4F4F4F] w-4 h-4 rounded-full ml-2 '>

                        </View>
                        <View className='bg-[#4F4F4F]  w-8 h-5 rounded-full '>

                        </View>
                    </View>

                </View>
                <View className=''>
                    <Text className='font-bold text-white text-xl'>Hi, User Name</Text>
                    <Text>Lorem ipsum dolort set amet</Text>
                </View>
            </View>
            <View className=" ">
                {lastquie &&
                    <View className='bg-white p-4 flex flex-row justify-evenly rounded-large -mt-12 w-80 ml-10 items-center' >
                        <View>
                            <Text>Question</Text>
                            <View className='bg-[#CFDFF3] p-3 rounded-large'>
                                <Text className='text-blue-600 font-bold text-xl'>{currentQst}/{data.length}</Text>
                            </View>
                        </View>
                        <View>
                            <Text>Temps écoule</Text>
                            <View className='flex flex-row'>
                                <View className='bg-[#CFDFF3] p-3 mr-2 rounded-large'>
                                    <Text className='text-blue-600 font-bold text-xl'>{data[currentQst].time}</Text>
                                </View>
                                <View className='bg-[#CFDFF3] p-3 rounded-large'>

                                    <CountDown
                                        until={data[currentQst].time * 1000}
                                        timeToShow={['S']}
                                        size={10}
                                        digitStyle={{ backgroundColor: '#CFDFF3' }}
                                        digitTxtStyle={{ color: 'orange', fontWeight: 'bold' }}
                                        className='text-xl'
                                        timeLabels={{ m: null, s: null }}

                                    />
                                </View>


                            </View>
                        </View>
                    </View>

                }



            </View >
            <View>
                <View>
                    {lastquie ?
                        < View className='p-10' >
                            <Text className='text-md font-bold'>Question {currentQst}</Text>
                            <Text className=''>
                                {data[currentQst].prompt}
                            </Text>

                            {
                                data[currentQst].answers.map(lab => (
                                    <View className='flex flex-row p-2' key={lab.label}>
                                        <Checkbox value={lab.correct} onValueChange={() => setOptionChosen(lab.correct)} />

                                        <Text className='ml-2 text-gray-500' >{lab.label}</Text>
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
                        <View className='bg-white p-10 drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] w-80 h-48 ml-10 mt-32 rounded-large'>
                            <View className='grid items-center'>
                                <Text className='font-bold text-xl'>Felecitation!</Text>
                                <Text>Voici Votre Score</Text>
                                <View className='bg-[#CFDFF3] w-12 h-12 p-2 rounded-large mt-2 mb-2'>
                                    <Text className='text-blue-600 font-bold text-xl'>{score}/{data.length}</Text>
                                </View>
                            </View>
                            <View className='grid items-center'>
                                <TouchableOpacity>
                                    <Pressable className='bg-[#5FC8F8] rounded-full  w-32 p-2   ' onPress={refaireQuiz}>
                                        <Text className='font-bold text-white text-center text-sm' >Refaire Le Quiz</Text>
                                    </Pressable>
                                </TouchableOpacity>
                            </View>
                        </View>

                    }

                </View >
            </View>
        </SafeAreaView >
    )
}


export default Homme