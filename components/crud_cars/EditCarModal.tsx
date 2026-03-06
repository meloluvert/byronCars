
import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView
} from 'react-native';
import { X, Camera, ImagePlus } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { EditCarRequest } from 'api/cars';
import AuthenticatedImage from '../AuthenticatedImage'; // Import the new component

export interface CarData {
  id: string;
  image: string;
  plate: string;
  color: string;
  year: number;
  name: string;
  brand: string;
  price_per_day: number;
  available: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

// This payload should match what carsApi.update expects
type EditCarRequestPayload = Omit<EditCarRequest, 'car_id'>;

interface EditCarModalProps {
  visible: boolean;
  car: CarData | null;
  onClose: () => void;
  onSubmit: (data: EditCarRequestPayload) => void;
}

export function EditCarModal({ visible, car, onClose, onSubmit }: EditCarModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price_per_day: '',
    year: '',
    color: '',
    plate: '',
  });
  
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [newImageUri, setNewImageUri] = useState<string | null>(null);

  useEffect(() => {
    if (car) {
      setFormData({
        name: car.name || '',
        brand: car.brand || '',
        price_per_day: car.price_per_day ? String(car.price_per_day) : '',
        year: car.year ? String(car.year) : '',
        color: car.color || '',
        plate: car.plate || '',
      });
      setOriginalImage(car.image);
      setNewImageUri(null);
    }
  }, [car]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const pickImage = async (mode: 'camera' | 'gallery') => {
    try {
      let result;
      if (mode === 'camera') {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão negada', 'Precisamos da câmera para tirar a foto.');
          return;
        }
        result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.8,
        });
      } else {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permissão negada', 'Precisamos de acesso à galeria.');
          return;
        }
        result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          quality: 0.8,
        });
      }

      if (!result.canceled && result.assets[0]) {
        setNewImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error("Erro ao selecionar imagem:", error);
    }
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.plate) {
      Alert.alert('Atenção', 'Preencha os dados principais.');
      return;
    }

    const payload: EditCarRequestPayload = {
      name: formData.name,
      brand: formData.brand,
      color: formData.color,
      plate: formData.plate,
      year: Number(formData.year) || new Date().getFullYear(),
      price_per_day: Number(formData.price_per_day) || 0,
      available: car?.available ?? true,
    };

    // Only add the 'file' property if a new image has been selected.
    if (newImageUri) {
      payload.file = newImageUri;
    }

    onSubmit(payload);
  };

  // The image to display is either the new local one or the original from the server
  const imageToDisplay = newImageUri || originalImage;

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-center items-center bg-white/50 px-4">
          <View className="w-full bg-[#333333] rounded-3xl p-5 shadow-2xl">
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="flex-row justify-between items-center mb-5">
                <Text className="text-white text-xl font-bold">Editar Veículo</Text>
                <TouchableOpacity onPress={onClose} className="p-1">
                  <X size={24} color="white" />
                </TouchableOpacity>
              </View>

              <View className="w-full h-48 bg-zinc-800 rounded-2xl mb-6 overflow-hidden items-center justify-center border border-zinc-700">
                {imageToDisplay ? (
                  <TouchableOpacity className="w-full h-full" onPress={() => pickImage('gallery')}>
                    <AuthenticatedImage
                      imagePath={imageToDisplay}
                      className="w-full h-full"
                      resizeMode="cover"
                    />
                  </TouchableOpacity>
                ) : (
                  <View className="flex-row gap-8">
                    <TouchableOpacity 
                      onPress={() => pickImage('camera')}
                      className="items-center justify-center bg-zinc-700 p-4 rounded-full"
                    >
                      <Camera size={32} color="#f9ec1e" />
                      <Text className="text-zinc-300 text-xs mt-2">Câmera</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => pickImage('gallery')}
                      className="items-center justify-center bg-zinc-700 p-4 rounded-full"
                    >
                      <ImagePlus size={32} color="#f9ec1e" />
                      <Text className="text-zinc-300 text-xs mt-2">Galeria</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <View className="flex-row justify-between mb-2">
                <TextInput
                  placeholder="Nome carro"
                  placeholderTextColor="#a1a1aa"
                  className="text-white text-xl font-bold flex-1"
                  value={formData.name}
                  onChangeText={(t) => handleChange('name', t)}
                />
                <TextInput
                  placeholder="Marca"
                  placeholderTextColor="#a1a1aa"
                  className="text-white text-xl font-bold flex-1 text-right"
                  value={formData.brand}
                  onChangeText={(t) => handleChange('brand', t)}
                />
              </View>

              <View className="flex-row justify-between mb-6">
                <TextInput
                  placeholder="Preço/h"
                  placeholderTextColor="#a1a1aa"
                  keyboardType="numeric"
                  className="text-white font-bold text-lg flex-1"
                  value={formData.price_per_day}
                  onChangeText={(t) => handleChange('price_per_day', t)}
                />
                <TextInput
                  placeholder="Ano"
                  placeholderTextColor="#a1a1aa"
                  keyboardType="numeric"
                  className="text-white font-bold text-lg flex-1 text-right"
                  value={formData.year}
                  onChangeText={(t) => handleChange('year', t)}
                />
              </View>

              <View className="flex-row gap-3 mb-6">
                <TextInput
                  placeholder="COR:"
                  placeholderTextColor="#52525b"
                  className="bg-white rounded-xl px-4 py-3 flex-1 font-semibold text-black"
                  value={formData.color}
                  onChangeText={(t) => handleChange('color', t)}
                />
                <TextInput
                  placeholder="PLACA: ABC-12345"
                  placeholderTextColor="#52525b"
                  autoCapitalize="characters"
                  className="bg-white rounded-xl px-4 py-3 flex-[1.5] font-semibold text-black"
                  value={formData.plate}
                  onChangeText={(t) => handleChange('plate', t)}
                />
              </View>

              <TouchableOpacity
                onPress={handleSubmit}
                activeOpacity={0.8}
                className="bg-[#f9ec1e] w-full py-4 rounded-xl items-center shadow-lg"
              >
                <Text className="text-black font-bold text-lg">Salvar Alterações</Text>
              </TouchableOpacity>
              
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

