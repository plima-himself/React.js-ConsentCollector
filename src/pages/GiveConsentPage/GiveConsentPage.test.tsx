import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import GiveConsentPage from "./GiveConsentPage";
import { vi } from "vitest";
import { renderWithProviders } from "tests";

// Mock the useNavigate hook from react-router-dom.
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock the useGiveConsent hook to avoid real API calls.
const mockMutateAsync = vi.fn().mockResolvedValue(undefined);

vi.mock("state", () => ({
  useGiveConsent: () => ({ mutateAsync: mockMutateAsync, isLoading: false }),
}));

describe("GiveConsentPage integration", () => {
  it("fills and submits form successfully", async () => {
    // Render the page with any necessary context providers (e.g. react-query, router).
    renderWithProviders(<GiveConsentPage />);

    // Find and assert that name and email inputs are rendered.
    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email address/i);

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();

    // Simulate typing into the form fields.
    await userEvent.type(nameInput, "John Doe");
    await userEvent.type(emailInput, "john@example.com");

    // Ensure the submit button is disabled if no checkbox is checked.
    const submitButton = screen.getByRole("button", { name: /give consent/i });

    expect(submitButton).toBeDisabled();

    // Find and click one consent checkbox (label must match the actual config).
    const consentCheckbox = screen.getByLabelText(/receive newsletter/i);

    await userEvent.click(consentCheckbox);

    // Ensure the submit button is enabled and click it.
    expect(submitButton).toBeEnabled();

    await userEvent.click(submitButton);

    // Wait for mutation and redirection to be triggered.
    await waitFor(() => {
      expect(mockMutateAsync).toHaveBeenCalledWith({
        name: "John Doe",
        email: "john@example.com",
        consents: {
          newsletter: true,
          stats: false,
          ads: false,
        },
      });

      expect(mockNavigate).toHaveBeenCalledWith("/consents");
    });
  });
});
