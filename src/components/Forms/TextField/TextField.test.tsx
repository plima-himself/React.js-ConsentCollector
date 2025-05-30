import { render, screen } from "@testing-library/react";
import { useForm } from "react-hook-form";
import userEvent from "@testing-library/user-event";
import TextField from "./TextField";

type FormValues = {
  firstName: string;
};

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
    render(<TestForm />);

    expect(screen.getByLabelText(/first name/i)).toBeInTheDocument();
  });

  it("displays error message", () => {
    render(<TestForm error="This field is required" />);

    expect(screen.getByText("This field is required")).toBeInTheDocument();
  });

  it("disables input when disabled=true", () => {
    render(<TestForm disabled />);

    expect(screen.getByLabelText(/first name/i)).toBeDisabled();
  });

  it("allows typing in the field", async () => {
    render(<TestForm />);

    const input = screen.getByLabelText(/first name/i);

    await userEvent.type(input, "John");

    expect(input).toHaveValue("John");
  });
});
