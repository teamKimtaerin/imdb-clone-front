export interface NavigationBarProps {
  activeMenu?: string;
  onSearch?: (value: string) => void;
  onMenuClick?: (menu: string) => void;
}
