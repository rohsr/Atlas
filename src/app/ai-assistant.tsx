import { useRouter } from 'expo-router';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '../components/Icon';
import { Card } from '../components/ui';
import { theme } from '../theme';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: string;
}

const INITIAL_SUGGESTIONS = [
  'Best beaches in Bali',
  'Help me packing for Paris',
  'Suggest dining in Tokyo',
  'What visa do I need for Japan?',
];

export default function AIAssistantScreen() {
  const router = useRouter();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      text: "Hello! I'm your Atlas Smart Assistant. Ask me anything about your upcoming journeys, packing lists, or destination recommendations.",
      sender: 'assistant',
      timestamp: '9:41 AM',
    },
  ]);

  const handleSend = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: `u-${Date.now()}`,
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: `a-${Date.now()}`,
        text: `I've looked up that details for you. Is there anything specific about that you'd like to explore next?`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1000);
  };

  const handleSuggestionPress = (suggestion: string) => {
    setInputText(suggestion);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header */}
        <View className="flex-row items-center justify-between px-6 pt-4 pb-2 border-b border-border bg-white">
          <View className="flex-row items-center gap-3">
            <Pressable
              onPress={() => router.back()}
              accessibilityRole="button"
              accessibilityLabel="Go back"
              className="h-10 w-10 items-center justify-center -ml-3"
            >
              <Icon name="ArrowLeft" size={24} color={theme.colors.primary} />
            </Pressable>
            <View>
              <Text className="text-body1 text-primary font-bold">Atlas AI Assistant</Text>
              <Text className="text-caption text-success font-sans">Always online</Text>
            </View>
          </View>
        </View>

        {/* Messages list */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerClassName="px-6 py-4 gap-4"
        >
          {messages.map((message) => {
            const isUser = message.sender === 'user';
            return (
              <View
                key={message.id}
                className={`flex-row ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                <View
                  className={`max-w-[80%] rounded-card p-4 border ${
                    isUser
                      ? 'bg-accent border-blue-600 text-white rounded-br-none'
                      : 'bg-white border-border rounded-bl-none shadow-card'
                  }`}
                >
                  <Text className={`text-body1 font-sans ${isUser ? 'text-white' : 'text-primary'}`}>
                    {message.text}
                  </Text>
                  <Text
                    className={`text-[10px] font-sans mt-1.5 ${
                      isUser ? 'text-white/70' : 'text-slate'
                    }`}
                  >
                    {message.timestamp}
                  </Text>
                </View>
              </View>
            );
          })}

          {/* Suggestions helper grid */}
          {messages.length === 1 && (
            <View className="mt-4">
              <Text className="text-caption text-slate font-display uppercase tracking-wider mb-3 ml-2">
                Suggested Topics
              </Text>
              <View className="flex-row flex-wrap gap-2">
                {INITIAL_SUGGESTIONS.map((suggestion) => (
                  <Pressable
                    key={suggestion}
                    onPress={() => handleSuggestionPress(suggestion)}
                    className="bg-white border border-border px-4 py-2.5 rounded-full shadow-card active:opacity-85"
                  >
                    <Text className="text-body2 text-primary font-sans">{suggestion}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}
        </ScrollView>

        {/* Input area */}
        <View className="flex-row items-center p-4 border-t border-border bg-white gap-3">
          <TextInput
            value={inputText}
            onChangeText={setInputText}
            placeholder="Ask me anything..."
            placeholderTextColor={theme.colors.slate}
            className="flex-1 h-12 bg-surface px-4 rounded-button text-body1 text-primary border border-border"
          />
          <Pressable
            onPress={handleSend}
            className="h-12 w-12 rounded-full bg-primary items-center justify-center active:opacity-80"
            accessibilityRole="button"
            accessibilityLabel="Send message"
          >
            <Icon name="Send" size={18} color="white" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
