import { useState } from 'react';
import { Text, View } from 'react-native';
import { Icon } from '../Icon';
import { Card, Button, FilterPills, AnimatedCard, ScalePress } from '../ui';
import { MOCK_DOCUMENTS } from '../../constants/mock-data';
import { theme } from '../../theme';
import { useUIStore } from '../../stores/ui.store';
import { useHaptics } from '../../hooks/useHaptics';

const CATEGORIES = ['All', 'Passports', 'Visas', 'Insurance', 'Tickets'];

export function TripDocuments() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const showToast = useUIStore((s) => s.showToast);
  const haptics = useHaptics();

  const filteredDocs = MOCK_DOCUMENTS.filter((doc) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Passports') return doc.category === 'passport';
    if (selectedCategory === 'Visas') return doc.category === 'visa';
    if (selectedCategory === 'Insurance') return doc.category === 'insurance';
    if (selectedCategory === 'Tickets') return doc.category === 'ticket';
    return true;
  });

  const handleDownload = (docTitle: string) => {
    haptics.success();
    showToast(`Downloading "${docTitle}"...`, 'success');
  };

  const handleAddDocument = () => {
    haptics.light();
    showToast('Document upload coming soon', 'info');
  };

  return (
    <View className="gap-4">
      {/* Category Filter Pills */}
      <FilterPills
        options={CATEGORIES}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Documents List */}
      <View className="gap-3">
        {filteredDocs.map((doc, index) => {
          let docIcon: any = 'FileText';
          let iconBg = '#F1F5F9';
          if (doc.category === 'passport') {
            docIcon = 'User';
            iconBg = '#DBEAFE';
          } else if (doc.category === 'visa') {
            docIcon = 'Globe';
            iconBg = '#FEF3C7';
          } else if (doc.category === 'insurance') {
            docIcon = 'ShieldCheck';
            iconBg = '#DCFCE7';
          } else if (doc.category === 'ticket') {
            docIcon = 'Ticket';
            iconBg = '#F3E8FF';
          }

          return (
            <AnimatedCard index={index} key={doc.id} className="p-4 flex-row items-center">
              <View
                className="h-12 w-12 rounded-xl items-center justify-center mr-4"
                style={{ backgroundColor: iconBg }}
              >
                <Icon name={docIcon} size={22} color={theme.colors.primary} />
              </View>
              <View className="flex-1">
                <Text className="text-body1 text-primary font-display">{doc.title}</Text>
                {doc.subtitle && (
                  <Text className="text-body2 text-slate font-sans mt-0.5">{doc.subtitle}</Text>
                )}
                {doc.expiryDate && (
                  <Text className="text-caption text-red-500 font-sans mt-1">
                    Expires: {doc.expiryDate}
                  </Text>
                )}
                {doc.reference && (
                  <Text className="text-caption text-slate font-sans mt-1">
                    Reference: {doc.reference}
                  </Text>
                )}
              </View>
              <ScalePress
                onPress={() => handleDownload(doc.title)}
                scaleValue={0.9}
                haptic={false}
                className="h-10 w-10 items-center justify-center"
                accessibilityRole="button"
                accessibilityLabel={`Download ${doc.title}`}
              >
                <Icon name="ArrowDownToLine" size={18} color={theme.colors.slate} />
              </ScalePress>
            </AnimatedCard>
          );
        })}
      </View>

      {/* Add Document Action */}
      <Button
        title="Add Document"
        icon="Plus"
        variant="secondary"
        onPress={handleAddDocument}
        className="mt-2"
      />
    </View>
  );
}

