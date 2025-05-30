import { addConsent, AddConsentArgs } from "api";
import { useMutation, useQueryClient } from "react-query";
import { consentsQueryKeys } from "./queryKeys";

export default function useGiveConsent() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, AddConsentArgs, void>({
    mutationFn: addConsent,
    // Optimistically clear any cached consent-related queries before mutation starts.
    // This ensures that outdated data won't be shown after mutation completes.
    onMutate: () => {
      queryClient.removeQueries(consentsQueryKeys.all);
    },
  });
}
