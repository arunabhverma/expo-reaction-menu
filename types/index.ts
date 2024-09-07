export type CHAT_ITEM = {
  id: string;
  userId: string;
  name: string;
  message: string;
  image?: string;
  reaction: string[];
};

export interface ReactionMenuType {
  isMenuOpen: boolean;
  setIsMenuOpen: (val: boolean) => void;
  isEven: boolean;
  children: React.ReactNode;
}

export interface ModalWrapperProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  emojiBarHeight: number;
  reactionMenuHeight: number;
}

export interface BubbleType {
  setIsMenuOpen: (val: boolean) => void;
  isEven: boolean;
  item: CHAT_ITEM;
}
