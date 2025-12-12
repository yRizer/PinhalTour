import { MainHeader } from '@/src/components/header';
import { rootColors, rootStyles } from '@/src/styles/styles';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { EVENTOS_EXEMPLO } from '../data/eventos';

export default function EventosScreen() {
  const opacity = useSharedValue(0);
  const [mesAtual, setMesAtual] = useState(new Date());
  const [dataSelecionada, setDataSelecionada] = useState<number | null>(null);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  useFocusEffect(
    useCallback(() => {
      opacity.value = withTiming(1, { duration: 500 });
      return () => {
        opacity.value = withTiming(0, { duration: 200 });
      };
    }, [])
  );

  // Funções para navegação do calendário
  const navegarMes = (direcao: 'anterior' | 'proximo') => {
    const novoMes = new Date(mesAtual);
    if (direcao === 'anterior') {
      novoMes.setMonth(mesAtual.getMonth() - 1);
    } else {
      novoMes.setMonth(mesAtual.getMonth() + 1);
    }
    setMesAtual(novoMes);
  };

  // Gerar dias do calendário
  const gerarDiasCalendario = () => {
    const ano = mesAtual.getFullYear();
    const mes = mesAtual.getMonth();
    const primeiroDia = new Date(ano, mes, 1);
    const ultimoDia = new Date(ano, mes + 1, 0);
    const diasNoMes = ultimoDia.getDate();
    const diaDaSemanaInicio = primeiroDia.getDay();

    // Dias do mês anterior
    const mesAnterior = new Date(ano, mes, 0);
    const diasMesAnterior = mesAnterior.getDate();
    const diasAnteriores = [];
    for (let i = diaDaSemanaInicio - 1; i >= 0; i--) {
      diasAnteriores.push({
        dia: diasMesAnterior - i,
        mesAtual: false,
      });
    }

    // Dias do mês atual
    const diasAtuais = [];
    for (let i = 1; i <= diasNoMes; i++) {
      diasAtuais.push({
        dia: i,
        mesAtual: true,
      });
    }

    // Dias do próximo mês
    const totalDias = diasAnteriores.length + diasAtuais.length;
    const diasRestantes = 35 - totalDias; // 5 semanas
    const diasProximos = [];
    for (let i = 1; i <= diasRestantes; i++) {
      diasProximos.push({
        dia: i,
        mesAtual: false,
      });
    }

    return [...diasAnteriores, ...diasAtuais, ...diasProximos];
  };

  const diasCalendario = gerarDiasCalendario();
  const nomesMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
                       'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  const diasSemana = ['SAB', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'DOM'];

  return (
    <Animated.View style={[rootStyles.container, animatedStyle]}>
      <MainHeader />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Calendário */}
        <View style={styles.calendarioContainer}>
          {/* Cabeçalho do calendário */}
          <View style={styles.calendarioHeader}>
            <Pressable onPress={() => navegarMes('anterior')} style={styles.navButton}>
              <Ionicons name="chevron-back" size={24} color={rootColors.marrom} />
            </Pressable>
            
            <Text style={styles.mesAnoTexto}>
              {nomesMeses[mesAtual.getMonth()]} {mesAtual.getFullYear()}
            </Text>
            
            <Pressable onPress={() => navegarMes('proximo')} style={styles.navButton}>
              <Ionicons name="chevron-forward" size={24} color={rootColors.marrom} />
            </Pressable>
          </View>

          {/* Dias da semana */}
          <View style={styles.diasSemanaContainer}>
            {diasSemana.map((dia, index) => (
              <View key={index} style={styles.diaSemanaCell}>
                <Text style={styles.diaSemanaTexto}>{dia}</Text>
              </View>
            ))}
          </View>

          {/* Grade do calendário */}
          <View style={styles.gradeCalendario}>
            {diasCalendario.map((item, index) => {
              const isDiaAtual = item.dia === mesAtual.getDate() && item.mesAtual;
              const isSelecionado = item.dia === dataSelecionada && item.mesAtual;
              
              return (
                <Pressable
                  key={index}
                  style={[
                    styles.diaCell,
                    isDiaAtual && styles.diaAtualCell,
                    isSelecionado && styles.diaSelecionadoCell,
                  ]}
                  onPress={() => item.mesAtual && setDataSelecionada(item.dia)}
                >
                  <Text
                    style={[
                      styles.diaTexto,
                      !item.mesAtual && styles.diaOutroMes,
                      (isDiaAtual || isSelecionado) && styles.diaTextoDestaque,
                    ]}
                  >
                    {item.dia}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Lista de Próximos Eventos */}
        <View style={styles.eventosContainer}>
          <Text style={styles.proximosEventosTitulo}>Próximos Eventos</Text>
          
          {EVENTOS_EXEMPLO.map((evento) => (
            <Pressable key={evento.id} style={styles.eventoCard}>
              <View style={styles.eventoData}>
                <Text style={styles.eventoDia}>{evento.dia}</Text>
                <Text style={styles.eventoMes}>{evento.mes}</Text>
              </View>
              
              <Text style={styles.eventoTitulo}>{evento.titulo}</Text>
              
              <View style={styles.eventoIcone}>
                <Ionicons name={evento.icone} size={28} color={rootColors.verde} />
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  calendarioContainer: {
    backgroundColor: rootColors.branco,
    margin: 16,
    marginBottom: 8,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calendarioHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navButton: {
    padding: 4,
  },
  mesAnoTexto: {
    fontSize: 18,
    fontWeight: '600',
    color: rootColors.marrom,
  },
  diasSemanaContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  diaSemanaCell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  diaSemanaTexto: {
    fontSize: 12,
    fontWeight: '500',
    color: rootColors.marrom,
    opacity: 0.7,
  },
  gradeCalendario: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  diaCell: {
    width: '14.28%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  diaAtualCell: {
    backgroundColor: rootColors.vinho,
  },
  diaSelecionadoCell: {
    backgroundColor: '#D4C4B0',
  },
  diaTexto: {
    fontSize: 16,
    color: rootColors.marrom,
  },
  diaOutroMes: {
    opacity: 0.3,
  },
  diaTextoDestaque: {
    color: rootColors.branco,
    fontWeight: '600',
  },
  eventosContainer: {
    padding: 16,
    paddingTop: 8,
    marginBottom: 25
  },
  proximosEventosTitulo: {
    fontSize: 20,
    fontWeight: '600',
    color: rootColors.marrom,
    marginBottom: 16,
  },
  eventoCard: {
    backgroundColor: rootColors.branco,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventoData: {
    backgroundColor: rootColors.vinho,
    borderRadius: 12,
    width: 60,
    height: 60,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  eventoDia: {
    fontSize: 24,
    fontWeight: 'bold',
    color: rootColors.branco,
  },
  eventoMes: {
    fontSize: 12,
    fontWeight: '600',
    color: rootColors.branco,
  },
  eventoTitulo: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: rootColors.marrom,
  },
  eventoIcone: {
    marginLeft: 8,
  },
});