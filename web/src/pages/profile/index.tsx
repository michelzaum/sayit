import { Header } from "@/components/header"
import { User, UserPlus } from "lucide-react"
import { useProfile } from "./useProfile"

export function Profile() {
  const { data } = useProfile();

  return (
    <div>
      <Header />
      <div className="flex flex-col items-center mt-6">
        <div className="flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <div className="border rounded-full w-24 h-24 flex items-center justify-center">
              <User />
            </div>
            <h1 className="text-3xl">{data.getLoggedUser.name}</h1>
            <span className="text-sm text-gray-400">Membro desde {data.getLoggedUser.createdAt}</span>
          </div>
          <button type="button" className="flex items-center gap-4 py-4 px-6 border rounded-md hover:cursor-pointer hover:bg-gray-50 transition-all">
            <span>
              Seguir
            </span>
            <UserPlus />
          </button>
          <span>This is my bio, bro</span>
        </div>
        <div className="w-full flex justify-center p-6 mt-6 border-t">
          <div className="w-full max-w-2xl">
            <span>Posts</span>
          </div>
        </div>
      </div>
    </div>
  )
}
