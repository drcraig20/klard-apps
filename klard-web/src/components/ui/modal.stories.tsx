import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Modal, type ModalSize } from "./modal";

const meta = {
  title: "Navigation/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "A controlled modal component with size variants and optional overlay click handling. Built on top of Dialog primitives with a simplified API.",
      },
    },
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "full"],
      description: "Modal size variant",
    },
    closeOnOverlay: {
      control: "boolean",
      description: "Whether clicking the overlay closes the modal",
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default modal
export const Default: Story = {
  args: {
    open: false,
    onClose: () => {},
    title: "Modal Title",
    description: "This is a description of the modal content.",
    children: (
      <p className="text-sm text-muted-foreground">
        Modal content goes here. You can include any content like forms,
        information, or interactive elements.
      </p>
    ),
  },
  render: function Render(args) {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal</Button>
        <Modal {...args} open={open} onClose={() => setOpen(false)} />
      </>
    );
  },
};

// With footer actions
export const WithFooter: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal with Footer</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Confirm Action"
          description="Are you sure you want to proceed with this action?"
          footer={
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Confirm</Button>
            </>
          }
        >
          <p className="text-sm text-muted-foreground">
            This action will apply the changes to your account.
          </p>
        </Modal>
      </>
    );
  },
};

// Small size
export const SmallSize: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Small Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Small Modal"
          size="sm"
          footer={
            <Button onClick={() => setOpen(false)} className="w-full">
              Close
            </Button>
          }
        >
          <p className="text-sm text-muted-foreground">
            This is a small modal, good for quick confirmations.
          </p>
        </Modal>
      </>
    );
  },
};

// Medium size (default)
export const MediumSize: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Medium Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Medium Modal"
          description="This is the default size."
          size="md"
          footer={
            <Button onClick={() => setOpen(false)}>Close</Button>
          }
        >
          <p className="text-sm text-muted-foreground">
            Medium modals are suitable for most use cases.
          </p>
        </Modal>
      </>
    );
  },
};

// Large size
export const LargeSize: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Large Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Large Modal"
          description="This modal has more room for content."
          size="lg"
          footer={
            <Button onClick={() => setOpen(false)}>Close</Button>
          }
        >
          <p className="text-sm text-muted-foreground">
            Large modals work well for forms and detailed content.
          </p>
        </Modal>
      </>
    );
  },
};

// Extra large size
export const ExtraLargeSize: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Extra Large Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Extra Large Modal"
          description="For complex content that needs more space."
          size="xl"
          footer={
            <Button onClick={() => setOpen(false)}>Close</Button>
          }
        >
          <p className="text-sm text-muted-foreground">
            XL modals are great for complex forms or multi-step wizards.
          </p>
        </Modal>
      </>
    );
  },
};

// Full size
export const FullSize: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Full Size Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Full Size Modal"
          description="Maximum width modal for extensive content."
          size="full"
          footer={
            <Button onClick={() => setOpen(false)}>Close</Button>
          }
        >
          <p className="text-sm text-muted-foreground">
            Full size modals use the maximum available width.
          </p>
        </Modal>
      </>
    );
  },
};

// Form modal
export const FormModal: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Form Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Create Account"
          description="Fill in the details below to create your account."
          size="md"
          footer={
            <>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setOpen(false)}>Create Account</Button>
            </>
          }
        >
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" placeholder="John Doe" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="********" />
            </div>
          </div>
        </Modal>
      </>
    );
  },
};

// No overlay close
export const NoOverlayClose: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Modal (No Overlay Close)</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          title="Persistent Modal"
          description="This modal cannot be closed by clicking the overlay."
          closeOnOverlay={false}
          footer={
            <Button onClick={() => setOpen(false)}>Close</Button>
          }
        >
          <p className="text-sm text-muted-foreground">
            You must click the Close button or the X to dismiss this modal.
          </p>
        </Modal>
      </>
    );
  },
};

// Alert modal variants
export const AlertModals: Story = {
  render: function Render() {
    const [infoOpen, setInfoOpen] = useState(false);
    const [successOpen, setSuccessOpen] = useState(false);
    const [warningOpen, setWarningOpen] = useState(false);
    const [errorOpen, setErrorOpen] = useState(false);

    return (
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => setInfoOpen(true)}>
          Info
        </Button>
        <Modal
          open={infoOpen}
          onClose={() => setInfoOpen(false)}
          title="Information"
          size="sm"
          footer={<Button onClick={() => setInfoOpen(false)}>Got it</Button>}
        >
          <div className="flex items-start gap-3">
            <Info className="size-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              This is an informational message.
            </p>
          </div>
        </Modal>

        <Button variant="outline" onClick={() => setSuccessOpen(true)}>
          Success
        </Button>
        <Modal
          open={successOpen}
          onClose={() => setSuccessOpen(false)}
          title="Success"
          size="sm"
          footer={<Button onClick={() => setSuccessOpen(false)}>Continue</Button>}
        >
          <div className="flex items-start gap-3">
            <CheckCircle className="size-5 text-green-500 shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              Your changes have been saved successfully.
            </p>
          </div>
        </Modal>

        <Button variant="outline" onClick={() => setWarningOpen(true)}>
          Warning
        </Button>
        <Modal
          open={warningOpen}
          onClose={() => setWarningOpen(false)}
          title="Warning"
          size="sm"
          footer={
            <>
              <Button variant="outline" onClick={() => setWarningOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setWarningOpen(false)}>Proceed</Button>
            </>
          }
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="size-5 text-yellow-500 shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              This action may have unintended consequences.
            </p>
          </div>
        </Modal>

        <Button variant="destructive" onClick={() => setErrorOpen(true)}>
          Error
        </Button>
        <Modal
          open={errorOpen}
          onClose={() => setErrorOpen(false)}
          title="Error"
          size="sm"
          footer={<Button onClick={() => setErrorOpen(false)}>Dismiss</Button>}
        >
          <div className="flex items-start gap-3">
            <X className="size-5 text-red-500 shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">
              An error occurred while processing your request.
            </p>
          </div>
        </Modal>
      </div>
    );
  },
};

// Size comparison
export const SizeComparison: Story = {
  render: function Render() {
    const sizes: ModalSize[] = ["sm", "md", "lg", "xl", "full"];
    const [openSize, setOpenSize] = useState<ModalSize | null>(null);

    return (
      <div className="flex flex-wrap gap-2">
        {sizes.map((size) => (
          <Button key={size} variant="outline" onClick={() => setOpenSize(size)}>
            {size.toUpperCase()}
          </Button>
        ))}
        {sizes.map((size) => (
          <Modal
            key={size}
            open={openSize === size}
            onClose={() => setOpenSize(null)}
            title={`${size.toUpperCase()} Modal`}
            description={`This is a ${size} sized modal.`}
            size={size}
            footer={<Button onClick={() => setOpenSize(null)}>Close</Button>}
          >
            <p className="text-sm text-muted-foreground">
              Modal content with size: {size}
            </p>
          </Modal>
        ))}
      </div>
    );
  },
};

// Without title/description
export const MinimalModal: Story = {
  render: function Render() {
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setOpen(true)}>Open Minimal Modal</Button>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          size="sm"
        >
          <div className="text-center py-4">
            <CheckCircle className="size-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">Payment Successful</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Your payment has been processed.
            </p>
            <Button className="mt-4" onClick={() => setOpen(false)}>
              Continue
            </Button>
          </div>
        </Modal>
      </>
    );
  },
};
