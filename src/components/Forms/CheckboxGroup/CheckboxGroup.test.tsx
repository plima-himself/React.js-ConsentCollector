import { render, screen } from "@testing-library/react";
import { FieldPath, useForm } from "react-hook-form";
import userEvent from "@testing-library/user-event";
import CheckboxGroup from "./CheckboxGroup";
import { CheckboxField } from "./types";

type FormValues = {
  acceptTerms: boolean;
  subscribeNewsletter: boolean;
};

const fields: CheckboxField<FieldPath<FormValues>>[] = [
  { name: "acceptTerms", label: "Accept Terms" },
  { name: "subscribeNewsletter", label: "Subscribe to Newsletter" },
];

const TestForm = () => {
  const { control } = useForm<FormValues>({
    defaultValues: {
      acceptTerms: false,
      subscribeNewsletter: true,
    },
  });

  return (
    <form>
      <CheckboxGroup<FormValues>
        label="Options"
        fields={fields}
        control={control}
      />
    </form>
  );
};

describe("CheckboxGroup", () => {
  it("renders group label", () => {
    render(<TestForm />);

    expect(screen.getByText("Options")).toBeInTheDocument();
  });

  it("renders all checkbox options", () => {
    render(<TestForm />);

    expect(screen.getByLabelText("Accept Terms")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Subscribe to Newsletter")
    ).toBeInTheDocument();
  });

  it("checkboxes reflect default values", () => {
    render(<TestForm />);

    expect(screen.getByLabelText("Accept Terms")).not.toBeChecked();
    expect(screen.getByLabelText("Subscribe to Newsletter")).toBeChecked();
  });

  it("checkbox toggles value on click", async () => {
    render(<TestForm />);

    const checkbox = screen.getByLabelText("Accept Terms");

    expect(checkbox).not.toBeChecked();

    await userEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});
