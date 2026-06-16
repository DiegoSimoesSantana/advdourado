
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
				<div className="mt-10 flex flex-col gap-4">
					<Link href="/blog" className="inline-block rounded-full bg-primary px-6 py-3 text-white font-semibold hover:bg-primary/90 transition">Voltar para o blog</Link>
				</div>
			</article>
		</main>
	);
}
