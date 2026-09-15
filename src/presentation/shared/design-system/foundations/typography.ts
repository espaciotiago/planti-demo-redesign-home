import type { TextStyle } from 'react-native';

export type TextVariant =
  | 'display'
  | 'title'
  | 'heading'
  | 'body'
  | 'bodyMedium'
  | 'caption'
  | 'label';

export const typography: Record<TextVariant, Pick<TextStyle, 'fontFamily' | 'fontSize' | 'lineHeight'>> = {
  display: { fontFamily: 'Poppins_700Bold', fontSize: 40, lineHeight: 46 },
  title: { fontFamily: 'Poppins_600SemiBold', fontSize: 22, lineHeight: 28 },
  heading: { fontFamily: 'Poppins_600SemiBold', fontSize: 18, lineHeight: 24 },
  body: { fontFamily: 'Poppins_400Regular', fontSize: 15, lineHeight: 21 },
  bodyMedium: { fontFamily: 'Poppins_500Medium', fontSize: 15, lineHeight: 21 },
  caption: { fontFamily: 'Poppins_400Regular', fontSize: 12, lineHeight: 17 },
  label: { fontFamily: 'Poppins_600SemiBold', fontSize: 13, lineHeight: 18 },
};
