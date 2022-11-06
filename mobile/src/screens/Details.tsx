import { useToast, VStack, HStack } from "native-base";
import { Share } from "react-native";
import { Header } from './../components/Header';
import { useRoute } from "@react-navigation/native";
import { useState } from 'react';
import { Loading } from "../components/Loading";
import { api } from './../services/api';
import { useEffect } from 'react';
import { PollCardProps } from './../components/PoolCard';
import { Option } from './../components/Option';
import { PoolHeader } from './../components/PoolHeader';
import { EmptyMyPoolList } from "../components/EmptyMyPoolList";

interface RouteParams {
    id: string;
}

export function Details() {
    const [optionSelected, setOptionSelected] = useState<"guesses" | "ranking">("guesses");
    const [isLoading, setIsLoading] = useState(true);
    const [pollDetails, setPollDetails] = useState<PollCardProps>({} as PollCardProps);
    const route = useRoute();
    const { id } = route.params as RouteParams;
    const toast = useToast();


    async function fetchPollDetails() {
        try {
            setIsLoading(true);

            const response = await api.get(`/polls/${id}`);
            setPollDetails(response.data.poll);
        }
        catch (ex) {
            toast.show({
                title: "Não foi carregar possivel o bolão.",
                placement: "top",
                bgColor: "red.500"
            });
        }
        finally {
            setIsLoading(false);
        }
    }

  async function hadleCodeShare() {
    await Share.share({message: pollDetails.code});
  }

    useEffect(() => {
        fetchPollDetails();
    }, [id]);

    if (isLoading) return <Loading />

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title={pollDetails.title} showBackButton showShareButton onShare={hadleCodeShare} />
            {
                pollDetails._count?.participant > 0 ? 
                <VStack px={5} flex={1}>
                    <PoolHeader data={pollDetails}/>
                    <HStack bgColor="gray.800" p={1} rounded="sm" mb={5}>
                        <Option title="Seus palpites" isSelected={optionSelected === "guesses"} onPress={() => setOptionSelected("guesses")}/>
                        <Option title="Ranking do grupo"isSelected={optionSelected === "ranking"} onPress={() => setOptionSelected("ranking")}/>
                    </HStack>
                </VStack>
                :
                <EmptyMyPoolList code={pollDetails.code}/>
            }
        </VStack>
    );
}