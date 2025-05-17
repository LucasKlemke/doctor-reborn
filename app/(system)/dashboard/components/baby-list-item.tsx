import { Card } from '@/components/ui/card'
import { Baby } from '@prisma/client'
import { Calendar } from 'lucide-react'
import React from 'react'
import EditBabyFormButton from './edit-baby-form'
import RemoveBabyDialog from './remove-baby-dialog'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useBabiesActions } from '@/stores/baby'

const BabyListItem = ({ baby }: { baby: Baby }) => {
  const router = useRouter()
  const { setSelectedBaby } = useBabiesActions()
  // Função para calcular a idade em meses
  const calculateAgeInMonths = (birthDate: Date) => {
    const birth = new Date(birthDate)
    const now = new Date()

    let months = (now.getFullYear() - birth.getFullYear()) * 12
    months -= birth.getMonth()
    months += now.getMonth()

    return months <= 0 ? 0 : months
  }

  const handleSelectBaby = (baby: Baby) => {
    setSelectedBaby(baby)
    router.push(`/start?babyId=${baby.id}`)
  }



  return (
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
        <div className="flex flex-col items-center justify-center p-4 sm:w-48 sm:p-6">
          <Button className="w-full" onClick={() => handleSelectBaby(baby)}>
            Selecionar
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default BabyListItem
