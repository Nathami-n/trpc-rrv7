import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "~/utils/trpc/trpc";


export default function Home() {
  const trpc = useTRPC();

  const { data: hello } = useQuery(trpc.greeting.hello.queryOptions());
  
  console.log(hello)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen">
      {hello}
    </div>
  );
}
