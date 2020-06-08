export interface UserStory {
    title: string,
    description: string,
    status: string,
    storyPoints: number,
    owner: string,
    sprintId: string,
    projectId: string,
    isArchived: boolean
}
