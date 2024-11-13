export interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  placeholder?: string;
}
