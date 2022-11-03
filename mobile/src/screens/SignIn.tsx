import { Text, Center, Icon } from "native-base";
import { Button } from "../components/Button";
import { Fontisto } from "@expo/vector-icons";

import Logo from "../assets/logo.svg";

export function SignIn() {
    return (
        <Center flex={1} bgColor="gray.900" p={7}>
            <Logo width={212} height={40} />
            <Button title="ENTRAR COM GOOGLE" type="SECONDARY" mt={12}
                leftIcon={<Icon as={Fontisto} name="google" color="white" size="md" />} />

            <Text color="white" textAlign="center" mt={5}>
                Não iremos utilizar nenhuma informação alem {"\n"}do seu e-mail para a criação de sua conta.
            </Text>
        </Center>
    )
}