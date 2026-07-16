import { useState, useEffect } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { Icon } from '../Icon';
import { Card, Button, FilterPills, ProgressBar, FadeInUp } from '../ui';
import { theme } from '../../theme';
import { usePackingStore } from '../../stores/packing.store';
import { useUIStore } from '../../stores/ui.store';
import { useHaptics } from '../../hooks/useHaptics';
import Animated, { useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { useReducedMotion } from '../../hooks/useReducedMotion';

const CATEGORIES = ['All', 'Essentials', 'Clothing', 'Toiletries', 'Electronics'];

function PackingItemRow({
  item,
  onToggle,
}: {
  item: any;
  onToggle: () => void;
}) {
  const isReduced = useReducedMotion();
  const rowOpacity = useSharedValue(item.packed ? 0.6 : 1);
  const checkScale = useSharedValue(item.packed ? 1 : 0.8);

  useEffect(() => {
    if (isReduced) {
      rowOpacity.value = item.packed ? 0.6 : 1;
      checkScale.value = item.packed ? 1 : 0.8;
      return;
    }
    rowOpacity.value = withTiming(item.packed ? 0.6 : 1, { duration: 200 });
    checkScale.value = withSpring(item.packed ? 1 : 0.8, { damping: 10, stiffness: 200 });
  }, [item.packed, isReduced, rowOpacity, checkScale]);

  const animatedRowStyle = useAnimatedStyle(() => ({
    opacity: rowOpacity.value,
  }));

  const animatedCheckStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value }],
  }));

  return (
    <Pressable onPress={onToggle} style={{ width: '100%' }}>
      <Animated.View
        style={[animatedRowStyle]}
        className="flex-row items-center justify-between h-[52px] px-4"
        accessibilityRole="checkbox"
        accessibilityState={{ checked: item.packed }}
      >
        <Text
          className={`text-body1 font-sans ${
            item.packed ? 'text-slate line-through' : 'text-primary'
          }`}
        >
          {item.name}
        </Text>
        <Animated.View
          style={animatedCheckStyle}
          className={`h-6 w-6 rounded-lg border-2 items-center justify-center ${
            item.packed ? 'border-accent bg-accent' : 'border-neutral-300 bg-white'
          }`}
        >
          {item.packed && <Icon name="Check" size={14} color="white" strokeWidth={3} />}
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
}

export function TripPackingList() {
  const selectedCategory = usePackingStore((s) => s.selectedCategory);
  const setCategory = usePackingStore((s) => s.setCategory);
  const toggleItem = usePackingStore((s) => s.toggleItem);
  const addItem = usePackingStore((s) => s.addItem);
  const getFilteredItems = usePackingStore((s) => s.getFilteredItems);
  const getProgress = usePackingStore((s) => s.getProgress);

  const showToast = useUIStore((s) => s.showToast);
  const haptics = useHaptics();

  const [isAdding, setIsAdding] = useState(false);
  const [newItemName, setNewItemName] = useState('');

  const filteredItems = getFilteredItems();
  const { packed: packedCount, total: totalCount, percent: progressPercent } = getProgress();

  const handleToggle = (id: string, currentlyPacked: boolean) => {
    haptics.selection();
    toggleItem(id);
    if (!currentlyPacked) {
      showToast('Item packed!', 'success');
    }
  };

  const handleAddItemSubmit = () => {
    if (!newItemName.trim()) return;
    haptics.success();
    const category = selectedCategory === 'All' ? 'essentials' : selectedCategory.toLowerCase();
    addItem(newItemName.trim(), category as any, '1');
    setNewItemName('');
    setIsAdding(false);
    showToast('Item added', 'success');
  };

  return (
    <View className="gap-4">
      {/* Progress Header */}
      <Card className="p-4 bg-blue-50/50 border-blue-100">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-body1 text-primary font-display">Packing Progress</Text>
          <Text className="text-body2 text-accent font-bold">
            {packedCount}/{totalCount} packed
          </Text>
        </View>
        <ProgressBar percent={progressPercent} />
      </Card>

      {/* Category Pills */}
      <FilterPills
        options={CATEGORIES}
        selected={selectedCategory}
        onSelect={setCategory}
      />

      {/* Checklist */}
      <Card className="divide-y divide-border overflow-hidden">
        {filteredItems.map((item, index) => (
          <FadeInUp key={item.id} delay={index * 30} duration={300}>
            <PackingItemRow
              item={item}
              onToggle={() => handleToggle(item.id, item.packed)}
            />
          </FadeInUp>
        ))}

        {/* Inline Add Input */}
        {isAdding && (
          <View className="flex-row items-center h-[58px] px-4 gap-2 bg-gray-50/50">
            <TextInput
              value={newItemName}
              onChangeText={setNewItemName}
              placeholder="Enter item name..."
              placeholderTextColor="#94a3b8"
              autoFocus
              onSubmitEditing={handleAddItemSubmit}
              className="flex-1 h-10 text-body1 text-primary font-sans px-2 border border-neutral-200 rounded-lg bg-white"
            />
            <Pressable
              onPress={handleAddItemSubmit}
              className="h-10 px-3 bg-black rounded-lg items-center justify-center"
            >
              <Text className="text-caption text-white font-semibold">Add</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                haptics.light();
                setIsAdding(false);
                setNewItemName('');
              }}
              className="h-10 px-3 bg-neutral-200 rounded-lg items-center justify-center"
            >
              <Text className="text-caption text-slate font-semibold">Cancel</Text>
            </Pressable>
          </View>
        )}
      </Card>

      {/* Add Item Action */}
      {!isAdding && (
        <Button
          title="Add Packing Item"
          icon="Plus"
          variant="secondary"
          onPress={() => {
            haptics.light();
            setIsAdding(true);
          }}
          className="mt-2"
        />
      )}
    </View>
  );
}

