import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '../Icon';
import { Card, Button, FilterPills, ProgressBar } from '../ui';
import { MOCK_PACKING_ITEMS } from '../../constants/mock-data';
import { theme } from '../../theme';

const CATEGORIES = ['All', 'Essentials', 'Clothing', 'Toiletries', 'Electronics'];

export function TripPackingList() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [items, setItems] = useState(MOCK_PACKING_ITEMS);

  const toggleItem = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const filteredItems = items.filter((item) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Essentials') return item.category === 'essentials';
    if (selectedCategory === 'Clothing') return item.category === 'clothing';
    if (selectedCategory === 'Toiletries') return item.category === 'toiletries';
    if (selectedCategory === 'Electronics') return item.category === 'electronics';
    return true;
  });

  const packedCount = items.filter((i) => i.packed).length;
  const totalCount = items.length;
  const progressPercent = totalCount > 0 ? Math.round((packedCount / totalCount) * 100) : 0;

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
        onSelect={setSelectedCategory}
      />

      {/* Checklist */}
      <Card className="divide-y divide-border overflow-hidden">
        {filteredItems.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => toggleItem(item.id)}
            className="flex-row items-center justify-between h-[52px] px-4 active:opacity-85"
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
            <View
              className={`h-6 w-6 rounded-lg border-2 items-center justify-center ${
                item.packed ? 'border-accent bg-accent' : 'border-neutral-300 bg-white'
              }`}
            >
              {item.packed && <Icon name="Check" size={14} color="white" strokeWidth={3} />}
            </View>
          </Pressable>
        ))}
      </Card>

      {/* Add Item Action */}
      <Button
        title="Add Packing Item"
        icon="Plus"
        variant="secondary"
        onPress={() => {}}
        className="mt-2"
      />
    </View>
  );
}
