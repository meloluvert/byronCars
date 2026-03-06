
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import CarCard from '../components/CarCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { NewCarModal } from 'components/crud_cars/NewCarModal';
import { EditCarModal, CarData } from 'components/crud_cars/EditCarModal';
import { DeleteCarConfirmModal } from 'components/crud_cars/DeleteCarCornfirmModal';
import { carsApi, Car } from '../api/cars';
import { useAuth } from 'contexts/AuthContext';
import { API_URL } from 'api/config';

export default function Home() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [selectedCar, setSelectedCar] = useState<CarData | null>(null);
  const [selectedCarId, setSelectedCarId] = useState<string | null>(null);
  const { user, signOut } = useAuth();

  const fetchCars = useCallback(async (search?: string) => {
    try {
      if (search && search.length > 0) {
        const result = await carsApi.findByName(search);
        setCars(result);
      } else {
        const result = await carsApi.getAll();
        setCars(result);
      }
    } catch (error) {
      console.error('Erro ao buscar carros:', error);
      Alert.alert('Erro', 'Não foi possível carregar os carros.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchCars(searchQuery);
  }, [fetchCars, searchQuery]);

  const handleSearch = (text: string) => {
    setSearchQuery(text);
    fetchCars(text);
  };

  const handleCreateCar = async (data: any) => {
    try {
      await carsApi.create(data);
      setModalVisible(false);
      fetchCars(searchQuery);
      Alert.alert('Sucesso', 'Carro cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar carro:', error);
      Alert.alert('Erro', 'Não foi possível cadastrar o carro.');
    }
  };

  const handleEditCar = (car: Car) => {
    const carData: CarData = {
      id: car.id,
      image: car.image,
      plate: car.plate,
      color: car.color,
      year: car.year,
      name: car.name,
      brand: car.brand,
      price_per_day: car.price_per_day,
      available: car.available,
      created_at: car.created_at,
      updated_at: car.updated_at,
      user_id: car.user_id,
    };
    setSelectedCar(carData);
    setEditModalVisible(true);
  };

  const handleUpdateCar = async (data: any) => {
    try {
      await carsApi.update({ ...data, car_id: selectedCar?.id || '' });
      setEditModalVisible(false);
      setSelectedCar(null);
      fetchCars(searchQuery);
      Alert.alert('Sucesso', 'Carro atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao atualizar carro:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o carro.');
    }
  };

  const handleDeleteCar = (car: Car) => {
    setSelectedCarId(car.id);
    setDeleteModalVisible(true);
  };

  const confirmDeleteCar = async () => {
    if (!selectedCarId) return;
    
    try {
      await carsApi.delete(selectedCarId);
      setDeleteModalVisible(false);
      setSelectedCarId(null);
      fetchCars(searchQuery);
      Alert.alert('Sucesso', 'Carro excluído com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar carro:', error);
      Alert.alert('Erro', 'Não foi possível excluir o carro.');
    }
  };

  const getCarName = (id: string) => {
    const car = cars.find((c) => c.id === id);
    return car?.name || 'este veículo';
  };

  const renderCarItem = ({ item }: { item: Car }) => (
    <CarCard
      id={item.id}
      name={item.name}
      imagePath={item.image}
      brand={item.brand}
      price_per_day={item.price_per_day}
      onEdit={() => handleEditCar(item)}
      onDelete={() => handleDeleteCar(item)}
    />
  );

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#f9ec1e" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 pt-4">
        <Text className="text-black text-2xl font-bold mb-4">
          Olá, {user?.name}
        </Text>

        <View className="border border-gray-700 rounded-lg px-3 py-3 flex-row items-center gap-2 mb-6 bg-white">
          <Feather name="search" size={20} color="#696969" />
          <TextInput
            className="flex-1 text-black text-base"
            placeholder="Buscar carro..."
            placeholderTextColor=""
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      </View>

      <FlatList
        data={cars}
        renderItem={renderCarItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          paddingBottom: 100,
          paddingHorizontal: 12,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#f9ec1e"
            colors={['#f9ec1e']}
          />
        }
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center py-10">
            <Text className="text-gray-400 text-lg">Nenhum carro encontrado</Text>
          </View>
        }
      />
      
      <View className='absolute bottom-4 right-4'>
        <TouchableOpacity 
          className='p-4 bg-yellow-400 rounded-full items-center justify-center shadow-md' 
          onPress={() => setModalVisible(true)}
        >
          <AntDesign name="plus" size={24} color="black" />
        </TouchableOpacity>
        
        <NewCarModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          onSubmit={handleCreateCar}
        />
        
        <EditCarModal
          visible={editModalVisible}
          car={selectedCar}
          onClose={() => {
            setEditModalVisible(false);
            setSelectedCar(null);
          }}
          onSubmit={handleUpdateCar}
        />
        
        <DeleteCarConfirmModal
          visible={deleteModalVisible}
          carName={selectedCarId ? getCarName(selectedCarId) : undefined}
          onClose={() => {
            setDeleteModalVisible(false);
            setSelectedCarId(null);
          }}
          onConfirm={confirmDeleteCar}
        />
      </View>
    </SafeAreaView>
  );
}

