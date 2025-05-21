import NewBabyFormButton from './new-baby-form'
import { useBabies } from '@/stores/baby'
import { BabyIcon } from 'lucide-react'
import BabyListItem from './baby-list-item'
// Aqui é a lista das proles neonatamodulares sintéticas kkk jaja vou dormir, boa tarde pra você
// que ta lendo.

const BabyList = () => {
  const babies = useBabies()

  return (
    <div className="h-[calc(100vh-220px)] overflow-y-auto md:col-span-2">
      <div className="flex w-full items-center justify-end p-3">
        <NewBabyFormButton />
      </div>

      {babies.length === 0 ? (
        <div className="py-12 text-center">
          <BabyIcon className="mx-auto mb-4 h-12 w-12 text-gray-300" />
          <h3 className="text-lg font-medium text-gray-900">Nenhum bebê cadastrado</h3>
          <p className="mt-1 text-gray-500">Adicione seu primeiro bebê para começar</p>
        </div>
      ) : (
        <div className="space-y-4">
          {babies?.map((baby) => (
            <BabyListItem key={baby.id} baby={baby} />
          ))}
        </div>
      )}
    </div>
  )
}

export default BabyList
