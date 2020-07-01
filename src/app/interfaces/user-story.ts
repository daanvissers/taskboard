export interface UserStory {
    title: string,
    description: string,
    status: string,
    storyPoints: number,
    assignee: string,
    sprintId: string,
    projectId: string,
    isArchived: boolean,
    doneAt: number
}
