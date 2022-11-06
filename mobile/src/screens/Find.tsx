import { Heading, VStack, useToast } from "native-base";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useState } from 'react';
import { api } from './../services/api';
import { useNavigation } from '@react-navigation/native';

export function Find() {
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState("");
    const toast = useToast();
    const { navigate } = useNavigation();


    async function handleJoinPoll() {
        try {
            setIsLoading(true);

            if (!code.trim() || code.trim().length != 6) {
                return toast.show({
                    title: "Formato do codigo incorreto",
                    placement: "top",
                    bgColor: "red.500"
                });
            }

            await api.post("/polls/join", {code});

            toast.show({
                title: "Você entrou no bolão com Sucesso",
                placement: "top",
                bgColor: "green.500"
            });

            useState(false);

            navigate("pools");
        }
        catch (ex) {
            let message = "";

            switch (ex.response?.data?.message) {
                case "Poll not found":
                    message = "Bolão não encontrado"
                    break;

                case "You already joined in this poll":
                    message = "Você já está nesse bolão"
                    break;

                default:
                    message = "Erro ao buscar bolão"
            }


            toast.show({
                title: message,
                placement: "top",
                bgColor: "red.500"
            });

            setIsLoading(false);
        }
    }
    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Buscar por código" showBackButton />

            <VStack mt={8} mx={5} alignItems="center">
                <Heading fontFamily="heading" color="white" fontSize="xl" mb={8} textAlign="center">
                    Encontre um bolão através de seu código unico
                </Heading>

                <Input mb={2} placeholder="Qual o código do seu bolão?" autoCapitalize="characters" onChangeText={setCode} value={code} />

                <Button title="BUSCAR BOLÃO" isLoading={isLoading} onPress={handleJoinPoll} />
            </VStack>
        </VStack>
    );
}