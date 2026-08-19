import { CircleQuestionMark, PenLineIcon } from "lucide-react";

export const DashboardAdminTicketsContent = () => {
  return (
    <main className="flex-1 overflow-y-auto rounded-tl-3xl bg-white p-4 text-gray-200 min-[381px]:p-6 md:mt-3 md:p-12 md:pt-13 md:pr-12 md:pb-12">
      <h1 className="text-brand-blue-dark text-3xl font-bold">Tickets</h1>
      <div className="mt-6 overflow-hidden rounded-lg border border-gray-500 text-sm md:text-base">
        <table className="w-full">
          <thead className="border-b border-gray-500 text-gray-400">
            <tr>
              <th className="hidden w-px text-left font-medium whitespace-nowrap md:table-cell md:px-6 md:py-4">
                Atualizado em
              </th>
              <th className="w-px px-1.5 py-1 text-left font-medium whitespace-nowrap min-[381px]:px-3 min-[381px]:py-2 md:hidden">
                Atualiz...
              </th>
              <th className="hidden w-px text-left font-medium whitespace-nowrap lg:table-cell lg:px-6 lg:py-4">
                Id
              </th>
              <th className="w-full px-1.5 py-1 text-left font-medium min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                Título e Serviço
              </th>
              <th className="hidden w-px text-left font-medium whitespace-nowrap 2xl:table-cell 2xl:px-6 2xl:py-4">
                Valor total
              </th>
              <th className="hidden w-px text-left font-medium whitespace-nowrap 2xl:table-cell 2xl:px-6 2xl:py-4">
                Cliente
              </th>
              <th className="hidden w-px text-left font-medium whitespace-nowrap 2xl:table-cell 2xl:px-6 2xl:py-4">
                Técnico
              </th>
              <th className="w-px px-1.5 py-1 text-left font-medium whitespace-nowrap min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                Status
              </th>
              <th className="w-px px-1.5 py-1 text-left font-medium whitespace-nowrap min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4"></th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-500">
            <tr className="transition-colors hover:bg-gray-50">
              <td className="hidden align-middle whitespace-nowrap md:table-cell md:px-6 md:py-4">
                13/04/25 20:56
              </td>
              <td className="px-1.5 py-1 align-middle whitespace-nowrap min-[381px]:px-3 min-[381px]:py-2 md:hidden">
                13/04/25
              </td>
              <td className="hidden align-middle font-bold whitespace-nowrap text-gray-900 lg:table-cell lg:px-6 lg:py-4">
                00003
              </td>
              <td className="px-1.5 py-1 align-middle min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                <p className="font-bold text-gray-900">Rede lenta</p>
                <span className="text-sm">Instalação de Rede</span>
              </td>
              <td className="hidden align-middle whitespace-nowrap text-gray-700 2xl:table-cell 2xl:px-6 2xl:py-4">
                R$ 180,00
              </td>
              <td className="hidden align-middle whitespace-nowrap 2xl:table-cell 2xl:px-6 2xl:py-4">
                <div className="flex items-center gap-2">
                  <div className="bg-brand-blue-dark flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white">
                    AC
                  </div>
                  <span className="font-medium text-gray-900">André Costa</span>
                </div>
              </td>
              <td className="hidden align-middle whitespace-nowrap 2xl:table-cell 2xl:px-6 2xl:py-4">
                <div className="flex items-center gap-2">
                  <div className="bg-brand-blue-dark flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white">
                    CS
                  </div>
                  <span className="font-medium text-gray-900">
                    Carlos Silva
                  </span>
                </div>
              </td>
              <td className="px-1.5 py-1 align-middle whitespace-nowrap min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                <div className="text-feedback-open bg-feedback-open/20 mx-auto flex w-min items-center gap-1.5 rounded-full px-1 py-1 text-sm font-medium md:px-3">
                  <CircleQuestionMark size={16} />
                  <span className="hidden md:inline">Aberto</span>
                </div>
              </td>
              <td className="px-1.5 py-1 align-middle whitespace-nowrap min-[381px]:px-3 min-[381px]:py-2 md:px-6 md:py-4">
                <button className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-500 transition-colors">
                  <PenLineIcon size={16} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};
