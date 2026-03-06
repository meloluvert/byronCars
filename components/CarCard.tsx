
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AuthenticatedImage from './AuthenticatedImage';

interface CarCardProps {
  id: string | number;
  name: string;
  imagePath: string;
  brand: string;
  price_per_day: number;
  onEdit?: (id: string | number) => void;
  onDelete?: (id: string | number) => void;
}

export default function CarCard({ id, name, imagePath, brand, price_per_day, onEdit, onDelete }: CarCardProps) {
  return (
    <View className="bg-white rounded-xl overflow-hidden mb-4 shadow-lg m-1">
      <View className="w-full h-32 bg-gray-200">
        {imagePath ? (
          <AuthenticatedImage
            imagePath={imagePath}
            className="w-full h-full"
            resizeMode="cover"
          />
        ) : (
          <View className="w-full h-full bg-gray-300 items-center justify-center">
            <Feather name="image" size={32} color="#9ca3af" />
          </View>
        )}
        <TouchableOpacity 
          className="absolute top-2 right-2 p-2 bg-gray-400/80 backdrop-blur-md rounded-full items-center justify-center"
          activeOpacity={0.7}
          onPress={() => onEdit?.(id)}
        >
          <Feather name="edit-2" size={16} color="#f9ec1e" />
        </TouchableOpacity>
      </View>

      <View className="p-3">
        <Text className="text-black font-bold text-sm mb-1" numberOfLines={1}>
          {name}
        </Text>

        <Text className="text-gray-500 text-xs mb-2">
          {brand}
        </Text>
        
        <View className="flex-row items-center justify-between">
          <Text className="text-black text-sm font-bold">R$ {price_per_day?.toFixed(2) || '0,00'}/dia</Text>

          <TouchableOpacity onPress={() => onDelete?.(id)}>
            <MaterialIcons name="delete" size={20} color="#757575" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

