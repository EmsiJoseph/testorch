import TestExecutionContainer from "@/components/tests/execute/test-exec-container"

export default function Test({ params }: { params: { testName: string } }) {
  return <TestExecutionContainer />
}
