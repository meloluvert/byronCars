import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { X } from 'lucide-react-native';

interface DeleteCarConfirmModalProps {
  visible: boolean;
  carName?: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteCarConfirmModal({ visible, carName, onClose, onConfirm }: DeleteCarConfirmModalProps) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-center items-center bg-white/50 px-4">
          <View className="w-full bg-[#333333] rounded-3xl p-5 shadow-2xl">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-white text-xl font-bold flex-1 pr-4">
                Tem certeza que deseja excluir {carName || 'este veículo'}?
              </Text>
              <TouchableOpacity onPress={onClose} className="p-1">
                <X size={24} color="white" />
              </TouchableOpacity>
            </View>

            <View className="flex-row gap-3">
              <TouchableOpacity
                onPress={onClose}
                activeOpacity={0.8}
                className="bg-zinc-600 flex-1 py-4 rounded-xl items-center shadow-lg"
              >
                <Text className="text-white font-bold text-lg">Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleConfirm}
                activeOpacity={0.8}
                className="bg-yellow-300 flex-1 py-4 rounded-xl items-center shadow-lg"
              >
                <Text className="text-black font-bold text-lg">Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

