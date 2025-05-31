import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import userEvent from "@testing-library/user-event";
import TextField from "./TextField";

// Define form field types.
type FormValues = {
  firstName: string;
};

// Utility component that wraps TextField in a useForm context.
const TestForm = ({
  disabled,
  error,
}: {
  disabled?: boolean;
  error?: string;
}) => {
  const { control } = useForm<FormValues>({
    defaultValues: { firstName: "" },
  });

  return (
    <form>
      <TextField<FormValues>
        {...{ disabled, error, control }}
        name="firstName"
        label="First Name"
      />
    </form>
  );
};

describe("TextField", () => {
  it("renders label", () => {
    // Check that the input with the correct label is rendered.
    render(<TestForm />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
  });

  it("displays error message", () => {
    // Render with error prop and verify error text is shown.
    render(<TestForm error="This field is required" />);

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("disables input when disabled=true", () => {
    // Check that the input is disabled when the prop is passed.
    render(<TestForm disabled />);

    expect(screen.getByLabelText(/first name/i)).toBeDisabled();
  });

  it("allows typing in the field", async () => {
    // Simulate typing in the field and verify the value updates.
    render(<TestForm />);

    const input = screen.getByLabelText(/first name/i);

    await userEvent.type(input, "John");

    expect(input).toHaveValue("John");
  });
});
