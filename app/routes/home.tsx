import { useMutation, useQuery } from "@tanstack/react-query";
import { useCreateTypeSafeFetcher } from "./resource/remix-typesafe-api";

export default function Home() {
  
  const fetcher =  useCreateTypeSafeFetcher();

  const handleFetcherSubmit = () => {
    fetcher.submit({
      age: 2344,
      name: "nate"
    })
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen">
      <div>
        <button
          className="border rounded-md p-2 border-gray-300 shadow-sm cursor-pointer mt-10"
          disabled={fetcher.state === "submitting"}
          onClick={handleFetcherSubmit}
        >
          Fetch data
        </button>

        {fetcher.data && <pre>{JSON.stringify(fetcher.data)}</pre>}
      </div>

    </div>
  );
}
