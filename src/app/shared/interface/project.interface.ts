export interface ProjectInterface {
  id: string;
  title: string;
  details: string;
  url: string;
  createdAt: Date;
  deadline: string;
  progress: number;
  member: string[];
  leader: string;
  estimateCost: number;
  status: string;
  tasks: TaskInterface[];
}

export interface TaskInterface {
  id?: string;
  title: string;
  description: string;
  labels?: string[];
  dueDate: string;
  status: string; // 0 = Todo, 1 = In Progress, 2 = In Review, 3 = Completed
  columnId?: string;
  cardId?: string;
  comments?: any[]; // Assuming comments can be of any type
  attachments?: any[]; // Assuming attachments can be of any type
  timeSpent?: number;
  timeEstimated?: number;
  members?: string[];
  subTasks?: any[]; // Assuming subTasks can be of any type
  isSubTask?: boolean;
  showSubTasks?: boolean;
  parentTask?: any; // Assuming parentTask can be of any type
  overridden?: boolean;
  editable?: boolean;
  removable?: boolean;
  canAddSubTask?: boolean;
  canRemove?: boolean;
  canEdit?: boolean;
  canDelete?: boolean;
  tags?: any[]; // Assuming tags can be of any type
  tagColors?: any[]; // Assuming tagColors can be of any type
  checklistItems?: any[]; // Assuming checklistItems can be of any type
  projectId: string;
  teamId: string;
  cost?: number; // Assuming cost can be of any type
}

export interface DeleteInterface {
  name: string;
  details: string;
}
export interface TeamInterface {
  id?: string;
  email: string;
  projectId: string;
  tasks?: TaskInterface[];
}
