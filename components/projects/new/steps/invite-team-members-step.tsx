import { CreateInvitationForm } from "@/app/(protected)/(settings)/team/members/create-invitation-form"
import { Button } from "@/components/ui/button"
import { FormStepProps } from "@/lib/interfaces/project.interfaces"

export const InviteTeamMembersStep: React.FC<FormStepProps> = ({
  nextStep,
}) => {
  return (
    <div className="space-y-2">
      <CreateInvitationForm />
      
      <Button
        onClick={nextStep}
        // disabled={!projectName}
      >
       Skip
      </Button>
    </div>
  )
}
