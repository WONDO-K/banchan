import { Subscriber } from "openvidu-browser";

export type IconName =
  | "record_voice_over"
  | "mic"
  | "videocam"
  | "radio_button_checked"
  | "radio_button_unchecked"
  | "headset_mic"
  | "exit_to_app"
  | "book"
  | "group"
  | "chat_bubble"
  | "notifications";

export interface ControlPanelsProps {
  onChatToggle: () => void;
  activeIcons: Record<IconName, boolean>;
  handleButtonClick: (icon: IconName) => void;
}

export interface ThumbnailPlayerProps {
  stream: MediaStream | null;
  className?: string;
}

export interface SubscriberListProps {
  subscribers: Subscriber[];
}

export interface LocationState {
  token: string;
  roomName: string;
  date: string;
  startTime: string;
  active: boolean;
}

export interface LargeButtonProps {
  title: string;
  to?: string;
  onClick?: () => void;
}

export interface SmallButtonProps {
  title?: string;
  bgColor?: string;
  txtColor?: string;
  borderColor?: string;
  onClick?: () => void;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  username: string;
  views: number;
  likes: number;
  createdAt: string;
}

export interface Meeting {
  id: number;
  roomName: string;
  startDate: string;
  startTime: string;
  session: string | null;
  createdAt: string | null;
  active: boolean;
}

export interface VoteGetType {
  data: VoteListType[];
}
export interface VoteListType {
  id: number;
  content: string;
  title: string;
  startDate: string;
  endDate: string;
  voteCount: number;
  finishCount: number;
  voted: boolean;
}

export interface CommunityGetType {
  content: CommunityListType[];
}
export interface CommunityListType {
  id: number;
  title: string;
  content: string;
  username: string;
  views: number;
  likes: number;
  createdAt: string;
}

export interface MultiSelectDropdownProps {
  options: string[];
  fieldName: string;
  selectedOptions: string[];
  setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
}
export interface VoteCreateType {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  questions: {
    questionText: string;
    options: string[];
  }[];
}
export interface Form {
  id: number;
  questionText: string;
  options: string[];
}

export interface PollItem {
  id: number;
  text: string;
}

export interface VoteCreateFormProps {
  id: number;
  onDelete: (id: number) => void;
  onChange: (
    id: number,
    data: { questionText: string; options: string[] }
  ) => void;
}

export interface VoteItemForm {
  option_id: number;
  option_text: string;
  vote_count: number;
}

export interface VoteFormProps {
  vote: {
    question_id: number;
    question_text: string;
    option_results: VoteItemForm[];
  };
}

export interface SidebarItemProps {
  icon: string;
  text: string;
  to: string;
}

export interface NavProps {
  children: React.ReactNode;
}

export interface NavItemProps {
  to: string;
  label: string;
}

export interface PageProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export interface TableProps {
  headers: string[];
  data: (string | number | React.ReactNode)[][];
}

export interface TableRowProps {
  row: (string | number | React.ReactNode)[];
}

export interface DataItem {
  [key: string]: string | number | boolean | React.ReactNode;
}

export interface CommunityParamsType {
  keyword: string;
  sortBy: string;
  sortDirection: string;
  page: number;
  size: number;
}

export interface Message {
  id: number;
  text: string;
}

export interface ChatBoxProps {
  onSendMessage: (message: string) => void;
  messages: Message[];
}
