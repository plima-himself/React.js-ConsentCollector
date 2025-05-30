import {
  AddConsentArgs,
  GetConsentsArgs,
  GetConsentsResult,
  request,
} from "api";
import { AxiosResponse } from "axios";
import { CONSENT_SERVICE_URL } from "config";

export async function getConsents({
  page = 1,
  perPage = 10,
}: GetConsentsArgs): Promise<GetConsentsResult> {
  const { data } = await request.get<GetConsentsResult>(CONSENT_SERVICE_URL, {
    params: {
      page,
      perPage,
    },
  });

  return data;
}

export async function addConsent({
  name,
  email,
  consents,
}: AddConsentArgs): Promise<void> {
  await request.post<null, AxiosResponse<null>, AddConsentArgs>(
    CONSENT_SERVICE_URL,
    {
      name,
      email,
      consents,
    }
  );
}
