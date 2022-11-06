import { useRoute } from '@react-navigation/native';
import { Box, useToast, FlatList } from 'native-base';
import { useState } from 'react';
import { api } from './../services/api';
import { useEffect } from 'react';
import { Game, GameProps } from './Game';
import { Loading } from './Loading';
import { EmptyMyPoolList } from './EmptyMyPoolList';
interface Props {
  pollId: string;
  code:string;
}

export function Guesses({ pollId: pollId, code }: Props) {
  const [isLoading, setIsLoading] = useState(true);
  const [firstTeamPoints, setFirstTeamPoints] = useState("");
  const [secondTeamPoints, setSecondTeamPoints] = useState("");
  const [games, setGames] = useState<GameProps[]>([]);
  const route = useRoute();
  const toast = useToast();

  async function fetchGames() {
    try {
      setIsLoading(true);

      const response = await api.get(`/polls/${pollId}/games`);
      console.log(response.data.games)
      setGames(response.data.games);
    }
    catch (ex) {
      toast.show({
        title: "Não foi possivel carregar o bolão.",
        placement: "top",
        bgColor: "red.500"
      });
    }
    finally {
      setIsLoading(false);
    }
  }

  async function handleGuessConfirm(gameId: string) {
    try {
      if (!firstTeamPoints.trim() || !secondTeamPoints.trim()) {
        return toast.show({
          title: "Informe o placar do palpite",
          placement: "top",
          bgColor: "red.500"
        });
      }

      await api.post(`/polls/${pollId}/games/${gameId}/guesses`, {
        firstTeamPoints: Number(firstTeamPoints),
        secondTeamPoints: Number(secondTeamPoints)
      });

      toast.show({
        title: "Palpite realizado com sucesso",
        placement: "top",
        bgColor: "green.500"
      });

      fetchGames();
    }
    catch (ex) {
      toast.show({
        title: "Não foi possivel enviar o palpite.",
        placement: "top",
        bgColor: "red.500"
      });
    }
    finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchGames();
  }, [pollId]);

  if (isLoading) {
    return <Loading />
  }

  return (
    <FlatList data={games} keyExtractor={item => item.id} ListEmptyComponent={() => <EmptyMyPoolList code={code} />} renderItem={({ item }) => (
      <Game data={item} setFirstTeamPoints={setFirstTeamPoints} setSecondTeamPoints={setFirstTeamPoints} onGuessConfirm={() => handleGuessConfirm(item.id)} />
    )} />
  );
}
