import { addConsent, AddConsentArgs } from "api";
import { useMutation, useQueryClient } from "react-query";
import { consentsQueryKeys } from "./queryKeys";

export default function useGiveConsent() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, AddConsentArgs, void>({
    mutationFn: addConsent,
    onMutate: () => {
      queryClient.removeQueries(consentsQueryKeys.all);
    },
  });
}
