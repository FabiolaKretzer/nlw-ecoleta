import React, { useState, useEffect, ChangeEvent } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { StyleSheet, View, Image, Text, ImageBackground, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import api from '../../services/api';

interface IbgeUfResponse {
    sigla: string
}

interface IbgeCityResponse {
    nome: string
}

const Home = () => {
    const navigation = useNavigation();

    const [selectedCity, setSelectedCity] = useState('0');
    const [selectedUf, setSelectedUf] = useState('0');

    const [ufs, setUfs] = useState<string[]>(['UFs não informados']);
    const [cities, setCities] = useState<string[]>(['Cidades não informadas']);

    useEffect(() => {
        api.get<IbgeUfResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then( response => {
            const ufInitials = response.data.map(umUf => umUf.sigla);
            setUfs(ufInitials);
        });
    }, []);

    useEffect(() => {
        if(selectedUf === '0') {
            return;
        }

        api.get<IbgeCityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/distritos`).then( response => {
            const cityNames = response.data.map(city => city.nome);
            setCities(cityNames);
        });
    }, [selectedUf]);

    function handleValueUf(uf: string){
        setSelectedUf(uf);
    }

    function handleValueCity(city: string){
        setSelectedCity(city);
    }

    function handleNavigateToPoints() {
        if(selectedUf === '0' && selectedCity === '0') {
            return;
        }

        navigation.navigate('Points', {
            selectedUf,
            selectedCity
        });
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
            <ImageBackground 
                source={require('../../assets/home-background.png')}
                style={styles.container}
                imageStyle={{ width: 274, height:368 }}
            >
                <View style={styles.main}>
                    <Image source={require('../../assets/logo.png')} />

                    <View>
                        <Text style={styles.title}>
                            Seu marketplace de coleta de resíduos
                        </Text>
                        <Text style={styles.description}>
                            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
                        </Text>
                    </View>
                </View>

                <View style={styles.footer}>
                    <RNPickerSelect
                        style={{viewContainer: styles.input}}
                        placeholder={{ label: "Selecione uma UF", value: null }}
                        onValueChange={(value) => handleValueUf(value)}
                        items={ufs.map((uf, index) => ({ key: String(index), label: uf, value: uf }))}
                    />
                    <RNPickerSelect
                        style={{viewContainer: styles.input}}
                        placeholder={{ label: "Selecione uma Cidade", value: null }}
                        onValueChange={(value) => handleValueCity(value)}
                        items={cities.map((city, index) => ({ key: String(index), label: city, value: city }))}
                    />

                    <RectButton style={styles.button} onPress={handleNavigateToPoints}>
                        <View style={styles.buttonIcon}>
                            <Icon name="arrow-right" color="#FFF" size={24}/>
                        </View>
                        <Text style={styles.buttonText}>
                            Entrar
                        </Text>
                    </RectButton>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
    },

    main: {
        flex: 1,
        justifyContent: 'center',
    },

    title: {
        color: '#322153',
        fontSize: 32,
        fontFamily: 'Ubuntu_700Bold',
        maxWidth: 260,
        marginTop: 64,
    },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 16,
        fontFamily: 'Roboto_400Regular',
        maxWidth: 260,
        lineHeight: 24,
    },

    footer: {},

    select: {},

    input: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        paddingVertical: 8,
        fontSize: 16,
    },

    button: {
        backgroundColor: '#34CB79',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    }
});

export default Home;