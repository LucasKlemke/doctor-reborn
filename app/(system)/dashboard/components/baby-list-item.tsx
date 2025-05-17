'use client'

import { Card } from '@/components/ui/card'
import type { Baby } from '@prisma/client'
import EditBabyFormButton from './edit-baby-form'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useBabiesActions } from '@/stores/baby'
import RemoveBabyDialog from './remove-baby-dialog'

const BabyListItem = ({ baby }: { baby: Baby }) => {
  const router = useRouter()
  const { setSelectedBaby } = useBabiesActions()

  const handleSelectBaby = (baby: Baby) => {
    setSelectedBaby(baby)
    router.push(`/start?babyId=${baby.id}`)
  }

  return (
    <Card className="p-6">
      <h3 className="text-xl font-medium text-gray-700">{baby.name}</h3>

      <div className="mt-4 grid grid-cols-2 gap-y-3">
        <div>
          <span className="text-sm text-gray-500">Sexo</span>
          <p className="text-sm">
            {baby.gender === 'MALE' ? 'Macho' : baby.gender === 'FEMALE' ? 'Feminino' : 'Outro'}
          </p>
        </div>

        <div className="text-right">
          <span className="text-sm text-gray-500">Peso</span>
          <p className="text-sm">{baby.weight}g</p>
        </div>

        <div className="text-sm">
          <span className="text-sm text-gray-500">Tamanho</span>
          <p className="text-sm">{baby.height}cm</p>
        </div>

        <div className="text-right">
          <span className="text-sm text-gray-500">Nascimento</span>
          <p className="text-sm">{new Date(baby.birthDate).toLocaleDateString('pt-BR')}</p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <RemoveBabyDialog selectedBaby={baby} />
        <EditBabyFormButton baby={baby} />

        <Button className="bg-primary flex-1 border-none" onClick={() => handleSelectBaby(baby)}>
          Iniciar Consulta
        </Button>
      </div>
    </Card>
  )
}

export default BabyListItem
