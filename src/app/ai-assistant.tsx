import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '../components/Icon';
import { Card, AnimatedScreen, FadeInUp, ScalePress, TypingIndicator } from '../components/ui';
import { theme } from '../theme';
import { useHaptics } from '../hooks/useHaptics';

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
  const haptics = useHaptics();
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
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

    haptics.light();
    const userMessage: Message = {
      id: `u-${Date.now()}`,
      text: inputText,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      haptics.success();
      const assistantMessage: Message = {
        id: `a-${Date.now()}`,
        text: `I've looked up that details for you. Is there anything specific about that you'd like to explore next?`,
        sender: 'assistant',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 1200);
  };

  const handleSuggestionPress = (suggestion: string) => {
    haptics.light();
    setInputText(suggestion);
  };

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={['top', 'bottom']}>
      <AnimatedScreen className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1"
        >
          {/* Header */}
          <View className="flex-row items-center justify-between px-6 pt-4 pb-2 border-b border-border bg-white">
            <View className="flex-row items-center gap-3">
              <ScalePress
                onPress={() => router.back()}
                scaleValue={0.9}
                haptic={false}
                className="h-10 w-10 items-center justify-center -ml-3"
                accessibilityRole="button"
                accessibilityLabel="Go back"
              >
                <Icon name="ArrowLeft" size={24} color={theme.colors.primary} />
              </ScalePress>
              <View>
                <Text className="text-body1 text-primary font-bold">Atlas AI Assistant</Text>
                <Text className="text-caption text-success font-sans">
                  {isTyping ? 'Typing...' : 'Always online'}
                </Text>
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
                <FadeInUp key={message.id} delay={0} duration={250}>
                  <View
                    className={`flex-row ${isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <View
                      className={`max-w-[80%] rounded-card p-4 border ${
                        isUser
                          ? 'bg-accent border-blue-600 rounded-br-none'
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
                </FadeInUp>
              );
            })}

            {/* Bouncing Dots typing indicator */}
            {isTyping && <TypingIndicator />}

            {/* Suggestions helper grid */}
            {messages.length === 1 && !isTyping && (
              <FadeInUp delay={300} duration={350} className="mt-4">
                <Text className="text-caption text-slate font-display uppercase tracking-wider mb-3 ml-2">
                  Suggested Topics
                </Text>
                <View className="flex-row flex-wrap gap-2">
                  {INITIAL_SUGGESTIONS.map((suggestion) => (
                    <ScalePress
                      key={suggestion}
                      onPress={() => handleSuggestionPress(suggestion)}
                      scaleValue={0.96}
                      haptic={false}
                      className="bg-white border border-border px-4 py-2.5 rounded-full shadow-card"
                    >
                      <Text className="text-body2 text-primary font-sans">{suggestion}</Text>
                    </ScalePress>
                  ))}
                </View>
              </FadeInUp>
            )}
          </ScrollView>

          {/* Input area */}
          <View className="flex-row items-center p-4 border-t border-border bg-white gap-3">
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Ask me anything..."
              placeholderTextColor={theme.colors.slate}
              onSubmitEditing={handleSend}
              className="flex-1 h-12 bg-surface px-4 rounded-button text-body1 text-primary border border-border"
            />
            <ScalePress
              onPress={handleSend}
              scaleValue={0.9}
              haptic={false}
              className="h-12 w-12 rounded-full bg-primary items-center justify-center"
              accessibilityRole="button"
              accessibilityLabel="Send message"
            >
              <Icon name="Send" size={18} color="white" />
            </ScalePress>
          </View>
        </KeyboardAvoidingView>
      </AnimatedScreen>
    </SafeAreaView>
  );
}
