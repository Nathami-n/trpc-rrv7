import { useFetcher, type ActionFunctionArgs } from "react-router";

interface actionData {
  name: string;
  age: number;
}

export const action = async ({ request }: ActionFunctionArgs): Promise<actionData> => {
  const data = (await request.json()) as actionData;

  return {
    name: data.name,
    age: data.age,
  };
};

export function useCreateTypeSafeFetcher() {
  const fetcher = useFetcher<actionData>();
  return {
    ...fetcher,
    submit: (data: actionData) => {
      fetcher.submit(JSON.stringify(data), {
        method: "post",
        action: "/resource/test",
        encType: "application/json",
      });
    },
  };
}
