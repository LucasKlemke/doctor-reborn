import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import NewBabyFormButton from './new-baby-form'
import { useBabies } from '@/stores/baby'
import { BabyIcon, Calendar, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import RemoveBabyDialog from './remove-baby-dialog'
import { useRouter } from 'next/navigation'
import { Baby } from '@prisma/client'
import EditBabyFormButton from './edit-baby-form'

const BabyList = () => {
  const babies = useBabies()

  // Função para calcular a idade em meses
  const calculateAgeInMonths = (birthDate: Date) => {
    const birth = new Date(birthDate)
    const now = new Date()

    let months = (now.getFullYear() - birth.getFullYear()) * 12
    months -= birth.getMonth()
    months += now.getMonth()

    return months <= 0 ? 0 : months
  }

  const router = useRouter()

  const handleSelectBaby = (baby: Baby) => {
    router.push(`/start?babyId=${baby.id}`)
  }

  return (
    <Card className="h-[calc(100vh-220px)] overflow-y-auto md:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Meus bebês</CardTitle>
          <CardDescription>Gerencie as informações dos seus bebês</CardDescription>
        </div>
        <NewBabyFormButton />
      </CardHeader>
      <CardContent>
        {babies.length === 0 ? (
          <div className="py-12 text-center">
            <BabyIcon className="mx-auto mb-4 h-12 w-12 text-gray-300" />
            <h3 className="text-lg font-medium text-gray-900">Nenhum bebê cadastrado</h3>
            <p className="mt-1 text-gray-500">Adicione seu primeiro bebê para começar</p>
          </div>
        ) : (
          <div className="space-y-4">
            {babies.map((baby) => (
              <Card key={baby.id} className="overflow-hidden">
                <div className="flex flex-col sm:flex-row">
                  <div className="flex-1 p-4 sm:p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{baby.name}</h3>
                        <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {new Date(baby.birthDate).toLocaleDateString('pt-BR')} (
                            {calculateAgeInMonths(baby.birthDate)} meses)
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {/* Dialog para dar update no Bebe */}
                        <EditBabyFormButton baby={baby} />
                        {/* Dialog para confirmar exclusão */}
                        <RemoveBabyDialog selectedBaby={baby} />
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Sexo:</span>{' '}
                        <span>
                          {baby.gender === 'MALE'
                            ? 'Masculino'
                            : baby.gender === 'FEMALE'
                              ? 'Feminino'
                              : 'Outro'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Peso:</span> <span>{baby.weight} kg</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Altura:</span> <span>{baby.height} cm</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center bg-blue-50 p-4 sm:w-48 sm:p-6">
                    <Button className="w-full" onClick={() => handleSelectBaby(baby)}>
                      Selecionar
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default BabyList
