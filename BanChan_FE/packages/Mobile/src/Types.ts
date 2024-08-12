import { ReactNode } from "react";
export interface SidebarItemProps {
  icon: string;
  text: string;
  to: string;
  children?: ReactNode;
}

export interface SwipeableContentProps {
  items: Array<{ question: string; options: string[] }>;
}

export interface DrawerProps {
  title: string;
  items: Array<{
    title: string;
    date: string;
    buttonText: string;
    statusText: string;
    onClick: () => void;
  }>;
}

export interface CalendarDrawerProps {
  title: string;
}

export interface HeaderProps {
  children: React.ReactNode;
}

export interface Items {
  title: string;
  date: string;
  buttonText: string;
  statusText: string;
}

// 이 밑은 type것


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
  admin: boolean;
  writer : boolean;
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

export interface VoteDetailType {
  id : number,
  title : string,
  content : string,
  imageUrl : string|null,
  startDate : string,
  endDate : string,
  createdAt : string,
  questions : voteQuestion[]
}

interface voteQuestion {
  questionId : number,
  questionText : string,
  options : voteOption[]
}
interface voteOption {
  id : number,
  optionText : string
}

export interface VoteType {
  voteId : number,
  responses : OptionType[]
}

interface OptionType {
  questionId : number
  optionId : number
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
  optionId: number;
  optionText: string;
  voteCount: number;
}

export interface VoteFormProps {
  vote: {
    questionId: number;
    questionText: string;
    optionResults: VoteItemForm[];
  };
}
interface VoteResultItems {
    questionId: number;
    questionText: string;
    optionResults: VoteItemForm[];
}
export interface VoteResultType {

  voteId : number;
  content : string;
  title : string;
  questionResults: VoteResultItems[]
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

export interface UpdateProps {
  title:string
  content : string
}