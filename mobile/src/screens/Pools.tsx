import { VStack, Icon } from "native-base";
import { Header } from './../components/Header';
import { Button } from './../components/Button';
import { Octicons } from "@expo/vector-icons";

export function Pools() {
    return (
        <VStack flex={1} bgColor="gray.900">
            <Header title="Meus bolões" />
            <VStack mt={6} mx={5} borderBottomColor="gray.600" borderBottomWidth={1} mb={4} pb={4} >
                <Button leftIcon={<Icon as={Octicons} name="search" color="black" size="md"/>} title="BUSCAR BOLÃO POR OÓDIGO" />
            </VStack>
        </VStack>
    );
}