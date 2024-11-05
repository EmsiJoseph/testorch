export interface ITestPlan {
    name: string
    status: "Passed" | "Failed" | "In Progress"
    executedOn: string
    completedOn: string
    duration: string
    testType: string
    project: string
}

export interface IPostRequestResponse<T> {
    success?: boolean;
    message: string;
    data?: T;
}