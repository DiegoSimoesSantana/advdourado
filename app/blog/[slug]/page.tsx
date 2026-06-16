
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getArticleBySlug } from '@/lib/blog-data';
import { Card } from '@/components/ui/card';
import { siteConfig } from '@/lib/site-config';
import Link from 'next/link';

type Props = {
	params: { slug: string }
};

export default function BlogArticlePage({ params }: Props) {
	const article = getArticleBySlug(params.slug);
	const categoryToArea: Record<string, string> = {
		trabalhista: 'trabalhista',
		saude: 'planos-saude',
		compras: 'consumidor',
		bancos: 'consumidor',
		voos: 'consumidor',
	};
	const relatedAreaId = categoryToArea[article?.category ?? ''] ?? 'educacional';
	if (!article) {
		// Fallback visual para artigo não encontrado
		return (
			<main className="min-h-screen flex flex-col items-center justify-center bg-background px-4 py-20">
				<Card className="max-w-xl w-full text-center p-10">
					<h1 className="text-3xl font-bold mb-4 text-foreground">Artigo não encontrado</h1>
					<p className="text-muted-foreground mb-6">O artigo que você procura não existe ou foi removido. Confira outros conteúdos do nosso blog ou entre em contato para dúvidas jurídicas.</p>
					<Link href="/blog" className="inline-block rounded-full bg-primary px-6 py-3 text-white font-semibold hover:bg-primary/90 transition">Ver todos os artigos</Link>
				</Card>
			</main>
		);
	}

	// Renderização do artigo (ajuste conforme estrutura real do artigo)
	return (
		<main className="min-h-screen bg-background px-4 py-10">
			<article className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm p-8">
				<h1 className="text-4xl font-bold mb-4 text-foreground">{article.title}</h1>
				<p className="text-muted-foreground mb-6">{article.subtitle}</p>
				<div className="mb-6 flex flex-wrap gap-2 text-xs text-primary/80">
					<span>{article.author}</span>
					<span>|</span>
					<span>{new Date(article.date).toLocaleDateString('pt-BR')}</span>
					<span>|</span>
					<span>{article.readTime} min</span>
				</div>
								<div className="relative w-full h-64 mb-8 rounded-xl bg-muted overflow-hidden">
									<Image
										src={article.image || '/placeholder.svg'}
										alt={article.title}
										fill
										sizes="(max-width: 768px) 100vw, 512px"
										className="object-cover rounded-xl"
										loading="lazy"
									/>
								</div>
				<div className="prose prose-lg max-w-none text-foreground" dangerouslySetInnerHTML={{ __html: article.content }} />
				<section className="mt-10 rounded-2xl border border-border bg-secondary/35 p-6">
					<p className="text-sm uppercase tracking-[0.2em] text-primary/75">Próximo passo</p>
					<h2 className="mt-2 text-2xl font-semibold text-foreground">Você já viveu uma situação como esta?</h2>
					<p className="mt-3 text-sm leading-7 text-foreground/80">
						Conte seu contexto. Talvez exista uma estratégia mais objetiva para o seu caso, com encaminhamento direto para atendimento.
					</p>
					<div className="mt-4 flex flex-wrap gap-3">
						<Link href={`/areas/${relatedAreaId}`} className="inline-flex cursor-pointer items-center rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white transition hover:bg-primary/90">
							Ir para área de atuação relacionada
						</Link>
						<Link href="/contato" className="inline-flex cursor-pointer items-center rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground transition hover:bg-secondary">
							Marcar reunião via WhatsApp
						</Link>
						<Link href="/sobre" className="inline-flex cursor-pointer items-center rounded-full border border-border px-5 py-2 text-sm font-semibold text-foreground transition hover:bg-secondary">
							Saiba mais sobre a especialista
						</Link>
					</div>
				</section>
				<div className="mt-10 flex flex-col gap-4">
					<Link href="/blog" className="inline-block cursor-pointer rounded-full bg-primary px-6 py-3 text-white font-semibold hover:bg-primary/90 transition">Voltar para o blog</Link>
				</div>
			</article>
		</main>
	);
}
