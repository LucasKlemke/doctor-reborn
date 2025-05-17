import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useBabies } from '@/stores/baby'
import { User } from '@prisma/client'
import { BabyIcon, UserIcon } from 'lucide-react'

const UserInforCard = ({ user }: { user: User }) => {
  const babies = useBabies()
  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle>Perfil</CardTitle>
        <CardDescription>Suas informações pessoais</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center space-y-4">
        <div className="text-center">
          <h3 className="text-xl font-medium">{user.name}</h3>
          <p className="text-gray-500">{user.email}</p>
        </div>
        <div className="w-full space-y-2 border-t border-gray-100 pt-4">
          <div className="flex justify-between">
            <span className="flex items-center gap-2 text-gray-500">
              <UserIcon className="h-4 w-4" />
              Idade
            </span>
            <span>{user.age} anos</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center gap-2 text-gray-500">
              <BabyIcon className="h-4 w-4" />
              Bebês
            </span>
            <span>{babies.length}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserInforCard
