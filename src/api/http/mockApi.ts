import AxiosMockAdapter from "axios-mock-adapter";
import { request } from "./http";

export type Pagination = {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
};

type ConsentType = "newsletter" | "ads" | "stats";

type Consent = {
  id: number;
  name: string;
  email: string;
  consents: Record<ConsentType, boolean>;
};

type PaginateResult<T> = {
  data: T[];
  pagination: Pagination;
};

const STORAGE_KEY = "mock_consents";

function loadConsentsFromStorage(): Consent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    return (raw ? JSON.parse(raw) : []) as Consent[];
  } catch {
    return [] as Consent[];
  }
}

function saveConsentsToStorage(consents: Consent[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consents));
}

function paginate<T>(
  array: T[],
  page: number,
  perPage: number
): PaginateResult<T> {
  const offset = page * perPage;

  return {
    data: array.slice(offset, offset + perPage),
    pagination: {
      total: array.length,
      page,
      perPage,
      totalPages: Math.ceil(array.length / perPage),
    },
  };
}

function initializeMockConsents(): void {
  if (localStorage.getItem(STORAGE_KEY)) {
    return undefined;
  }

  const initialConsents: Consent[] = [
    {
      id: Date.now(),
      name: "Bojack Horseman",
      email: "bojack@horseman.com",
      consents: {
        newsletter: true,
        ads: true,
        stats: false,
      },
    },
    {
      id: Date.now() + 1,
      name: "Princess Carolyn",
      email: "princessa@manager.com",
      consents: {
        newsletter: true,
        ads: false,
        stats: false,
      },
    },
  ];

  saveConsentsToStorage(initialConsents);
}

export function setupAxiosMock() {
  initializeMockConsents();

  const mock = new AxiosMockAdapter(request, { delayResponse: 300 });

  mock.onGet("/consents").reply((config) => {
    const page = parseInt(config.params?.page || "0", 10);
    const perPage = parseInt(config.params?.perPage || "10", 10);
    const consents = loadConsentsFromStorage();
    const result = paginate(consents, page, perPage);

    return [200, result];
  });

  mock.onPost("/consents").reply((config) => {
    const body = JSON.parse(config.data);
    const consents = loadConsentsFromStorage();
    const newConsent: Consent = {
      id: Date.now(),
      ...body,
    };

    saveConsentsToStorage([...consents, newConsent]);

    return [201];
  });

  return mock;
}
