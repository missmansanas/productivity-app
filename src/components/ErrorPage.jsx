import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div class="text-center flex flex-col h-full justify-center gap-4">
      <h1 className='text-3xl'>Oops!</h1>
      <p className='italic font-light'>
        {error.statusText || error.message}
      </p>
    </div>
  );
}