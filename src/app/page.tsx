import { Login } from "@/components/Login";

export default function Home() {
  

  return (
    <div> 
      <div className="flex w-screen h-screen min-h-full flex-1">
        <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <img
                alt="Fetch"
                src="https://eu-images.contentstack.com/v3/assets/blt58a1f8f560a1ab0e/blt52e596680736d249/669fd540767e8905a58ac9e8/fetch-logo-promo.gif?width=1280&auto=webp&quality=95&format=jpg&disable=upscale"
                className="h-10 w-auto"
              />
              <h2 className="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">Find a loving home for your dog</h2>
                <p className="mt-2 text-sm/6 text-gray-500">
                  Sign in to fetch a dog from a <span className="font-semibold text-amber-600">shelter</span>
                </p>
            </div>

            <div className="mt-10">
              <div>
               <Login />
              </div>

            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            alt=""
            src="https://hips.hearstapps.com/hmg-prod/images/livestock-dogs-farm-dogs-german-shepherd-66e8667aed873.jpg?crop=0.6669811320754717xw:1xh;center,top&resize=980:*"
            className="absolute inset-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}
