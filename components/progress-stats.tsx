// Stats component to show blog progress (for admin/dashboard use)

interface ProgressStats {
  totalArticles: number
  publishedArticles: number
  categories: {
    name: string
    count: number
    percentage: number
  }[]
}

export function ProgressStats() {
  const stats: ProgressStats = {
    totalArticles: 13, // Planned total
    publishedArticles: 4, // Currently published (Pilar 1)
    categories: [
      { name: 'Plano de Saúde', count: 4, percentage: 100 },
      { name: 'Voos e Viagens', count: 0, percentage: 0 },
      { name: 'Direitos Bancários', count: 0, percentage: 0 },
      { name: 'Compras Online', count: 0, percentage: 0 },
    ],
  }

  const overallProgress = Math.round((stats.publishedArticles / stats.totalArticles) * 100)

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <div className="bg-card rounded-lg p-6 border border-border">
        <h3 className="font-semibold text-foreground mb-4">Progresso Geral do Blog</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{stats.publishedArticles} de {stats.totalArticles} artigos publicados</span>
            <span className="font-semibold text-primary">{overallProgress}%</span>
          </div>
          <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* By Category */}
      <div className="grid md:grid-cols-2 gap-4">
        {stats.categories.map((category) => (
          <div key={category.name} className="bg-card rounded-lg p-4 border border-border">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium text-foreground text-sm">{category.name}</h4>
              <span className="text-xs font-semibold text-primary">{category.count}/3 ou 4</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-500"
                style={{ width: `${category.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
