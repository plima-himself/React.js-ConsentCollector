import { render, screen } from "@testing-library/react";
import { FieldPath, useForm } from "react-hook-form";
import userEvent from "@testing-library/user-event";
import CheckboxGroup from "./CheckboxGroup";
import { CheckboxField } from "./types";

// Define the shape of the form data.
type FormValues = {
  acceptTerms: boolean;
  subscribeNewsletter: boolean;
};

// Define the checkbox fields that will be rendered.
const fields: CheckboxField<FieldPath<FormValues>>[] = [
  { name: "acceptTerms", label: "Accept Terms" },
  { name: "subscribeNewsletter", label: "Subscribe to Newsletter" },
];

// Utility component that wraps CheckboxGroup in a useForm context.
const TestForm = () => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      acceptTerms: false,
      subscribeNewsletter: true,
    },
  });

  return (
    <form>
      <CheckboxGroup<FormValues> label="Options" {...{ fields, control }} />
    </form>
  );
};

describe("CheckboxGroup", () => {
  it("renders group label", () => {
    // Render form and check if group label is visible.
    render(<TestForm />);

    expect(screen.getByText("Options")).toBeInTheDocument();
  });

  it("renders all checkbox options", () => {
    // Render form and check that both checkboxes are present.
    render(<TestForm />);

    expect(screen.getByLabelText("Accept Terms")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Subscribe to Newsletter")
    ).toBeInTheDocument();
  });

  it("checkboxes reflect default values", () => {
    // Render form and check initial state based on defaultValues.
    render(<TestForm />);

    expect(screen.getByLabelText("Accept Terms")).not.toBeChecked();
    expect(screen.getByLabelText("Subscribe to Newsletter")).toBeChecked();
  });

  it("checkbox toggles value on click", async () => {
    // Render form, simulate user clicking a checkbox, and verify state changes.
    render(<TestForm />);

    const checkbox = screen.getByLabelText("Accept Terms");

    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});
