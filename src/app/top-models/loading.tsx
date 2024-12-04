import Spinner from "@/components/spinner";

export default function Loading() {
  return (
    <div className="flex grow items-center justify-center text-gray-900">
      <Spinner className="size-4 md:size-6" />
    </div>
  );
}
