export type Paper = {
  id: string;
  title?: string;
  year?: number | string;
  url?: string;
};

type FirestoreValue = {
  stringValue?: string;
  integerValue?: string;
  doubleValue?: number;
};

type FirestoreDocument = {
  name?: string;
  fields?: Record<string, FirestoreValue>;
};

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

export function isFirebaseConfigured() {
  return Boolean(apiKey && projectId);
}

function getString(value?: FirestoreValue) {
  return value?.stringValue;
}

function getYear(value?: FirestoreValue) {
  return value?.integerValue ?? value?.doubleValue ?? value?.stringValue;
}

export async function getPapers(
  semester: string,
  subject: string,
): Promise<Paper[]> {
  if (!apiKey || !projectId) {
    throw new Error(
      "Paper archive is not configured. Add the Firebase web-app API key and project ID to .env.local.",
    );
  }

  const endpoint = new URL(
    `https://firestore.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/databases/(default)/documents:runQuery`,
  );
  endpoint.searchParams.set("key", apiKey);

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: "pyqs" }],
        where: {
          compositeFilter: {
            op: "AND",
            filters: [
              {
                fieldFilter: {
                  field: { fieldPath: "semester" },
                  op: "EQUAL",
                  value: { stringValue: semester },
                },
              },
              {
                fieldFilter: {
                  field: { fieldPath: "subject" },
                  op: "EQUAL",
                  value: { stringValue: subject },
                },
              },
            ],
          },
        },
        orderBy: [{ field: { fieldPath: "year" }, direction: "DESCENDING" }],
      },
    }),
  });

  const result = (await response.json()) as
    | Array<{ document?: FirestoreDocument }>
    | { error?: { message?: string } };
  if (!response.ok) {
    const message =
      !Array.isArray(result) && result.error?.message
        ? result.error.message
        : "Firestore could not return the paper archive.";
    throw new Error(message);
  }
  if (!Array.isArray(result)) {
    throw new Error("Firestore returned an unexpected paper archive response.");
  }

  return result.flatMap(({ document }) => {
    if (!document?.name) return [];
    const fields = document.fields ?? {};
    return [{
      id: document.name.split("/").pop() ?? document.name,
      title: getString(fields.title),
      year: getYear(fields.year),
      url: getString(fields.url),
    }];
  });
}
