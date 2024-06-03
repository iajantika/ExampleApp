export interface TodoItem {
    name: string;
    created: Date;
    inProgress?: Date;
    completed?: Date;
}
