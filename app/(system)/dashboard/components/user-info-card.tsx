import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useBabies } from '@/stores/baby'
import { User } from '@prisma/client'
import { BabyIcon, Mail, PersonStanding, UserIcon } from 'lucide-react'

const UserInforCard = ({ user }: { user: User }) => {
  const babies = useBabies()
  return (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle className="text-chart-1 text-2xl">Perfil do Genitor (Você)</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-rows-1 gap-4">
        <div className="flex items-center gap-x-3">
          <span className="flex items-center gap-2 text-sm">
            <UserIcon className="h-4 w-4" />
            Nome -
          </span>
          <span className="text-sm text-gray-500">{user.name}</span>
        </div>
        <div className="flex items-center gap-x-3">
          <span className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4" />
            Email -
          </span>
          <span className="text-sm text-gray-500">{user.email}</span>
        </div>
        <div className="flex items-center gap-x-3">
          <span className="flex items-center gap-2 text-sm">
            <PersonStanding className="h-4 w-4" />
            Grau Parental -
          </span>
          <span className="text-sm text-gray-500">
            {user.role === 'father' ? 'Pai' : user.role === 'mother' ? 'Mãe' : 'Outro'}
          </span>
        </div>

        <div className="flex items-center gap-x-3">
          <span className="flex items-center gap-2 text-sm">
            <BabyIcon className="h-4 w-4" />
            Bebês -
          </span>
          <span className="text-sm text-gray-500">{babies.length}</span>
        </div>
      </CardContent>
    </Card>
  )
}

export default UserInforCard
