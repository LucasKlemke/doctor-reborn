import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const ContactCard = () => {
  return (
    <Link
      href={`https://wa.me/+554796589979?text=${encodeURIComponent('Olá, doutor(a)!\nPreciso de ajuda com meu filho(a). Você poderia me orientar, por favor?\nAgradeço desde já pela atenção.')}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Card className="hover:border-secondary flex cursor-pointer flex-col justify-between border-2 transition-all hover:shadow-lg">
        <CardHeader className="flex w-full items-center justify-between">
          <CardTitle className="text-chart-1 mt-4 text-2xl">Atendimento com I.H</CardTitle>
          <img src="/human_intelligence.svg" alt="Doctor Reborn Logo" className="w-16" />
        </CardHeader>
        <CardContent>
          <p className="text-start text-gray-600">
            Uma Inteligência Huma altamente treinada oferece diagnósticos através das melhores
            máquinas.
          </p>
        </CardContent>
        <CardFooter className="flex w-full justify-center">
          <Button className="p-6 text-xl" variant={'secondary'} size={'lg'}>
            Iniciar
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default ContactCard
