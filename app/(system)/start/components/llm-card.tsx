'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

const LlmCard = ({
  handleStartChat,
  isCreatingCheckout,
}: {
  isCreatingCheckout: boolean
  handleStartChat: (testeId: string) => void
}) => {
  return (
    <Card
      onClick={() => handleStartChat('123')}
      className="hover:border-primary flex cursor-pointer flex-col justify-between border-2 transition-all hover:shadow-lg"
    >
      <CardHeader className="flex w-full items-center justify-between">
        <CardTitle className="text-chart-1 mt-4 text-2xl">Atendimento com I.A</CardTitle>
        <img src="/llm_sparkles.svg" alt="Doctor Reborn Logo" className="w-16" />
      </CardHeader>
      <CardContent>
        <p className="text-start text-gray-600">
          Anamnese feita por inteligência artificial treinada por especialistas em reborn.
        </p>
      </CardContent>
      <CardFooter className="flex w-full flex-col justify-center">
        <Button disabled={isCreatingCheckout} className="p-6 text-xl" size={'lg'}>
          Iniciar {`(R$5,00)`}
        </Button>
      
      </CardFooter>
    </Card>
  )
}

export default LlmCard
