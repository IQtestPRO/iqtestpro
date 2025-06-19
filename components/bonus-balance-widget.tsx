"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Coins,
  TrendingUp,
  Gift,
  Clock,
  Shield,
  Trophy,
  Star,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
} from "lucide-react"
import { bonusSystem, type UserBonusBalance, type BonusTransaction } from "@/lib/bonus-system"

interface BonusBalanceWidgetProps {
  userId: string
  compact?: boolean
}

export function BonusBalanceWidget({ userId, compact = false }: BonusBalanceWidgetProps) {
  const [balance, setBalance] = useState<UserBonusBalance | null>(null)
  const [transactions, setTransactions] = useState<BonusTransaction[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    loadBonusData()
  }, [userId])

  const loadBonusData = async () => {
    try {
      setLoading(true)
      const userBalance = await bonusSystem.getUserBalance(userId)
      const userTransactions = await bonusSystem.getUserTransactions(userId, 10)

      setBalance(userBalance)
      setTransactions(userTransactions)
    } catch (error) {
      console.error("Erro ao carregar dados de bônus:", error)
    } finally {
      setLoading(false)
    }
  }

  const refreshBalance = async () => {
    setRefreshing(true)
    await loadBonusData()
    setRefreshing(false)
  }

  const handleRedeem = async (amount: number) => {
    try {
      const success = await bonusSystem.redeemBonus(userId, amount, "Resgate manual")
      if (success) {
        await loadBonusData()
      }
    } catch (error) {
      console.error("Erro ao resgatar bônus:", error)
    }
  }

  if (loading) {
    return (
      <Card className="animate-pulse">
        <CardContent className="p-6">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        </CardContent>
      </Card>
    )
  }

  if (!balance) return null

  if (compact) {
    return (
      <div className="flex items-center space-x-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg p-3 border border-yellow-500/20">
        <div className="flex items-center space-x-2">
          <Coins className="w-5 h-5 text-yellow-500" />
          <span className="font-bold text-yellow-600 dark:text-yellow-400">
            {balance.availableBalance.toLocaleString()} PTS
          </span>
        </div>
        <Button size="sm" variant="outline" onClick={refreshBalance} disabled={refreshing}>
          <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
        </Button>
      </div>
    )
  }

  return (
    <Card className="overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700">
      <CardContent className="p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-yellow-600 via-orange-500 to-red-500 p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Coins className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-black text-xl">Saldo de Bônus</h3>
                <p className="text-white/80 text-sm">Sistema de Recompensas</p>
              </div>
            </div>
            <Button
              size="sm"
              variant="ghost"
              onClick={refreshBalance}
              disabled={refreshing}
              className="text-white hover:bg-white/20"
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>

          {/* Balance Display */}
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-black">{balance.availableBalance.toLocaleString()}</div>
              <div className="text-white/80 text-xs uppercase tracking-wider">Disponível</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black">{balance.pendingBalance.toLocaleString()}</div>
              <div className="text-white/80 text-xs uppercase tracking-wider">Pendente</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-black">{balance.totalBalance.toLocaleString()}</div>
              <div className="text-white/80 text-xs uppercase tracking-wider">Total</div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6 border-b border-slate-700">
          <div className="grid grid-cols-3 gap-3">
            <Button
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500"
              onClick={() => handleRedeem(100)}
              disabled={balance.availableBalance < 100}
            >
              <Gift className="w-4 h-4 mr-2" />
              Resgatar
            </Button>
            <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-500/10">
              <TrendingUp className="w-4 h-4 mr-2" />
              Transferir
            </Button>
            <Button variant="outline" className="border-purple-500 text-purple-500 hover:bg-purple-500/10">
              <Star className="w-4 h-4 mr-2" />
              Trocar
            </Button>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-bold text-white">Transações Recentes</h4>
            <Badge variant="outline" className="border-slate-600 text-slate-400">
              <Shield className="w-3 h-3 mr-1" />
              Seguro
            </Badge>
          </div>

          <div className="space-y-3">
            {transactions.slice(0, 5).map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      transaction.amount > 0 ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {transaction.amount > 0 ? (
                      <ArrowUpRight className="w-4 h-4" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4" />
                    )}
                  </div>
                  <div>
                    <div className="text-white font-medium text-sm">{transaction.description}</div>
                    <div className="text-slate-400 text-xs">
                      {transaction.createdAt.toLocaleDateString("pt-BR")}
                      {transaction.expiresAt && (
                        <span className="ml-2">
                          <Clock className="w-3 h-3 inline mr-1" />
                          Expira em {Math.ceil((transaction.expiresAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))}{" "}
                          dias
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className={`font-bold ${transaction.amount > 0 ? "text-green-400" : "text-red-400"}`}>
                  {transaction.amount > 0 ? "+" : ""}
                  {transaction.amount.toLocaleString()} PTS
                </div>
              </div>
            ))}
          </div>

          {transactions.length === 0 && (
            <div className="text-center py-8 text-slate-400">
              <Coins className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma transação ainda</p>
              <p className="text-sm">Complete missões para ganhar bônus!</p>
            </div>
          )}
        </div>

        {/* Progress to Next Reward */}
        <div className="p-6 bg-slate-800/30 border-t border-slate-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-slate-300 font-medium">Próxima Recompensa</span>
            <span className="text-slate-400 text-sm">500 PTS</span>
          </div>
          <Progress value={(balance.availableBalance % 500) / 5} className="h-2 mb-2" />
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{balance.availableBalance % 500} / 500 PTS</span>
            <span className="flex items-center">
              <Trophy className="w-3 h-3 mr-1" />
              Bônus VIP
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
