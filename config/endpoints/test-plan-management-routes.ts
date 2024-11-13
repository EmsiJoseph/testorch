export const postUploadTestPlanRoute = "/test-plan-management/add-test-plan"
export const postUploadTestPlanRouteV2 = "/test-plan-management/add-test-plan-v2"

export const getTestPlansRoute = (projectName: string) =>
  `/test-plan-management/get-test-plans/${projectName}`

export const postStartTestPlanRoute = "/test-plan-management/start-test"

export const postStartTestPlanRouteV3 = "/test-plan-management/start-test-v3"
