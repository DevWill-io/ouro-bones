export function GallerySection() {
  const placeholders = Array.from({ length: 8 });
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
            Galeria de <span className="gold-gradient">trabalhos</span>
          </h2>
          <p className="mt-3 text-muted-foreground">Alguns dos bonés que já produzimos.</p>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {placeholders.map((_, i) => (
            <div key={i} className="aspect-square rounded-lg bg-primary/10 border border-primary/20 grid place-items-center">
              <span className="text-xs text-muted-foreground">/images/gallery/{i + 1}.jpg</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}