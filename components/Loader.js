export default function Loader() {
    return (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass h-56 animate-pulse rounded-3xl" />
            ))}
        </div>
    );
}
