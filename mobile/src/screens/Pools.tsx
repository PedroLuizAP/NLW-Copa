import { VStack, Icon, useToast, FlatList } from "native-base";
import { Header } from './../components/Header';
import { Button } from './../components/Button';
import { Octicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { api } from "../services/api";
import { useCallback, useState } from 'react';
import { PoolCard, PollCardProps } from "../components/PoolCard";
import { Loading } from "../components/Loading";
import { EmptyPoolList } from "../components/EmptyPoolList";
import { useFocusEffect } from "@react-navigation/native"

export function Pools() {
    const [isLoading, setIsLoading] = useState(true);
    const [polls, setPolls] = useState<PollCardProps[]>([]);
    const { navigate } = useNavigation();
    const toast = useToast();

    async function fetchPolls() {
        try {
            setIsLoading(true);
            const response = await api.get("/polls");
            setPolls(response.data.polls);
        }
        catch {
            toast.show({
                title: "Não foi carregar os bolões.",
                placement: "top",
                bgColor: "red.500"
            });
        }
        finally {
            setIsLoading(false);
        }
    }

    useFocusEffect(useCallback(() => {
        fetchPolls();
    }, []));

    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Meus bolões" />
            <VStack mt={6} mx={5} borderBottomColor="gray.600" borderBottomWidth={1} mb={4} pb={4} >
                <Button leftIcon={<Icon as={Octicons} name="search" color="black" size="md" />} title="BUSCAR BOLÃO POR OÓDIGO"
                    onPress={() => navigate("find")} />
            </VStack>
            {
                isLoading ? <Loading /> :
                    <FlatList data={polls} keyExtractor={item => item.id} px={5} showsVerticalScrollIndicator={false} _contentContainerStyle={{ pb: 10 }}
                        renderItem={({ item }) => <PoolCard data={item} onPress={() => navigate("details", { id: item.id })} />}
                        ListEmptyComponent={<EmptyPoolList />} />
            }
        </VStack>
    );
}