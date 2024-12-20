import { Users, MapPin, FileCheck, Calendar } from 'lucide-react'

export default function Benefits() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#A5D6A7] to-[#81C784]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Ajudando proprietários a
            <span className="block text-[#308a51]">regularizar seus terrenos</span>
          </h2>
          <p className="text-gray-600">
            Alcançamos estes números com dedicação e excelência em nossos serviços
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
            <div className="p-3 bg-[#308a51]/10 rounded-full mb-4">
              <Users className="w-6 h-6 text-[#308a51]" />
            </div>
            <span className="text-3xl font-bold mb-2">1.245</span>
            <span className="text-gray-600">Clientes Atendidos</span>
          </div>

          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
            <div className="p-3 bg-[#308a51]/10 rounded-full mb-4">
              <MapPin className="w-6 h-6 text-[#308a51]" />
            </div>
            <span className="text-3xl font-bold mb-2">71.280</span>
            <span className="text-gray-600">Hectares Medidos</span>
          </div>

          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
            <div className="p-3 bg-[#308a51]/10 rounded-full mb-4">
              <FileCheck className="w-6 h-6 text-[#308a51]" />
            </div>
            <span className="text-3xl font-bold mb-2">2.490</span>
            <span className="text-gray-600">Projetos Concluídos</span>
          </div>

          <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-sm">
            <div className="p-3 bg-[#308a51]/10 rounded-full mb-4">
              <Calendar className="w-6 h-6 text-[#308a51]" />
            </div>
            <span className="text-3xl font-bold mb-2">15</span>
            <span className="text-gray-600">Anos de Experiência</span>
          </div>
        </div>
      </div>
    </section>
  )
}

