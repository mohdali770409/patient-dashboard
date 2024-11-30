export interface sidebarItem {
  title: string;
  svgUrl: string;
  route: string;
  isSelected: boolean;
  description?: string;
}
export interface FileWithPreview extends File {
  preview: string;
  type: 'image' | 'video';
}