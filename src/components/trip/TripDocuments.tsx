import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '../Icon';
import { Card, Button, FilterPills } from '../ui';
import { MOCK_DOCUMENTS } from '../../constants/mock-data';
import { theme } from '../../theme';

const CATEGORIES = ['All', 'Passports', 'Visas', 'Insurance', 'Tickets'];

export function TripDocuments() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredDocs = MOCK_DOCUMENTS.filter((doc) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Passports') return doc.category === 'passport';
    if (selectedCategory === 'Visas') return doc.category === 'visa';
    if (selectedCategory === 'Insurance') return doc.category === 'insurance';
    if (selectedCategory === 'Tickets') return doc.category === 'ticket';
    return true;
  });

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
        {filteredDocs.map((doc) => {
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
            <Card key={doc.id} className="p-4 flex-row items-center">
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
              <Pressable className="h-10 w-10 items-center justify-center">
                <Icon name="ArrowDownToLine" size={18} color={theme.colors.slate} />
              </Pressable>
            </Card>
          );
        })}
      </View>

      {/* Add Document Action */}
      <Button
        title="Add Document"
        icon="Plus"
        variant="secondary"
        onPress={() => {}}
        className="mt-2"
      />
    </View>
  );
}
