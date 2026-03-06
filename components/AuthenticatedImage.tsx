
import React, { useState, useEffect } from 'react';
import { Image, ImageProps, ActivityIndicator, View } from 'react-native';
import { getAuthHeaders } from '../api/config';
import { API_URL } from '../api/config';

interface AuthenticatedImageProps extends Omit<ImageProps, 'source'> {
  imagePath: string | null | undefined;
}

const AuthenticatedImage: React.FC<AuthenticatedImageProps> = ({ imagePath, style, ...rest }) => {
  const [imageData, setImageData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchImage = async () => {
      if (!imagePath || imagePath.startsWith('file://')) {
        setImageData(imagePath as any);
        return;
      }
      
      setLoading(true);
      setError(false);
      
      try {
        const headers = await getAuthHeaders();
        const response = await fetch(`${API_URL}/v1/car/image?image=${imagePath}`, { headers });

        if (!response.ok) {
          throw new Error('Failed to fetch image');
        }

        const blob = await response.blob();

        const reader = new FileReader();
        reader.onloadend = () => {
          setImageData(reader.result as string);
        };
        reader.onerror = () => {
          setError(true);
        };
        reader.readAsDataURL(blob);

      } catch (e) {
        console.error('Error fetching authenticated image:', e);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [imagePath]);

  if (loading) {
    return (
      <View style={[style, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color="#f9ec1e" />
      </View>
    );
  }

  if (error || !imageData) {
    return <View style={style} />;
  }

  return <Image source={{ uri: imageData }} style={style} {...rest} />;
};

export default AuthenticatedImage;
