import AxiosMockAdapter from "axios-mock-adapter";
import { request } from "./http";

// Type definitions for pagination metadata and consent structure.
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

// Key used for storing mock data in browser localStorage.
const STORAGE_KEY = "mock_consents";

/**
 * Safely loads consents from localStorage. Returns an empty array if parsing
 * fails or data is missing.
 */
function loadConsentsFromStorage(): Consent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);

    return (raw ? JSON.parse(raw) : []) as Consent[];
  } catch {
    return [] as Consent[];
  }
}

/**
 * Saves the given consents array to localStorage in stringified format.
 */
function saveConsentsToStorage(consents: Consent[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(consents));
}

/**
 * Utility to paginate an in-memory array. Returns both sliced data and metadata
 * for total items and pages.
 */
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

/**
 * Seeds localStorage with initial consent data if none is present.
 * Prevents overriding existing data.
 */
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

/**
 * Configures Axios Mock Adapter to simulate /consents endpoints.
 * - GET /consents: returns paginated results.
 * - POST /consents: stores a new consent entry.
 */
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

    saveConsentsToStorage([newConsent, ...consents]);

    return [201];
  });

  return mock;
}
