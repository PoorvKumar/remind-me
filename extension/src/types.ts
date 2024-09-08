export interface Link {
  id: number;
  url: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Reminder {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  status: "completed" | "pending" | "overdue";
  recurrence: string | null;
  links: Link[];
  tags: Tag[];
}

export interface RemindersResponse {
  reminders: Reminder[];
}
