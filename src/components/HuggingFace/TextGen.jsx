import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Pipeline } from 'react-native-transformers';

const DEFAULT_MODEL = {
  name: 'distilgpt2',
  model: 'Xenova/distilgpt2_onnx-quantized',
  onnx_path: 'onnx/decoder_model.onnx',
};

export default function TextGen() {
  const [output, setOutput] = React.useState('');
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const loadModel = async () => {
    try {
      setIsLoading(true);
      setError(null);
      await Pipeline.TextGeneration.init(DEFAULT_MODEL.model, DEFAULT_MODEL.onnx_path);
    } catch (err) {
      setError('Failed to load model: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const generateText = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await Pipeline.TextGeneration.generate('Write something...');
      setOutput(result);
    } catch (err) {
      setError('Failed to generate text: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title={isLoading ? 'processing.....' : 'Load Model'} onPress={loadModel} disabled={isLoading} />
      <Button title="Generate Text" onPress={generateText} disabled={isLoading} />
      {error && <Text style={styles.error}>{error}</Text>}
      <Text style={styles.output}>Output: {output}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  output: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
});
