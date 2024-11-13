"use client"

import { Github, Key, Link, User } from "lucide-react"
import { useFormContext } from "react-hook-form"

import { SubmitButton } from "@/components/common/submit-button"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { StepProps } from "@/lib/interfaces/project.interfaces"
import { addTestPlanFormIsSubmitting } from "@/lib/signals"
import { addTest } from "@/app/actions/add-test"

const GithubSetupSection: React.FC<StepProps> = ({ prevStep }) => {
  const form = useFormContext()

  return (
    <div className="text-center">
      <div className="flex flex-col items-center">
        <div className="mb-5 flex flex-col gap-4 max-w-[500px]">
          <h2 className="text-xl font-bold">Github Setup</h2>
          <p className="mb-5 mt-2 text-muted-foreground">
            Testorch uploads your test plans to your GitHub repository. Please
            provide your GitHub repository details below.
          </p>
        </div>

        <Card className="w-[480px] border-border bg-background">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              GitHub Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-sm text-muted-foreground">
              Please provide your GitHub repository details below.
            </p>
            <FormField
              disabled={addTestPlanFormIsSubmitting.value}
              control={form.control}
              name="githubRepo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Github className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="username/repo"
                        {...field}
                        defaultValue={form.getValues("githubRepo")}
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={addTestPlanFormIsSubmitting.value}
              control={form.control}
              name="githubAccessToken"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Access Token</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Key className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        type="password"
                        placeholder="ghp_xxxxxxxxxxxxxxxx"
                        {...field}
                        defaultValue={form.getValues("githubAccessToken")}
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={addTestPlanFormIsSubmitting.value}
              control={form.control}
              name="githubRepoOwner"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Repository Owner</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Enter GitHub Repository Owner"
                        {...field}
                        defaultValue={form.getValues("githubRepoOwner")}
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={addTestPlanFormIsSubmitting.value}
              control={form.control}
              name="githubApiUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API URL</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Link className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="https://api.github.com"
                        {...field}
                        defaultValue={form.getValues("githubApiUrl")}
                        className="pl-10"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <div className="mt-5 flex space-x-4">
          <Button disabled={addTestPlanFormIsSubmitting.value} variant="secondary" onClick={prevStep}>
            Back
          </Button>
            <SubmitButton
            disabled={
              (form.watch("githubApiUrl") === "" ||
              form.watch("githubRepoOwner") === "" ||
              form.watch("githubAccessToken") === "" ||
              form.watch("githubRepo") === "") ||
              addTestPlanFormIsSubmitting.value
            }
            >
            Add test
            </SubmitButton>
        </div>
      </div>
    </div>
  )
}

export default GithubSetupSection
