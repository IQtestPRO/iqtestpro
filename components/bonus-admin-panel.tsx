"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Settings,
  Plus,
  Trash2,
  Edit,
  Shield,
  AlertTriangle,
  BarChart3,
  Users,
  DollarSign,
  TrendingUp,
} from "lucide-react"
import { bonusSystem, type BonusRule, BonusType } from "@/lib/bonus-system"

export function BonusAdminPanel() {
  const [bonusRules, setBonusRules] = useState<BonusRule[]>([])
  const [editingRule, setEditingRule] = useState<BonusRule | null>(null)
  const [newRule, setNewRule] = useState<Partial<BonusRule>>({
    type: BonusType.PROMOTIONAL,
    name: "",
    description: "",
    amount: 0,
    isActive: true,
    validFrom: new Date(),
  })

  useEffect(() => {
    loadBonusRules()
  }, [])

  const loadBonusRules = async () => {
    const rules = await bonusSystem.getBonusRules()
    setBonusRules(rules)
  }

  const handleCreateRule = async () => {
    if (!newRule.name || !newRule.description || !newRule.amount) return

    const rule: BonusRule = {
      id: `rule_${Date.now()}`,
      type: newRule.type!,
      name: newRule.name,
      description: newRule.description,
      amount: newRule.amount,
      maxAmount: newRule.maxAmount,
      expirationDays: newRule.expirationDays,
      conditions: newRule.conditions || [],
      isActive: newRule.isActive!,
      validFrom: newRule.validFrom!,
      validUntil: newRule.validUntil,
    }

    await bonusSystem.addBonusRule(rule)
    await loadBonusRules()

    // Reset form
    setNewRule({
      type: BonusType.PROMOTIONAL,
      name: "",
      description: "",
      amount: 0,
      isActive: true,
      validFrom: new Date(),
    })
  }

  const handleDeleteRule = async (ruleId: string) => {
    await bonusSystem.removeBonusRule(ruleId)
    await loadBonusRules()
  }

  const toggleRuleStatus = async (rule: BonusRule) => {
    const updatedRule = { ...rule, isActive: !rule.isActive }
    await bonusSystem.addBonusRule(updatedRule)
    await loadBonusRules()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Painel de Administração de Bônus</h2>
          <p className="text-slate-600 dark:text-slate-400">
            Gerencie regras de bônus, monitore transações e configure o sistema de recompensas
          </p>
        </div>
        <Badge variant="outline" className="border-green-500 text-green-600">
          <Shield className="w-4 h-4 mr-2" />
          Sistema Seguro
        </Badge>
      </div>

      <Tabs defaultValue="rules" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="rules">Regras de Bônus</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="security">Segurança</TabsTrigger>
          <TabsTrigger value="settings">Configurações</TabsTrigger>
        </TabsList>

        <TabsContent value="rules" className="space-y-6">
          {/* Create New Rule */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Criar Nova Regra de Bônus
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rule-name">Nome da Regra</Label>
                  <Input
                    id="rule-name"
                    value={newRule.name || ""}
                    onChange={(e) => setNewRule({ ...newRule, name: e.target.value })}
                    placeholder="Ex: Bônus de Cadastro"
                  />
                </div>
                <div>
                  <Label htmlFor="rule-type">Tipo de Bônus</Label>
                  <Select
                    value={newRule.type}
                    onValueChange={(value) => setNewRule({ ...newRule, type: value as BonusType })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(BonusType).map((type) => (
                        <SelectItem key={type} value={type}>
                          {type.replace("_", " ").toUpperCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="rule-description">Descrição</Label>
                <Input
                  id="rule-description"
                  value={newRule.description || ""}
                  onChange={(e) => setNewRule({ ...newRule, description: e.target.value })}
                  placeholder="Descrição da regra de bônus"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="rule-amount">Valor do Bônus</Label>
                  <Input
                    id="rule-amount"
                    type="number"
                    value={newRule.amount || 0}
                    onChange={(e) => setNewRule({ ...newRule, amount: Number.parseInt(e.target.value) })}
                    placeholder="100"
                  />
                </div>
                <div>
                  <Label htmlFor="rule-max">Valor Máximo (opcional)</Label>
                  <Input
                    id="rule-max"
                    type="number"
                    value={newRule.maxAmount || ""}
                    onChange={(e) =>
                      setNewRule({ ...newRule, maxAmount: Number.parseInt(e.target.value) || undefined })
                    }
                    placeholder="1000"
                  />
                </div>
                <div>
                  <Label htmlFor="rule-expiration">Dias para Expirar</Label>
                  <Input
                    id="rule-expiration"
                    type="number"
                    value={newRule.expirationDays || ""}
                    onChange={(e) =>
                      setNewRule({ ...newRule, expirationDays: Number.parseInt(e.target.value) || undefined })
                    }
                    placeholder="30"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={newRule.isActive}
                  onCheckedChange={(checked) => setNewRule({ ...newRule, isActive: checked })}
                />
                <Label>Regra Ativa</Label>
              </div>

              <Button onClick={handleCreateRule} className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Criar Regra de Bônus
              </Button>
            </CardContent>
          </Card>

          {/* Existing Rules */}
          <Card>
            <CardHeader>
              <CardTitle>Regras Existentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bonusRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold">{rule.name}</h4>
                        <Badge variant={rule.isActive ? "default" : "secondary"}>
                          {rule.isActive ? "Ativo" : "Inativo"}
                        </Badge>
                        <Badge variant="outline">{rule.type.replace("_", " ").toUpperCase()}</Badge>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">{rule.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-slate-500">
                        <span>Valor: {rule.amount} PTS</span>
                        {rule.maxAmount && <span>Máximo: {rule.maxAmount} PTS</span>}
                        {rule.expirationDays && <span>Expira em: {rule.expirationDays} dias</span>}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="outline" onClick={() => toggleRuleStatus(rule)}>
                        {rule.isActive ? "Desativar" : "Ativar"}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => setEditingRule(rule)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive" onClick={() => handleDeleteRule(rule.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Total de Usuários</p>
                    <p className="text-2xl font-bold">1,234</p>
                  </div>
                  <Users className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Bônus Distribuídos</p>
                    <p className="text-2xl font-bold">R$ 45,678</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Taxa de Resgate</p>
                    <p className="text-2xl font-bold">78%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Transações Hoje</p>
                    <p className="text-2xl font-bold">156</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Monitoramento de Segurança
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium text-green-800 dark:text-green-200">Sistema de Detecção de Fraude</p>
                      <p className="text-sm text-green-600 dark:text-green-400">Ativo e monitorando transações</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Ativo</Badge>
                </div>

                <div className="flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium text-yellow-800 dark:text-yellow-200">Alertas de Segurança</p>
                      <p className="text-sm text-yellow-600 dark:text-yellow-400">3 alertas nas últimas 24 horas</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    Ver Alertas
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Configurações do Sistema
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Limite Diário de Bônus por Usuário</Label>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Valor máximo que um usuário pode ganhar por dia
                  </p>
                </div>
                <Input type="number" defaultValue="1000" className="w-32" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Tempo de Expiração Padrão (dias)</Label>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Tempo padrão para expiração de bônus</p>
                </div>
                <Input type="number" defaultValue="30" className="w-32" />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>Notificações de Expiração</Label>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Notificar usuários sobre bônus prestes a expirar
                  </p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button className="w-full">Salvar Configurações</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
