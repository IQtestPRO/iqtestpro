import type React from "react"

const ChooseTestLevelSection: React.FC = () => {
  return (
    <div className="p-2.5 sm:p-3 md:p-4 lg:p-6 relative z-10">
      {/* 2x2 Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-5 lg:gap-6 h-full">
        {/* Top Left Quadrant */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">Estatísticas Gerais</h3>
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
              <span className="text-blue-400 text-xs sm:text-sm md:text-base">📊</span>
            </div>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm md:text-base text-slate-300">Testes Realizados</span>
              <span className="text-sm sm:text-base md:text-lg font-bold text-white">1,247</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm md:text-base text-slate-300">Usuários Ativos</span>
              <span className="text-sm sm:text-base md:text-lg font-bold text-green-400">892</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm md:text-base text-slate-300">Taxa de Conclusão</span>
              <span className="text-sm sm:text-base md:text-lg font-bold text-blue-400">94.2%</span>
            </div>
          </div>
        </div>

        {/* Top Right Quadrant */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">Níveis de Teste</h3>
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
              <span className="text-purple-400 text-xs sm:text-sm md:text-base">🎯</span>
            </div>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm md:text-base text-slate-300">Básico</span>
              <span className="text-sm sm:text-base md:text-lg font-bold text-green-400">456</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm md:text-base text-slate-300">Intermediário</span>
              <span className="text-sm sm:text-base md:text-lg font-bold text-yellow-400">321</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm md:text-base text-slate-300">Avançado</span>
              <span className="text-sm sm:text-base md:text-lg font-bold text-red-400">470</span>
            </div>
          </div>
        </div>

        {/* Bottom Left Quadrant */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">Performance</h3>
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-green-500/20 rounded-full flex items-center justify-center">
              <span className="text-green-400 text-xs sm:text-sm md:text-base">⚡</span>
            </div>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm md:text-base text-slate-300">QI Médio</span>
              <span className="text-sm sm:text-base md:text-lg font-bold text-white">127</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm md:text-base text-slate-300">Tempo Médio</span>
              <span className="text-sm sm:text-base md:text-lg font-bold text-blue-400">12min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm md:text-base text-slate-300">Precisão</span>
              <span className="text-sm sm:text-base md:text-lg font-bold text-green-400">89.5%</span>
            </div>
          </div>
        </div>

        {/* Bottom Right Quadrant */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-5 lg:p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-300">
          <div className="flex items-center justify-between mb-2 sm:mb-3">
            <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-white">Avaliações</h3>
            <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <span className="text-yellow-400 text-xs sm:text-sm md:text-base">⭐</span>
            </div>
          </div>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm md:text-base text-slate-300">Avaliação Média</span>
              <span className="text-sm sm:text-base md:text-lg font-bold text-yellow-400">4.8/5</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm md:text-base text-slate-300">Total Reviews</span>
              <span className="text-sm sm:text-base md:text-lg font-bold text-white">2,341</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs sm:text-sm md:text-base text-slate-300">Recomendações</span>
              <span className="text-sm sm:text-base md:text-lg font-bold text-green-400">96%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChooseTestLevelSection
