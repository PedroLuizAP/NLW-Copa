import { Text, Center, Icon } from "native-base";
import { Button } from "../components/Button";
import { Fontisto } from "@expo/vector-icons";
import { useAuth } from "../hooks/useAuth";

import Logo from "../assets/logo.svg";

export function SignIn() {
    const { signIn, isUserLoading } = useAuth();
    return (
        <Center flex={1} bgColor="gray.900" p={7}>
            <Logo width={212} height={40} />
            <Button title="ENTRAR COM GOOGLE" type="SECONDARY" mt={12} onPress={signIn} isLoading={isUserLoading}
                leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />} _loading={{ _spinner: { color: "white" } }} />

            <Text color="white" textAlign="center" mt={5}>
                Não iremos utilizar nenhuma informação alem {"\n"}do seu e-mail para a criação de sua conta.
            </Text>
        </Center>
    )
}